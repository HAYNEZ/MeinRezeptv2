import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {Storage} from '@ionic/storage';

import {Recipe} from '../../models/recipe';

/*
  Generated class for the AddRecipeManually page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-recipe-manually',
  templateUrl: 'add-recipe-manually.html'
})
export class AddRecipeManuallyPage {

  recipe = new Recipe('');
  constructor(public navCtrl: NavController, public storage : Storage) {

  }

  saveRecipe() {
    this.storage.set('recipe1', this.recipe);
    
  }



  ionViewDidLoad() {
    console.log('Hello AddRecipeManuallyPage Page');
  }

}
