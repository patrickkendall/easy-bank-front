import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  token: string = ""
  tokenSaved: boolean = false;

  constructor(private router: Router) { }


  openTab(index: number) {
    var i, tabcontent, tablinks;
    tabcontent = (<HTMLElement>document.getElementById("content" + index));
    (<HTMLElement>document.getElementById("tabLinks" + index)).style.borderBottomColor = "green";
    (<HTMLElement>document.getElementById("tabLinks" + index)).style.color = "green";
    tabcontent.style.display = "block";
    tablinks = (<HTMLElement>document.getElementById("tablinks"));
    for (i = 0; i < 3; i++) {
      if (i != index) {
        (<HTMLElement>document.getElementById("content"+i)).style.display = "none";
        (<HTMLElement>document.getElementById("tabLinks"+i)).style.borderBottomColor = "rgb(104, 104, 104)";
        (<HTMLElement>document.getElementById("tabLinks"+i)).style.color = "rgb(104, 104, 104)"
    }
  }
}

  ngOnInit(): void {
    this.token = localStorage.getItem("token") || "";
    if(this.token) {
      this.tokenSaved = true;
    } else {
      this.tokenSaved = false;
      this.router.navigateByUrl("/");
    }
    this.openTab(0)
  }

}
