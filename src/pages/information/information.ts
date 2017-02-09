import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-information',
  templateUrl: 'information.html'
})
export class InformationPage {

    section : any;

    constructor(public navCtrl: NavController) {
      //preselected section
      this.section = "idea";
    }
    
}
