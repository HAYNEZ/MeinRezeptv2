import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListService } from '../../providers/list.service';

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
              public params: NavParams, private listService: ListService) {
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

  addToList(){
    for( let item of this.recipe.ingredients){
    console.log(item);
        this.listService.add({
        value: item[0],
        unit: item[1],
        product: item[2]
      });
    }
  }

}
