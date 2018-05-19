import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Post, Category } from '../../model/Post';
import { PostProvider } from '../../providers/posts/post';
import { PostInfoPage } from '../post-info/post-info';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
  providers: [PostProvider]
})
export class CategoriesPage {
  postProvider : PostProvider;
  public posts : any = [];
  public perdidos : any;
  public adopciones : any;
  public encontrados : any;
  imgWidth : any;
  imgHeight: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              public restPosts: PostProvider) {
      this.imgHeight= "200";
      this.imgWidth= "200";
      this.postProvider = restPosts
  }

  ngOnInit(){
    this.getAllPosts();
  }

  getEncontrados(){
      this.encontrados = this.posts.filter(post => post.category === "ENCONTRADO");
  }

  getPerdidos(){
      this.perdidos = this.posts.filter(post => post.category === "PERDIDO");
  }

  getAdopciones(){
      this.adopciones = this.posts.filter(post => post.category === "ADOPCION");
  }

  abrirPublicacion(post:Post){
    this.navCtrl.push(PostInfoPage,{ post : post });
  }

  getAllPosts() {
    let loading = this.loadingCtrl.create({content:"Cargando..."});
    loading.present();
    this.postProvider.getAllPosts()
      .subscribe(data => {
        this.posts = data;
        this.getPerdidos();
        this.getEncontrados();
        this.getAdopciones();
        loading.dismiss();
      });
  }
}
