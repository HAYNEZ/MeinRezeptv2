import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {RecipeService} from '../../providers/recipe.service';


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
  title : any;
  portions : any;
  description : any;

  constructor(public navCtrl: NavController, public recipeService: RecipeService) {

  }

  saveRecipe() {
    let recipe = {
      title : this.title,
      portions : this.portions,
      description : this.description
    };

    this.recipeService.addRecipe(recipe);

    this.navCtrl.pop();
    // .then((res) => {
    //   this.navCtrl.popToRoot();
    // }, (err) => {
    //   console.log(err);
    // })

    //take recipeService and call method addRecipe(recipe)
    //check if nothing required is missing
    //Go to details page

    //Catch possible errors



  }

  ionViewDidLoad() {
    console.log('Hello AddRecipeManuallyPage Page');
  }

}
