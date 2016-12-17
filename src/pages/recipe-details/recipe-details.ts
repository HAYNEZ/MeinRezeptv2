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
  this.paintStars();
    console.log('Hello RecipeDetailsPage Page');
  }

  switchIngredients() {
  document.getElementById('demo').innerHTML = this.recipe.time;
  }

  switchSteps() {
  document.getElementById('demo').innerHTML = 'Steps'
  }

  paintStars() {
  let rating = document.getElementById('rating');
  console.log("Rating" + rating);
  for(var i=0; i<this.recipe.rating ; i++){
    var node = document.createElement("SPAN");
    var symbol = document.createTextNode("☆");
    node.appendChild(symbol);
    rating.appendChild(node);
  }

  }

}
