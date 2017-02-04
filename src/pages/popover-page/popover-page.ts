import { Component } from '@angular/core';
import { ViewController, AlertController, NavController, NavParams } from 'ionic-angular';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { ListService } from '../../providers/list.service';


@Component({
  selector: 'page-popover-page',
  templateUrl: 'popover-page.html'
})

export class PopoverPagePage {

  actions: any;

  constructor(public viewCtrl: ViewController,
              private listService: ListService,
              private alertController: AlertController,
              public navCtrl: NavController,
              private params: NavParams ) {
                this.actions = this.params.get('actions');
              }

  performAction(action){
    action.callback();
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
