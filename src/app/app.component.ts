import { Component, OnDestroy } from '@angular/core';
import { HttpService } from './services/http.service';


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
