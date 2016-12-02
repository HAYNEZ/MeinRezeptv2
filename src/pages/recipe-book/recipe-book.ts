import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import {RecipeService} from '../../providers/recipe.service';

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

  recipes: any;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public recipeService: RecipeService) {
    console.log("recipe book : constructor");

    this.recipeService.getAllRecipes().then((res) => {
      this.recipes = res;
    });

    console.log("recipe book : constructor - RECIPES");
    console.log(typeof(this.recipes));

    // this.recipeService.getAllRecipes().then((res) => {
    //
    //   console.log(res);
    // });
    // this.recipeService.getAllRecipes().then((data) => {
    //   // if(typeof(data[0]) === "undefined"){
    //   //   let alert = this.alertCtrl.create({
    //   //     title: 'Oops!',
    //   //     subTitle : 'Sorry, there was an error',
    //   //     buttons: ['Ok']
    //   //   });
    //   //   alert.present();
    //   // }else{
    //     console.log("recipe-book : constructor");
    //     console.log(data);
    //     this.recipes =  data;
    //   // }
    // }, (err) => {
    //   console.log(err);
    // }
    // )
  }

  ionViewDidEnter() {
    console.log("Has entered - recipe book")
    this.recipeService.getAllRecipes().then((res) => {
      this.recipes = res;
    });
  }

  ionViewDidLoad() {

    console.log('Hello AddRecipeManuallyPage Page');
  }




}
