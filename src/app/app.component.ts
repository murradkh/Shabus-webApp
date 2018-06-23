import { Component, OnDestroy } from '@angular/core';
import { HttpService } from './services/http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  activePage: string = "";
  constructor(private httpService: HttpService) {

  }

  isAuthnicated() {
    return this.httpService.is_Authinicated();
  }

  onActivate(event) {
    this.activePage = event.page;
  }

  logOut() {
    this.httpService.clearStorage();
  }
}
