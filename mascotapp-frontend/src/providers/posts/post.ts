import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../model/Post';
import { Http, Response } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";


@Injectable()
export class PostProvider {
  private apiUrl = 'http://127.0.0.1:9000/';
  constructor(private http: Http) { }

  findAll(): Observable<Post[]>  {
     return this.http.get(this.apiUrl+"posts")
      .map(res => {
        return res.json().map(post => {
        	console.log(post);
          return new Post(
              post.description,
              "data:image/jpg;base64," + post.image,
              post.latitude, post.longitude,
              post.address, post.category, post.id
          );
        });
      });
  }
  
  newPost(newPost):Observable<any>{
      let params = newPost
 
      let headersHttp = new HttpHeaders({'Authorization':localStorage.getItem("token")});
         
      return this.http.post(this.apiUrl+'post',{headers:headersHttp,responseType:'text'});
  }
}
