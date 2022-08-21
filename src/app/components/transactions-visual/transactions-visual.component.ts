import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { NgChartsModule } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transactions-visual',
  templateUrl: './transactions-visual.component.html',
  styleUrls: ['./transactions-visual.component.scss']
})
export class TransactionsVisualComponent implements OnInit {

  spinner1: string = "sp1";
  transactions: any[] = [];
  withdrawls: any[] = [];
  deposits: any[] = [];
  last12MonthsVar: string[] = [];
  withdrawalNums: any = [0,0,0,0,0,0,0,0,0,0,0,0];
  depositNums: any = [0,0,0,0,0,0,0,0,0,0,0,0];

  ngOnInit(): void {

    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    this.http
      .get('https://easy-back.vercel.app/transaction/transactions', {
        headers: headers,
      })
      .subscribe((res: any) => {
        this.transactions = res;
        this.getLast12Months();
      });


  }

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService,) {
    Chart.register(Annotation)
  }

  getLast12Months(): void {
    var monthName = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
    var d = new Date();
    var last12Months = []
    var isDecember = false;
    if (monthName[d.getMonth()] == "Nov") {
      var year = d.getFullYear() - 1;
      isDecember = true;
    }
    var year = d.getFullYear();
    d.setDate(1);
    for (var i = 0; i <= 11; i++) {
      d.setMonth(d.getMonth() + 1);
      if (monthName[d.getMonth()] == "Nov" && !isDecember) {
        var year = d.getFullYear();
      } else {
        var year = d.getFullYear() - 1;
      }
      last12Months.push(monthName[d.getMonth()] + '-' + year);
    }
    this.last12MonthsVar = last12Months;
    this.lineChartData.labels = this.last12MonthsVar;
    console.log("l12m", this.last12MonthsVar)
    this.filterData();
  }

  getMonthYear(date: string): string {
    console.log("Oh my God", this.getMonthWord(parseInt(date.substring(2, 3))) + '-' + date.substring(0, 4))
    return this.getMonthWord(parseInt(date.substring(2, 3))) + '-' + date.substring(0, 4);
  }

  getMonthWord(month: number): string | undefined {
    switch (month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
    }
    return
  }


  private filterData() {
    var isValidDate = false;
    this.withdrawls = this.transactions.filter(data => {
      return data.withdrawalOrDeposit == 'Withdrawal';
    })
    this.deposits = this.transactions.filter(data => {
      return data.withdrawalOrDeposit == 'Deposit';
    })
    console.log("todayDD", this.deposits)
    for (var x = 0; x < this.withdrawls.length; x++) {
      for (var y = 0; y < this.last12MonthsVar.length; y++) {
        console.log("TODAT",this.getMonthYear(this.withdrawls[x].timestamp.substring(0,4) + "-" + this.getMonthWord(this.withdrawls[x].timestamp.substring(5,7))))
        console.log("L12M", this.last12MonthsVar[y])
        if (this.getMonthYear(this.withdrawls[x].timestamp.substring(0,4) + "-" + this.getMonthWord(this.withdrawls[x].timestamp.substring(5,7)))== this.last12MonthsVar[y]) {
          isValidDate = true;
        }
      }
      if (!isValidDate) {
        this.withdrawls.splice(x, 1);
      }
    }
    console.log("deposits 21-22",this.withdrawls)
    for (var x = 0; x < this.deposits.length; x++) {
      for (var y = 0; y < this.last12MonthsVar.length; y++) {
        console.log("TODAT222",this.getMonthYear(this.deposits[x].timestamp.substring(0,4) + "-" + this.getMonthWord(this.deposits[x].timestamp.substring(5,7))))
        console.log("L12M222", this.last12MonthsVar[y])
        if (this.getMonthYear(this.deposits[x].timestamp.substring(0,4) + "-" + this.getMonthWord(this.deposits[x].timestamp.substring(5,7)))== this.last12MonthsVar[y]) {
          isValidDate = true;
        }
      }
      if (!isValidDate) {
        this.deposits.splice(x, 1);
      }
    }
    console.log("todayDDD", this.deposits)
    for (var x = 0; x < this.last12MonthsVar.length; x++) {
      for (var y = 0; y < this.withdrawls.length; y++) {
        if (this.getMonthYear(this.withdrawls[y].timestamp) == this.last12MonthsVar[x]) {
          this.withdrawalNums[x] += this.withdrawls[y].transactionAmount;
        }

      }
    }
    for (var x = 0; x < this.deposits.length; x++) {
      for (var y = 0; y < this.last12MonthsVar.length; y++) {
        console.log("equals?", this.getMonthYear(this.transactions[x].timestamp) + " " + this.last12MonthsVar[y]);
        if (this.getMonthYear(this.deposits[x].timestamp) == this.last12MonthsVar[y]) {
          this.depositNums[y] += this.deposits[x].transactionAmount;
          console.log("dep num",this.depositNums)
          console.log("HEEEEERE")
        }

      }
    }
    for(var x = 0; x < 6; x++) {
      this.depositNums.unshift(this.depositNums.pop())
      this.withdrawalNums.unshift(this.withdrawalNums.pop())
    }

    this.lineChartData.datasets[0].data = this.depositNums;
    this.lineChartData.datasets[1].data = this.withdrawalNums;
  }


rotateLeft(arr: any[]){
  let first = arr.shift();
  arr.push(first);
  return arr;
}


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Deposits',
        borderColor: '#3cba9f',
        backgroundColor: '#3cba9f',
        pointBorderColor: '#3cba9f',
        pointHoverBackgroundColor: '#3cba9f',
        pointHoverBorderColor: '#3cba9f',
        pointBackgroundColor: '#3cba9f',
      },
      {
        data: [],
        label: 'Withdrawals',
        borderColor: 'red',
        backgroundColor: 'red',
        pointBorderColor: 'red',
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red',
        pointBackgroundColor: 'red',
      }
    ],
    labels: this.last12MonthsVar
  };

  public lineChartOptions: ChartConfiguration['options'] = {
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  }
}


/*
ngOnInit(): void {
  this.spinner1 = "sp1;"

  let headers = new HttpHeaders();
  headers.set('Access-Control-Allow-Origin', '*');
  this.showSpinner(this.spinner1);
  this.http
    .get('https://easy-back.vercel.app/transaction/transactions', {
      headers: headers,
    })
    .subscribe((res: any) => {
      this.transactions = res;
      this.hideSpinner(this.spinner1);
    });
}
 */

/*
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService,  ) { }

} */