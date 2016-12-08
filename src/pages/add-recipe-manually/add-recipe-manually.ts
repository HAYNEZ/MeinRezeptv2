import { Component } from '@angular/core';

import { NavController,NavParams, ViewController} from 'ionic-angular';


import { RecipeService } from '../../providers/recipe.service';

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
	 public ingredients:any;
	 public preparation:any;
	 public input:any;
   title: any;

  constructor(public navCtrl: NavController, public params: NavParams,private recipeService: RecipeService,
                private viewCtrl: ViewController) {
     this.input = params.get("firstPassed");

  	 this.ingredients = this.input[0];

  	 this.preparation = this.input[1];
     
  }

  saveRecipe() {
      let recipe = {
          "title": this.title
      }
      this.recipeService.add(recipe);
      this.dismiss(recipe);
  }

  dismiss(recipe) {
        this.viewCtrl.dismiss(recipe);
    }
}
