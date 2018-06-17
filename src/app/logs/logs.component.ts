import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit, OnDestroy {

  // public headers: Array<string> = [];
  public id: string = "";
  public data: Array<Array<any>> = [];
  public unWantedCols: {};
  private priorities: {} = {};
  private routeSubscription: Subscription;
  private httpSubscription: Subscription;
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private activeRoute: ActivatedRoute,
    private httpService: HttpService) {
  }

  ngOnInit() {
    // this.priorities = {'Name':0, 'Email':1, 'PhoneNumber':2, 'id_number':2, 'Riding time':3, 'Started at':3 , 'Finished at':4, 'Wًith driver':5 };
    this.unWantedCols = { "Start location": 0, "End location": 0, "Riding place": 0, "Current location": 0 };
    this.routeSubscription = this.activeRoute.params.subscribe((params: {}) => {
      if (this.httpSubscription != undefined)
        this.httpSubscription.unsubscribe();
      // this.headers = [];
      this.data = [];
      if (params["id"]) {
         this.id = params['id'].replace('-', ' ');
        this.httpSubscription = this.httpService.sendData(this.id, { 'Token': this.httpService.getToken() }).subscribe((response: Response) => {
          let body = response.json();
          let documents = body['Data'];
          // console.log(documents);
          // if (documents != []) {
          //   for (let i in documents[0]) {
          //     if (!(i in this.unWantedCols))
          //     this.headers.push(i);
          //   }
          for (let i = 0; i < documents.length; i++) {
            this.data.push([]);
            for (let index in documents[0]) {
              this.data[i].push([index, documents[i][index]])
            }
          }
          // console.log(this.data);
        });
      }
    });
  }
  checkWantedCol(col) {
    return (!(col in this.unWantedCols));
  }

  ngOnDestroy() {
    if (this.routeSubscription != undefined)
      this.routeSubscription.unsubscribe();

  }

}
