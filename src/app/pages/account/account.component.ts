import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  token: string = ""
  tokenSaved: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token") || "";
    if(this.token) {
      this.tokenSaved = true;
    } else {
      this.tokenSaved = false;
      this.router.navigateByUrl("/");
    }
  }

}
