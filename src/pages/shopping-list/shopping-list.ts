import { Component, NgZone } from '@angular/core';
import { NavController, AlertController, PopoverController} from 'ionic-angular';

import { ListService } from '../../providers/list.service';
import { PopoverPagePage } from '../popover-page/popover-page';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})

export class ShoppingListPage {

  public productList= [];

  constructor(public navCtrl: NavController, private alertController: AlertController,
    private zone: NgZone, private listService: ListService, public popoverCtrl: PopoverController ) {
      // this.listService.initDB();
    // this.productList = [];
    this.listService.getAll().then(data => {
            this.zone.run(() => {
                this.productList = data;
            });
    }).catch(console.error.bind(console));
  }

  presentPopover(event) {
      let popover = this.popoverCtrl.create(PopoverPagePage);
      popover.present({ ev: event });
  }

  public add() {
        let alert = this.alertController.create({
            title: "Artikel hinzufügen",
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
                    }
                }
            ]
        });
        alert.present();
    }

    public delete(key){
      this.listService.delete(key);
    }

  ionViewDidLoad() {
    this.productList = this.listService.getItems();
    // this.listService.getAll().then(data => {
    //       this.zone.run(() => {
    //           this.productList = data;
    //       });
    // }).catch(console.error.bind(console));
  }
}
