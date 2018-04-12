import { Component } from '@angular/core';
import { Nav,ModalController,NavParams,NavController ,Platform,Content, LoadingController } from 'ionic-angular';
import { Post } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';

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

    if (plt.is('core')) {
      console.log("I'm in a desktop!");
      this.isDesktop = true;
    }
  }

  ngOnInit(){
    this.posts=[];
    console.log('Publicaciones');
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
    console.log('get posts');
    loading.present();

    this.postService.getAllPosts()
      .then(data => {
        console.log(data);
        this.posts = data;
        console.log(this.posts);
        loading.dismiss();
      });
  }

/*
  getAllPosts() {
    let loading = this.loadingCtrl.create({content:"Cargando..."});
    console.log('get posts');
    loading.present();

    this.postService.findAll().subscribe(
      posts => {
        console.log('get Publicaciones:  '+posts);
        this.posts = posts;
      },
      err => {
        console.log(err);
      },
      ()=>{
        loading.dismiss();
      }
    );
  }*/
}
