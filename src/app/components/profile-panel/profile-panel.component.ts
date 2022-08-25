import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-profile-panel',
  templateUrl: './profile-panel.component.html',
  styleUrls: ['./profile-panel.component.scss']
})
export class ProfilePanelComponent implements OnInit {
  header: HttpHeaders = new HttpHeaders();
  user: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    let headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    this.http.get('http://easy-back.vercel.app/user/users').subscribe(data => {
      this.user = data
      this.user = this.user.filter((user:any) => user.email == localStorage.getItem("email"))
      console.log("dattta", localStorage.getItem("token"))
      console.log("emailll", localStorage.getItem("email"))
      console.log(this.user)
    }
    )
  }

}
