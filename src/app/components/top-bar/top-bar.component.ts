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

  image: any;
  imgPreview: any = "../../../assets/images/profile.jpg"
  file: any;
  savePig: HTMLInputElement = document.getElementById('imagePicker')! as HTMLInputElement;
  savePigFile: any;
  files!: FileList | null;

  onSavePost() {

  }

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
  reader: FileReader = new FileReader();

  async ngOnInit(): Promise<void> {
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
    this.savePig = document.getElementById('imagePicker') as HTMLInputElement;
    //this.files = this.savePig.files;
    this.useDefaultImage(document.getElementById("imagePicker")! as HTMLInputElement);
    this.file = await fetch("../../../assets/images/profile.jpg").then(r => r.blob());
    //../../../assets/images/profile.jpg
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
      this.http.post('http://easy-back.vercel.app/user/login', data, { headers: headers })
        .subscribe((res: any) => {
          console.log("ress",res)
          localStorage.setItem("token", res["fullData"]["token"])
          localStorage.setItem("email", res["fullData"]["email"]);
          this.token = res["fullData"]["token"]
          this.tokenSaved = true;
          this.modalService.close(this.myLoginModal);
          this.router.navigateByUrl("/account")
          this.toastr.success('"Login successful"', undefined, {
            positionClass: 'toast-top-right'
          })
          this.hideSpinner(this.spinner1)
        }, (error: any) => {
          this.toastr.error(JSON.stringify(error.error.message.replace(/"/g, '')), undefined, {
            positionClass: 'toast-top-right'
          })
        });
      if (this.tokenSaved) {
      }
    }


  }

  imageConfirm() {
  }

makeBlobFromFilePath(path: string) {
  return fetch(path).then(response => response.blob());
}


  onImagePicked(element?: any) {
    this.file = element.files[0]
  
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
    }
    this.readAs(this.file,0);
  }

  getBlob() {
    return this.files
  }

  turnPathToBlob(path: string) {
    return this.http.get(path, { responseType: 'blob' })
  }

  async useDefaultImage(element: any) {
    this.file = await fetch("../../../assets/images/profile.jpg").then(r => r.blob());
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = "../../../assets/images/profile.jpg";
    }
    this.readAs(this.file,1);
  }

  readAs(file: any, func: number) {
    this.reader.readAsDataURL(file)
    if(func == 1) {
      this.reader.onload = () => {
        this.imgPreview = "../../../assets/images/profile.jpg";
      }
    } else {
      this.reader.onload = () => {
        this.imgPreview = this.reader.result as string;
      }
    }
  }


  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }


  generateRandomFileName() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  register() {
    let formData: FormData = new FormData();

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
        "image": this.file,
      }
      formData.append('image', this.file, this.generateRandomFileName());
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('email', this.email);
      let headers = new HttpHeaders()
      headers.set("Access-Control-Allow-Origin", "*")
      this.http.post("http://easy-back.vercel.app/user/signup", formData, {responseType: 'text'}).subscribe(res => {
        this.toastr.success('"Registration Successful"')
        this.modalService.close(this.myRegisterModal);
      })
    }
  }


}
