import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

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


  constructor(public navCtrl: NavController, public params: NavParams) {
     this.input = params.get("firstPassed");

  	 this.ingredients = this.input[0];

  	 this.preparation = this.input[1];
     
  }



  ionViewDidLoad() {
    console.log('Hello AddRecipeManuallyPage Page');
  }

}
