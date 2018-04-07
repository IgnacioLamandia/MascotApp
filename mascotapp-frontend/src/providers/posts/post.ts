import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../model/Post';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Injectable()
export class PostProvider {
  apiUrl = "http://localhost:9000/";
  constructor(public http: HttpClient) {console.log('Hello PostProvider Provider'); }

  findAll(): Observable<Post[]>  {
     return this.http.get(this.apiUrl+"posts")
      .map(res => {
        return res.json().map(post => {
        	console.log(post);
          return new Post(
              post.description,
              "data:image/jpg;base64," + post.image,
              post.latitude, post.longitude,
              post.address, post.category //, post.id
          );
        });
      });
  }
  
  newPost(item : Post):Observable<any>{ 
      
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.apiUrl + 'posts', item, options)
      .map(res => res.json())
      .toPromise();
  
  
  }
}
