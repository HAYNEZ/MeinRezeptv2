import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

// import {Storage} from '@ionic/storage';
import {RecipeService} from '../../providers/recipe.service';

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

  public recipe = <Recipe>{};
  constructor(public navCtrl: NavController, private recipeService: RecipeService) {
    // public storage : Storage
  }

  // ionViewDidLoad() {
  //   this.recipe = {};
  // }

  saveRecipe() {
    // this.storage.set('recipe1', this.recipe);
    this.recipeService.add(this.recipe);
  }



  // ionViewDidLoad() {
  //   console.log('Hello AddRecipeManuallyPage Page');
  // }

}
