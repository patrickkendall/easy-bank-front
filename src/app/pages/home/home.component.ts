import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: string = ""

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token") || "";
    if(this.token) {
      this.router.navigateByUrl("/account");
    } else {
    }
  }
  }

