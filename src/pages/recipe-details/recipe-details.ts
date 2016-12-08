import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello RecipeDetailsPage Page');
  }

}
