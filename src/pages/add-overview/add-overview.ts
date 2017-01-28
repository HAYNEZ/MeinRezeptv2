import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AddRecipeManuallyPage } from '../add-recipe-manually/add-recipe-manually';
import { TextRecognitionPage } from '../text-recognition/text-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  textrecognitionOption: Number = 0;

  constructor(
    public navCtrl: NavController,
    public params: NavParams
  ) {}

  navigateOptionOne() {
    this.navCtrl.push(AddRecipeManuallyPage);
  }

  navigateOptionTwo(option: Number){
    this.navCtrl.push(TextRecognitionPage, {option: option});
  }
}
