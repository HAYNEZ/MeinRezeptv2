import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Detailsuche page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detailsuche',
  templateUrl: 'detailsuche.html'
})
export class DetailsuchePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DetailsuchePage Page');
  }

}
