import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ListService } from '../../providers/list.service';
import { RecipeService } from '../../providers/recipe.service';

@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html'
})

export class RecipeDetailsPage {

  section:any;
  recipe: any;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              private listService: ListService,
              private recipeService: RecipeService,
             private viewCtrl: ViewController) {
    this.recipe = params.get("recipe");
    this.section = "general";
  }

  delete(recipe) {
      this.recipeService.delete(this.recipe);
         this.dismiss(this.recipe);
  }

  update(){


  }



  dismiss(recipe) {
        this.viewCtrl.dismiss(recipe);
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

  range(min, max){
    let input = [];
    for( let i = min; i<=max; i++){
      input.push(i);
    }
    console.log(input);
    return input;
  }

  addToList(){
    for( let item of this.recipe.ingredients){
        this.listService.add({
        value: item[0],
        unit: item[1],
        product: item[2]
      });
    }
  }
}
