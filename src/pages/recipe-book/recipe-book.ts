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
  public recipes: Observable<Recipe[]>;

  constructor(public navCtrl: NavController, private recipeService: RecipeService) {
    //  public storage : Storage
  }

  ionViewDidLoad() {
    this.recipes = this.recipeService.getAll();
  }

  // ionViewDidLoad() {
  //   this.storage.get('recipe1').then((recipe) => {
  //     this.recipe = recipe;
  //   });
  //   console.log('Hello RecipeBookPage Page');
  // }

}
