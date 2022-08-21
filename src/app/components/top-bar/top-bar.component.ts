import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalManager } from 'ngb-modal';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  logout() {
    localStorage.removeItem("token")
    this.token = ""
    this.tokenSaved = false;
    this.router.navigateByUrl("/")
  }

  toggleSideNav() {
  }

  /* Set the width of the side navigation to 250px */
  openNav() {
    (document.getElementById("mySidenav") as HTMLDivElement).style.width = "250px";
  }

  /* Set the width of the side navigation to 0 */
  closeNav() {
    (document.getElementById("mySidenav") as HTMLDivElement).style.width = "0";
  }

  constructor(private spinner: NgxSpinnerService, private modalService: ModalManager, private toastr: ToastrService, private http: HttpClient, private router: Router) { }

  email: string = ""
  password: string = ""
  password2: string = ""
  username: string = ""
  token: string = ""
  tokenSaved: boolean = false;
  spinner1 ="sp1"

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      (<HTMLElement>document.getElementById("topNavItems")).style.marginRight = "5%";
    } {
      (<HTMLElement>document.getElementById("topNavItems")).style.marginRight = "12%"
    }
    this.token = localStorage.getItem("token") || "";
    if (this.token) {
      this.tokenSaved = true;
    } else {
      this.tokenSaved = false;
      this.router.navigateByUrl("/");
    }
  }

  toggleMenu() {
    if ((<HTMLDivElement>document.getElementById("menu")).style.visibility == "visible") {
      (<HTMLDivElement>document.getElementById("menu")).style.visibility = "hidden";
    } else {
      (<HTMLDivElement>document.getElementById("menu")).style.visibility = "visible";
    }
  }

  @ViewChild('myLoginModal') myLoginModal: any;
  private modalRef: any;

  @ViewChild('myRegisterModal') myRegisterModal: any;
  private modalRef2: any;

  openModal(id: any) {
    this.modalRef = this.modalService.open(id, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: true,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
    })
  }
  openModalRegister() {
    this.modalRef = this.modalService.open(this.myRegisterModal), {
      size: "md",
      modalClass: 'mymodal2',
      hideCloseButton: false,
      centered: false,
      backdrop: true,
      animation: true,
      keyboard: true,
      closeOnOutsideClick: false,
      backdropClass: "modal-backdrop"
    }
  }
  closeModal(modalRef: any) {
    this.modalService.close(modalRef);
    //or this.modalRef.close();
  }

  login() {
    if (
      this.password == '' ||
      this.email == ''
    ) {
      this.toastr.error('"Please fill in all the fields"')
    } else {
      var data = {
        password: this.password,
        email: this.email,
      };
      let headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', '*');
      this.showSpinner(
        this.spinner1
      )
      this.http.post('https://easy-back.vercel.app/user/login', data, { headers: headers })
        .subscribe((res: any) => {
          console.log(res);
          localStorage.setItem("token", res["token"])
          this.token = res["token"]
          this.tokenSaved = true;
          this.modalService.close(this.myLoginModal);
          this.router.navigateByUrl("/account")
          this.toastr.success('"Login successful"', undefined, {
            positionClass: 'toast-top-right'
          })
          this.hideSpinner(this.spinner1)
        }, (error: any) => {
          console.log(error)
          this.toastr.error(JSON.stringify(error.error.message.replace(/"/g, '')), undefined, {
            positionClass: 'toast-top-right'
          })
        });
      if (this.tokenSaved) {
      }
    }


  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }


  register() {
    if (this.password != this.password2) {
      this.toastr.error('"These passwords do not match"');
    } else if (
      this.username == '' ||
      this.password == '' ||
      this.password2 == '' ||
      this.email == ''
    ) {
      this.toastr.error('"Please fill in all the fields"');
    } else {
      var data = {
        "username": this.username,
        "password": this.password,
        "email": this.email,
      }
      let headers = new HttpHeaders()
      headers.set("Access-Control-Allow-Origin", "*")
      this.http.post("https://easy-back.vercel.app/user/signup", data, { headers: headers }).subscribe(res => {
        console.log(res)
        this.toastr.success('"Registration Successful"')
        this.modalService.close(this.myRegisterModal);
      }, (error: any) => {
        this.toastr.error(JSON.stringify(error.error.message.replace(/"/g, '')))
      });
    }
  }


}
