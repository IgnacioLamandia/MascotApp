import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';

declare var google;

@IonicPage()
@Component({
  selector: 'page-post-info',
  templateUrl: 'post-info.html',
  providers:[ PostProvider]
})
export class PostInfoPage {

  public imgWidth: any;
	public imgHeight:any;
  public map:any;
	public post:Post;
  public comment = {text:'', name:'', email:''};
  public comments : any = [];
  postProvider : PostProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restPosts: PostProvider) {
    this.imgHeight="300";
    this.imgWidth="300";
  	this.post = navParams.get("post");
    this.comments = this.post.comments
    this.postProvider = restPosts;
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let latitude = this.post.latitude;
    let longitude = this.post.longitude;
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });
  }

  saveComment(){
    var c = this.comment;
    this.post.comments.push(c);
    this.comment = {text:'', name:'', email:''};
    //conectarse con el provider
    //this.postProvider.
  }

}
