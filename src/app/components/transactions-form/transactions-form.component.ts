import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  country: any;
  userStatus: string = "active";


  constructor(private spinner: NgxSpinnerService, private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCountry()
  }


  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }

  getRandomDateBetweenTwoDates() {
    return new Date(new Date(2022, 1, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2021, 1, 1).getTime()));
  }

  onSaveaPost() {

  }

  async getCountry(): Promise<string> { 
    var status
    let headers = new HttpHeaders();
    await this.http.get('https://api.geoapify.com/v1/ipinfo?&apiKey=b3110579766149e99e5e615d6d01b678', {
      headers: headers,
    }).subscribe((res: any) => {
      this.country = res.country
      console.log(this.country)
      var data = {
        password: localStorage.getItem("password"),
        email: localStorage.getItem("email"),
        username: localStorage.getItem("username"),
      }
      this.http.post("//localhost:4000/user/user", data).subscribe((res: any) => {
        this.userStatus = res.status
        console.log("status", this.userStatus)
      })
      if (this.country.name == "Nigeria" || this.userStatus == "privileged") {
        if(this.userStatus == "privileged"){
          return this.updateUserStatus("privileged")
        } else if(this.userStatus == "active"){
        this.updateUserStatus("active")
      } else {
        this.updateUserStatus("inactive")
      }
    } return ""}), (err: any) => {
      console.log(err)
    }
    return ""
  }


  updateUserStatus(isActive: string): string {
    var data;
    if (isActive == "inactive") {
      data = {
        status: "inactive",
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        username: localStorage.getItem("username")
      }
      this.http.put("//localhost:4000/user/update", data).subscribe((res: any) => {
        console.log(res)
      }), (err: any) => {
        console.log(err)
      }
      this.userStatus = "inactive";
      return "inactive"
    } else if (isActive == "privileged") {
      data = {
        status: "privileged",
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        username: localStorage.getItem("username"),
      }
      this.userStatus = "privileged";
      return "privileged"
    } else {
      data = {
        status: "active",
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        username: localStorage.getItem("username"),
      }
      this.userStatus = "active";
      return "active"
    }
  }

  /* updateUserStatus() {
    let headers = new HttpHeaders();
    this.http.put("//localhost:4000/user/update", {")
  } */



  async submit() {
    await this.getCountry()
    if (this.country.name != "United States" && this.userStatus != "privileged") {
      this.toastr.error('"You are not allowed to make transactions from this location"');
      this.http.put("//localhost:4000/user/update", {
        status: "inactive",
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
        username: localStorage.getItem("username")
      }).subscribe((res: any) => {
      })
    }
    else if (
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
        timestamp: this.timestamp,
        description: this.description,
      };
      let headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', '*');
      (<HTMLElement>document.getElementById("navBar")).scrollIntoView()
      this.showSpinner(this.spinner1);
      ////easy-bank-back.ue.r.appspot.com/transaction/create
      this.http
        .post('//localhost:4000/transaction/create', data, {
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

