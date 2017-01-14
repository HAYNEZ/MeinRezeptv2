import { Component } from '@angular/core';
import { ViewController, AlertController, NavController, NavParams } from 'ionic-angular';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { ListService } from '../../providers/list.service';

/*
  Generated class for the PopoverPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

  // public deleteAll(){
  //   this.listService.deleteDB();
  //   this.listService.initDB();
  //   this.close();
  //   /*location.reload();*/
  // }

  // public add() {
  //       let alert = this.alertController.create({
  //           title: "Artikel hinzufügen",
  //           // message: "Füge einen Artikel hinzu!",
  //           inputs: [
  //               {
  //                   name: "value",
  //                   placeholder: "Anzahl"
  //               },
  //               {
  //                   name: "unit",
  //                   placeholder: "Einheit"
  //               },
  //               {
  //                   name: "product",
  //                   placeholder: "Artikel"
  //               }
  //           ],
  //           buttons: [
  //               {
  //                   text: "Abbrechen"
  //               },
  //               {
  //                   text: "Hinzufügen",
  //                   handler: data => {
  //                     this.listService.add({
  //                       value: data.value,
  //                       unit: data.unit,
  //                       product: data.product,
  //                     });
  //                     this.viewCtrl.dismiss();
  //                   }
  //               }
  //           ]
  //       });
  //       alert.present();
  //   }
  close() {
    this.viewCtrl.dismiss();
  }
}
