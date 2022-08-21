import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transactions-form',
  templateUrl: './transactions-form.component.html',
  styleUrls: ['./transactions-form.component.scss']
})
export class TransactionsFormComponent implements OnInit {

  transactions: any = []

  token: string = ""
  tokenSaved: boolean = false;

  receiver: string = "";
  sender: string = "";
  transactionAmount: number = 0;
  transactionWord: string = "";
  accountNumber: number = 0;
  receivingBank: string = "";
  remarks: string = "";
  timestamp = new Date()
  withdrawalOrDeposit: string = "";
  description: string = "";
  spinner1: string = "sp1"


  constructor(private spinner:NgxSpinnerService, private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {

  }


  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }

 getRandomDateBetweenTwoDates() {
    return new Date(new Date(2022,1,1).getTime() + Math.random() * (new Date().getTime() - new Date(2021,1,1).getTime()));
}



  submit() {
    if (
      this.remarks == '' ||
      this.receivingBank == '' ||
      this.accountNumber <= 0 ||
      this.receiver == '' ||
      this.transactionWord == '' ||
      this.transactionAmount <= 0 ||
      this.sender == '' ||
      this.description == ''
    ) {
      this.toastr.error(
        'Please fill out all the fields. account number and transaction amount cannot be less than or equal to zero.'
      );
    } else {
      var date = this.getRandomDateBetweenTwoDates();
      var data = {
        transactionAmount: this.transactionAmount,
        remarks: this.remarks,
        accountNumber: this.accountNumber,
        recievingBank: this.receivingBank,
        reciever: this.receiver,
        transactionWord: this.transactionWord,
        sender: this.sender,
        withdrawalOrDeposit: this.withdrawalOrDeposit,
        timestamp: date,
        description: this.description,
      };
      let headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', '*');
      (<HTMLElement>document.getElementById("navBar")).scrollIntoView()
      this.showSpinner(this.spinner1);
      
      this.http
        .post('https://easy-back.vercel.app/transaction/create', data, {
          headers: headers,
        })
        .subscribe((res: any) => {
          console.log(res);
          this.toastr.success('"Data has been posted successfully"');
          (<HTMLElement>document.getElementById("navBar")).scrollIntoView()
          this.ngOnInit()
          this.hideSpinner(this.spinner1);
        }),
        (error: any) => {
          console.log(error);
          this.toastr.error(
            JSON.stringify(error.error.message.replace(/"/g, ''))
          );
          (<HTMLElement>document.getElementById("navBar")).scrollIntoView()
        };
    }
  }
}

