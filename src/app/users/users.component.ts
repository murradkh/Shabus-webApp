import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  //  private getData_URL: string = "https://shabus-mobile-api.herokuapp.com/user/manager/";
  private getData_URL: string = "http://127.0.0.1:4990/user/manager/";
  public headers: Array<string> = []; 
  public data: Array<Array<any>> = [];
  public unWantedCols:{};
  constructor(private activeRoute: ActivatedRoute, private httpService: HttpService) {
  }

  ngOnInit() {
    this.unWantedCols= {"Start location":0,"End location":0,"created_at":0,"Riding place":0};
    this.activeRoute.params.subscribe((params:{}) => {
      this.headers = [];
      this.data = [];
      if(params["id"]){
        let id:string =params['id'];

      this.httpService.getData(id.replace('-',' '), this.getData_URL).subscribe((response: Response) => {
        let body = response.json();
        let documents = body['Data'];
console.log(documents);
       if(documents !=[]){
         for(let i in documents[0]){
          if(!(i in  this.unWantedCols))
          this.headers.push(i);
         }
                 for (let i=0; i<documents.length;i++){
                   this.data.push([]);
                   for (let index in documents[0]) {
                 this.data[i].push([index, documents[i][index]])
                   }
                 }

        }
//        }
      //  let i:number;
      //  console.log(documents);
      //  for(i in documents){
      //    console.log(i);
      //    for(let j in documents[i]){
      //      console.log(j);
      //    }
      //  }
      });
    }
      // }else if(params['id']== "previous-shifts"){

      // }else if(params['id']== "new-rides"){

      // }
    });
  }
  check(col){
    
return (!(col in this.unWantedCols));
  }
}