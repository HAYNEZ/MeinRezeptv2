import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AddRecipeManuallyPage } from '../add-recipe-manually/add-recipe-manually';
import { HomePage } from '../home/home';

/*
  Generated class for the AddRecipe page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-recipe',
  templateUrl: 'add-recipe.html'
})
export class AddRecipePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {

  }
  navigateOptionOne() {
    this.navCtrl.push(AddRecipeManuallyPage, {});
  }

  navigateOptionTwo() {
    this.navCtrl.push(HomePage, {});
  }

}
