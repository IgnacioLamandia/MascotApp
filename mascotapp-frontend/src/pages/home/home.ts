import { Component } from '@angular/core';
import { Nav,ModalController,NavParams,NavController ,Platform,Content, LoadingController } from 'ionic-angular';
import { Post } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';
import { PostInfoPage } from '../post-info/post-info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles:['home.scss'],
  providers: [PostProvider]
})

export class HomePage {

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
    this.postService.getAllPosts()
      .then(data => {
        this.posts = data;
        loading.dismiss();
      });
  }

  search() {
    console.log('Search');
  }

  viewPost(post:Post){
    this.navCtrl.push(PostInfoPage,{ post : post });
  }
}
