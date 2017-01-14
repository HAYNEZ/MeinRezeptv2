import { Component } from '@angular/core';
import { ViewController, AlertController, NavController } from 'ionic-angular';
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

  constructor(public viewCtrl: ViewController, private listService: ListService, private alertController: AlertController, public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello PopoverPagePage Page');
  }

  public deleteAll(){
    this.listService.deleteDB();
    this.listService.initDB();
    this.close();
    /*location.reload();*/
  }

  public add() {
        let alert = this.alertController.create({
            title: "Artikel hinzufügen",
            // message: "Füge einen Artikel hinzu!",
            inputs: [
                {
                    name: "value",
                    placeholder: "Anzahl"
                },
                {
                    name: "unit",
                    placeholder: "Einheit"
                },
                {
                    name: "product",
                    placeholder: "Artikel"
                }
            ],
            buttons: [
                {
                    text: "Abbrechen"
                },
                {
                    text: "Hinzufügen",
                    handler: data => {
                      this.listService.add({
                        value: data.value,
                        unit: data.unit,
                        product: data.product,
                      });
                      this.viewCtrl.dismiss();
                    }
                }
            ]
        });
        alert.present();
    }
  close() {
    this.viewCtrl.dismiss();
  }
}
