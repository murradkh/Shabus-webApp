import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Response } from '@angular/http';

@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.css']
})
export class ConfirmationPageComponent implements OnInit {

// static confirmation_URL:string = "http://127.0.0.1:4990/user/driver/confirmation";
static confirmation_URL:string = "https://shabus-mobile-api.herokuapp.com/user/driver/confirmation";

private driverName: string = "";
public pageInValid:boolean = undefined;
constructor(private route: ActivatedRoute,
            private httpService:HttpService,
            private spinnerService: Ng4LoadingSpinnerService
          ) { 
              this.spinnerService.show();

            }

  ngOnInit() {
    this.route.params.subscribe(params=>{
this.httpService.sendData(params,ConfirmationPageComponent.confirmation_URL).subscribe((response:Response)=>{
  let body = response.json();
  if(body['Status']=="Accept"){
    this.driverName=body['Name'];
    this.pageInValid = false;
  }else this.pageInValid = true;

  this.spinnerService.hide();
},error=>{
  this.spinnerService.hide();
alert(error);
});
    });
  }

}
