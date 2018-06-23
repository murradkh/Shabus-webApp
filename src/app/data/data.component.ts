import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { } from 'jquery';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit, OnDestroy {
  public id: string = "";
  public data: Array<Array<any>> = [];
  public unWantedCols: {};
  public mapStyles: Array<any> = [];
  public lat: number;
  public lng: number;
  public places: Array<any>;
  public page: string = "";
  public pickUpLocation1: Array<any> = []; // this storing the data which we get from the server
  public pickUpLocation2: Array<any> = []; // this is the same, but with slow adding elements to it (for making marker view nicer)
  public zoom: number;
  public clickedRow;
  private routeSubscription: Subscription;
  private httpSubscription: Subscription;
  // private getData_URL: string = "http://127.0.0.1:4990/user/manager/Get/";
  private getData_URL: string = "https://shabus-mobile-api.herokuapp.com/user/manager/Get/";
  // private deleteDate_URL: string = "http://127.0.0.1:4990/user/manager/Delete/";
  private deleteDate_URL: string = "https://shabus-mobile-api.herokuapp.com/user/manager/Delete/";



  constructor(private activeRoute: ActivatedRoute,
    private httpService: HttpService,
    private spinnerService: Ng4LoadingSpinnerService) {
    let f: any = activeRoute.url;
    this.page = f.value[0].path;
  }

  ngOnInit() {

    $(".myInput").on("keyup", function () { // this part adding to search bar its functionality (searching in every row)
      var value = $(this).val().toString().toLowerCase();
      $(".myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        return false;
      });
    });

    this.mapStyles = [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      }
    ];

    this.unWantedCols = { "Start location": 0, "End location": 0, "Riding place": 0, "Current location": 0 };
    this.httpService.sendData({ 'Token': this.httpService.getToken() }, this.getData_URL, "pickup location").subscribe((response: Response) => {
      let body = response.json();
      this.pickUpLocation1 = body['Data'];
    }

    );
    this.routeSubscription = this.activeRoute.params.subscribe((params: {}) => {
      if (this.httpSubscription != undefined)
        this.httpSubscription.unsubscribe();
      this.data = [];
      if (params["id"]) {
        this.spinnerService.show();
        this.id = params['id'].replace('-', ' ');
        this.httpSubscription = this.httpService.sendData({ 'Token': this.httpService.getToken() }, this.getData_URL, this.id).subscribe((response: Response) => {
          this.spinnerService.hide()
          let body = response.json();
          let documents = body['Data'];
          for (let i = 0; i < documents.length; i++) {
            this.data.push([]);
            for (let index in documents[0]) {
              this.data[i].push([index, documents[i][index]])
            }
          }
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


  markerLabel(element) {
    if (element == 'Start location')
      return 'A';
    if (element == 'End location')
      return 'B';
    if (element == 'Current location')
      return 'C';
    if (element == 'Riding place')
      return 'R';


  }

  deleteRow() {
    let phoneNumber = this.clickedRow.find((value) => {
      if (value[1][0] == "PhoneNumber" || value[1][0] == "phone_number")
        return true;
    })[1][1];

    this.httpService.sendData({ 'PhoneNumber': phoneNumber, 'Token': this.httpService.getToken() }, this.deleteDate_URL, this.id).subscribe();
    var index = this.data.indexOf(this.clickedRow, 0);
    this.data.splice(index, 1);
  }

  openMap(row) {
    this.clickedRow = row;
    this.lat = 31.7683;
    this.lng = 35.2137;
    this.zoom = 12;
    this.places = row.filter((value) => {
      if (value[1][0] == 'Current location' || value[1][0] == 'Start location' || value[1][0] == 'End location' || value[1][0] == "Riding place") {
        // if (value[1][0] == 'Current location') {
        this.lat = value[1][1]['lat'];
        this.lng = value[1][1]['lng'];
        // }
        return true;
      }
    });
    this.slowAddingElements(0);
  }

  slowAddingElements(index) {
    setTimeout(() => {
      if (index < this.pickUpLocation1.length) {
        this.pickUpLocation2.push(this.pickUpLocation1[index]);
        this.slowAddingElements((index + 1));
      }
    }, 100);
  }

  checkIfCurrentElement(element){
console.log(element);
if(element=='Current location'){
console.log('why')
  return "BOUNCE";
}
else return "DROP";
  }

}
