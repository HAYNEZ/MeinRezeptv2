import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  //  public recipes: any;

    constructor(public navCtrl: NavController, private recipeService: RecipeService) {

      /*  this.recipeService.getAll().then((res) => {
            this.recipes = res;
        });*/
    }

 /* ionViewDidLoad() {
      this.recipeService.getAll().then((res) => {
          this.recipes = res;
      });
  }*/

  saveRecipe() {
      let recipe = {
          "title": this.title
      }
      // this.storage.set('recipe1', this.recipe);
      this.recipeService.add(recipe);
  }



}
