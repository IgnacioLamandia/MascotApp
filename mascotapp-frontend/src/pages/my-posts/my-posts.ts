import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { PostProvider } from '../../providers/posts/post';
import { Post } from '../../model/Post';
import { PostInfoPage } from '../post-info/post-info';


@IonicPage()
@Component({
  selector: 'page-my-posts',
  templateUrl: '../home/home.html',
})
export class MyPostsPage {

  public posts : any;
  public loaded : boolean = false;
  imgWidth : any;
  imgHeight: any;
  isDesktop:boolean = false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,
    public plt :Platform, private postService: PostProvider) {
  }

  ngOnInit(){
    this.posts=[];
    this.getAllPosts();
    if(this.plt.is('core')){
      this.imgHeight="200";
      this.imgWidth="200";
      console.log("browser");
    }
    else{
      this.imgHeight="300";
      this.imgWidth="100%";
      console.log("not browser");
    }
  }

  getAllPosts() {
    let loading = this.loadingCtrl.create({content:"Cargando..."});
    loading.present();
    this.postService.getAllPostsFromUser()
      .subscribe(data => { console.log(data);
        this.posts = data;
        loading.dismiss();
      },error => {this.posts = [];console.log(this.posts);loading.dismiss();});
  }

  search() {
    console.log('Search');
  }

  viewPost(post:Post){
    this.navCtrl.push(PostInfoPage,{ post : post });
  }

}
