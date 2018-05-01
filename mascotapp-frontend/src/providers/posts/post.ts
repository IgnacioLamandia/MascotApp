import { HttpClient , HttpParams, HttpHeaders} from '@angular/common/http';
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

  getAllPosts() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'posts').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  savePost(data) {

    return new Promise((resolve, reject) => {
      let reqOpts = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
          params: new HttpParams()
      };

      console.log(data);
      this.http.post(this.apiUrl+'posts', JSON.stringify(data), reqOpts)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getAllByCategory(category) {
    console.log(category);
  return this.http.get(this.apiUrl + 'posts/' + category);
}

addComment(postID,comment){
    console.log(postID);
    console.log(comment.text);
    console.log(comment.name);
    console.log(comment.email);
    console.log(comment.id);
    this.http.put(this.apiUrl+"/post/"+postID+"/newComment",comment);
  }

  update(post) {
  this.http.put(this.apiUrl + 'post/' + post.id,post);
}

  delete(id){
  this.http.delete(this.apiUrl+"post/"+id);
  }

}