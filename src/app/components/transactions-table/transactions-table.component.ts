import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {

  transactions: any[] = []
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<TransactionData>();
  spinner1: string = "sp1"

  ngOnInit(): void {
    this.spinner1 = "sp1;"
    this.displayedColumns = ['transactionAmount', 'transactionWord', 'sender', 'receiver', 'timestamp', 'receivingBank', 'accountNumber', 'withdrawalOrDeposit', 'description', 'remarks'];

    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    this.showSpinner(this.spinner1);
    this.http
      .get('https://easy-back.vercel.app/transaction/transactions', {
        headers: headers,
      })
      .subscribe((res: any) => {
        this.transactions = res;
        console.log(this.transactions);
        this.hideSpinner(this.spinner1);
        const transactions: TransactionData[] = [];
        for (var i = 0; i <= this.transactions.length; i++) { transactions.push(this.addTransaction(i)); }
    
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(transactions);
        console.log("dataSource", this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }


  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }




  constructor(private spinner: NgxSpinnerService, paginator: MatPaginator, sort: MatSort, private router: Router, private http: HttpClient, private toastr: ToastrService) {

  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

  }

  applyFilter(filterValue: any) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  addTransaction(id: number): TransactionData {
    var trans = {
      transactionAmount: this.transactions[id]?.transactionAmount,
      transactionWord: this.transactions[id]?.transactionWord,
      sender: this.transactions[id]?.sender,
      receiver: this.transactions[id]?.reciever,
      timestamp: this.transactions[id]?.timestamp.substring(0, 10),
      recievingBank: this.transactions[id]?.recievingBank,
      accountNumber: this.transactions[id]?.accountNumber,
      withdrawalOrDeposit: this.transactions[id]?.withdrawalOrDeposit,
      description: this.transactions[id]?.description,
      remarks: this.transactions[id]?.remarks
    };
    console.log(trans)
    return trans
  }
  

}



export interface TransactionData {
  transactionAmount: string;
  transactionWord: string;
  sender: string;
  receiver: string;
  timestamp: Date;
  recievingBank: string;
  accountNumber: number;
  withdrawalOrDeposit: string;
  description: string;
  remarks: string;
}