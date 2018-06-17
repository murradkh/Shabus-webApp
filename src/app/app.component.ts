import { Component, OnDestroy } from '@angular/core';
import { HttpService } from './services/http.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogsComponent } from './logs/logs.component';
import { UsersComponent } from './users/users.component';

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
    if(event instanceof LogsComponent)
    this.activePage = 'logs';
    else if(event instanceof UsersComponent)
    this.activePage = 'users';
  }
  logOut(){
    this.httpService.clearStorage();
  }
}
