import { HttpClient , HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../model/Post';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { urlToNavGroupStrings } from 'ionic-angular/navigation/url-serializer';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class PostProvider {
  apiUrl = "http://localhost:9000/";
  constructor(public http: HttpClient,private auth: AuthService) {console.log('Hello PostProvider Provider'); }

  getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl+'posts');
  }

  getAllPostsFromUser(): Observable<any>{
    return this.http.get(this.apiUrl+'fromUser/'+ this.auth.getUser().uid + "/posts");
  }

  getPostById(id): Observable<any>{
    console.log(id);
    let url = `${this.apiUrl}post/${id}`;
    return this.http.get(url, id);
  }

  savePost(data) : Observable<any>{
      let reqOpts = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
          params: new HttpParams()
      };

      return this.http.post(this.apiUrl+ this.auth.getUser().uid +'/posts', JSON.stringify(data), reqOpts);
  }

  getAllByCategory(category) {
    console.log(category);
    return this.http.get(this.apiUrl + 'posts/' + category);
  }

addComment(postID,comment) {
  return new Promise((resolve, reject) => {
    let reqOpts = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
        params: new HttpParams()
    };

    let cJson = JSON.stringify(comment);
    let url = `${this.apiUrl}post/${postID}/newComment`;
    this.http.put(url,cJson,reqOpts)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });;
  }

  updatePost(id, post) {
    return new Promise((resolve, reject) => {
      let reqOpts = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
          params: new HttpParams()
      };

        let url = `${this.apiUrl}post/${id}`;
        let pJson = JSON.stringify(post);
      this.http.put(url, pJson,reqOpts)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });;
}

  deletePost(id) {
    return new Promise((resolve, reject) => {
      let reqOpts = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
          params: new HttpParams()
      };

      let url = `${this.apiUrl}post/${id}`;
      this.http.delete(url,id)
      .subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      });
    });;
  }
}
