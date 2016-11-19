import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  navigatePhoto() {
    this.navCtrl.push(HomePage, {});
  }

}
