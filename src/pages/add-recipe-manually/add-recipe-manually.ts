import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello AddRecipeManuallyPage Page');
  }

}
