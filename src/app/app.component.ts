import { Component } from '@angular/core';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private httpService:HttpService){

  }

  isAuthnicated(){
return this.httpService.is_Authinicated();
  }
  newPage(event){
console.log(event);
  }
}
