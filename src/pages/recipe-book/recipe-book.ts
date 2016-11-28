import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Storage} from '@ionic/storage';
import {Recipe} from '../../models/recipe';

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

  //
  // recipe : any;
  recipe = new Recipe('');
  constructor(public navCtrl: NavController,  public storage : Storage) {

  }

  ionViewDidLoad() {
    this.storage.get('recipe1').then((recipe) => {
      this.recipe = recipe;
    });
    console.log('Hello RecipeBookPage Page');
  }

}
