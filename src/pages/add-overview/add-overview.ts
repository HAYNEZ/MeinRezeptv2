import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

//Page imports
import { AddRecipeManuallyPage } from '../add-recipe-manually/add-recipe-manually';
import { TextRecognitionPage } from '../text-recognition/text-recognition';


@Component({
  selector: 'page-add-overview',
  templateUrl: 'add-overview.html'
})
export class AddOverviewPage {

  textrecognitionOption: Number = 0;

  constructor(
    public navCtrl: NavController,
    public params: NavParams
  ) {}

  //Navigates to AddManuallyPage
  navigateOptionOne() {
    this.navCtrl.push(AddRecipeManuallyPage);
  }

  //Navigates to TextRecognitionPage and transfers the option number for gallery(0), camera(1) or demo(2)
  navigateOptionTwo(option: Number){
    this.navCtrl.push(TextRecognitionPage, {option: option});
  }

}
