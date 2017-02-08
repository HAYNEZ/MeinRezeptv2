import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-information',
  templateUrl: 'information.html'
})

export class InformationPage {
  section : any;
    constructor(public navCtrl: NavController) {
      //selected section
      this.section = "idea";
    }
}
