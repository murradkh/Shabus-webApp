import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { Response } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Router} from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // private login_URL: string = "http://127.0.0.1:4990/user/manager/login";
  private login_URL: string = "https://shabus-mobile-api.herokuapp.com/user/manager/login";
  
  public inValid = false;

  constructor(private httpService: HttpService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router:Router) { }

  ngOnInit() {
  }

  onsubmit(form: NgForm) {
    this.spinnerService.show();
    this.httpService.sendData(form.value, this.login_URL).subscribe((response: Response) => {
      this.spinnerService.hide();
      let body = response.json();
      if (body['Status'] == 'Accept') {
        this.httpService.setToken(body['Token']);
        this.httpService.setImage(body['Image']);
        this.router.navigate(['/logs']);
      } else {// in case the detail of the user is not valid 
        this.inValid = true;
      }
    }, (error) => {
      this.spinnerService.hide();
      alert(error);
    });

  }

}
