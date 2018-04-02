import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html'
})
export class CategoriesPage {
  selectedItem: any;
  items: Array<{title: string, description: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

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

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(CategoriesPage, {
      item: item
    });
  }
}
