import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Information page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-information',
  templateUrl: 'information.html'
})
export class InformationPage {

  section:any;

  constructor(public navCtrl: NavController) {

    this.section = "idea";

  }

  ionViewDidLoad() {
    console.log('Hello InformationPage Page');
  }

}
