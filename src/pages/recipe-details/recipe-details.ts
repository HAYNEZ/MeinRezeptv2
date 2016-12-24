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

  section:any;
  recipe: any;
  constructor(public navCtrl: NavController,
              public params: NavParams) {
    this.recipe = params.get("recipe");
    this.section = "general";
  }

  switchGeneral() {
    document.getElementById('demo').innerHTML = this.recipe.time;
  }

  switchIngredients() {
    document.getElementById('demo').innerHTML = this.recipe.time;
  }

  switchSteps() {
    document.getElementById('demo').innerHTML = 'Steps';
  }


  range(min, max ){
    let input = [];
    for( let i = min; i<=max; i++){
      input.push(i);
    }
    console.log(input);
    return input;
  }
}
