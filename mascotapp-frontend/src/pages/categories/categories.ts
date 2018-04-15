import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
  public perdidos : any;
  public adopciones : any;
  public encontrados : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restPosts: PostProvider) {
    this.postProvider = restPosts
  }

  ngOnInit(){
    this.getPerdidos();
    this.getEncontrados();
    this.getAdopciones();
  }

  getEncontrados(){
    this.postProvider.getAllByCategory('ENCONTRADO')
    .subscribe(
      (data) => { // Success
        this.encontrados = data;
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  getPerdidos(){
    this.postProvider.getAllByCategory('PERDIDO')
    .subscribe(
      (data) => { // Success
        this.perdidos = data;
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  getAdopciones(){
    this.postProvider.getAllByCategory('ADOPCION')
    .subscribe(
      (data) => { // Success
        //console.log(data);
        this.adopciones = data;
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  abrirPublicacion(publi:Post){
    this.navCtrl.push(PostInfoPage,{ publicacion:publi});
  }
}
