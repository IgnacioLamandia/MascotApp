import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../model/Post';

@IonicPage()
@Component({
  selector: 'page-post-info',
  templateUrl: 'post-info.html',
})
export class PostInfoPage {

	public publicacion:Post;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.publicacion = navParams.get("publicacion");
  }

}
