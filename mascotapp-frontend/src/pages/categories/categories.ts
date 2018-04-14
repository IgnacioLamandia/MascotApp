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
  selectedItem: any;
  items: Array<{title: string, description: string, icon: string}>;
  postProvider : PostProvider;
  public perdidos : [Post];
  public adopciones : [Post];
  public encontrados : [Post];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restPosts: PostProvider) {
    this.selectedItem = navParams.get('item');
    this.postProvider = restPosts

    this.items = [];
    this.items.push({
      title: 'Encontrados ',
      description: 'Aquí podrás buscar aminales encontrados',
      icon: 'paw'
    });
    this.items.push({
      title: 'Perdidos ',
      description: 'Aquí podrás buscar aminales perdidos',
      icon: 'paw'
    });
    this.items.push({
      title: 'Adopciones ',
      description: 'Aquí podrás buscar mascotas puestas en adopción',
      icon: 'paw'
    });
  }

  ngOnInit(){
    this.perdidos=[];
    this.getPerdidos();
    this.encontrados=[];
    this.getEncontrados();
    this.adopciones=[];
    this.getAdopciones();
    }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CategoriesPage, {
      item: item
    });
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
