import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
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

    title: any;

    constructor(public navCtrl: NavController,
                private recipeService: RecipeService,
                private viewCtrl: ViewController){}

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
