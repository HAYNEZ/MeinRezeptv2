import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the RecipeBook page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe-book',
  templateUrl: 'recipe-book.html'
})
export class RecipeBookPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello RecipeBookPage Page');
  }

}
