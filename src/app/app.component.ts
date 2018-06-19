import { Component, OnDestroy } from '@angular/core';
import { HttpService } from './services/http.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataComponent } from './data/data.component';
import { ConfirmationPageComponent } from './confirmation-page/confirmation-page.component';
import { SigninComponent } from './auth/signin/signin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activePage:string="";
  constructor(private httpService:HttpService){

  }

  isAuthnicated(){
return this.httpService.is_Authinicated();
  }
  onActivate(event){
    this.activePage = event.page;
    // $("#myInput").on("keyup", function() {
    //   var value = $(this).val().toLowerCase();
    //   $("#myDIV *").filter(function() {
    //     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //   });
    // });
  }
  logOut(){
    this.httpService.clearStorage();
  }
}
