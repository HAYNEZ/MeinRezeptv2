import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from 'rxjs/rx';

// import {Storage} from '@ionic/storage';
import {RecipeService} from '../../providers/recipe.service';
import {Recipe} from '../../models/recipe';

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

  //
  // recipe : any;
  public recipes: any;

  constructor(public navCtrl: NavController, private recipeService: RecipeService) {
    //  public storage : Storage
    this.recipeService.getAll().then((res)  => {
      this.recipes = res;
    });
  }

  ionViewDidLoad() {
    this.recipeService.getAll().then((res)  => {
      this.recipes = res;
    });
  }

  // ionViewDidLoad() {
  //   this.storage.get('recipe1').then((recipe) => {
  //     this.recipe = recipe;
  //   });
  //   console.log('Hello RecipeBookPage Page');
  // }

}
