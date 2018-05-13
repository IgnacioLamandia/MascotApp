import { HttpClient , HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserProvider {
  apiUrl = "http://192.168.43.16:9000/";
  constructor(public http: HttpClient) {console.log('UserProvider Provider'); }

  saveUser(data) {
    return new Promise((resolve, reject) => {
      let reqOpts = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
          params: new HttpParams()
      };
      console.log(data);
      this.http.post(this.apiUrl+'user', JSON.stringify(data), reqOpts)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
