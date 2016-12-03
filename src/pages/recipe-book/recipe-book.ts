import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import {RecipeService} from '../../providers/recipe.service';

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

  recipes: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public recipeService: RecipeService) {
    console.log("recipe book : constructor");

    this.recipeService.getAllRecipes().then((res) => {
      this.recipes = res;
    });

    console.log("recipe book : constructor - RECIPES");
    console.log(typeof(this.recipes));

  }

  ionViewDidEnter() {
    console.log("Has entered - recipe book")
    this.recipeService.getAllRecipes().then((res) => {
      this.recipes = res;
    });
  }

  ionViewDidLoad() {

    console.log('Hello AddRecipeManuallyPage Page');
  }




}
