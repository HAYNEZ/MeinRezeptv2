import { Component } from '@angular/core';
import { ViewController, AlertController, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-popover-page',
  templateUrl: 'popover-page.html'
})
export class PopoverPagePage {

  actions: any;

  constructor(public viewCtrl: ViewController,
              private alertController: AlertController,
              public navCtrl: NavController,
              private params: NavParams ) {
                this.actions = this.params.get('actions');
              }

  // Performs the particular task (function to call) and closes the page
  performAction(action){
    action.callback();
    this.close();
  }

  // Closes the popover
  close() {
    this.viewCtrl.dismiss();
  }

}
