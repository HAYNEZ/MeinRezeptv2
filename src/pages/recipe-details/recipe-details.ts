import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddRecipePage } from '../add-recipe/add-recipe';

/*
  Generated class for the RecipeDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html'
})
export class RecipeDetailsPage {

  recipe: any;
  constructor(public navCtrl: NavController,
              public params: NavParams) {
    this.recipe = params.get("recipe");
  }

  ionViewDidLoad() {
    console.log('Hello RecipeDetailsPage Page');
  }

  switchIngredients() {
  document.getElementById('demo').innerHTML = recipe.time;
  }

  switchSteps() {
  document.getElementById('demo').innerHTML = 'Steps'
  }

}
