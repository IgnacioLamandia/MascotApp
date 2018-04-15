import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../model/Post';

declare var google;

@IonicPage()
@Component({
  selector: 'page-post-info',
  templateUrl: 'post-info.html',
})
export class PostInfoPage {

  public imgWidth: any;
	public imgHeight:any;
  public map:any;
	public post:Post;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imgHeight="300";
    this.imgWidth="300";
  	this.post = navParams.get("post");
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
}
