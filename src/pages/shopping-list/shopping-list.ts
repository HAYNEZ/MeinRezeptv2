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
  public input:any;
  product: any;
  unit: any;
  value: any;


  constructor(  public navCtrl: NavController,
                private alertController: AlertController,
                private zone: NgZone,
                private listService: ListService,
                public popoverCtrl: PopoverController ) {
      // this.listService.initDB();
    // this.productList = [];
    this.listService.getAll().then(data => {
            this.zone.run(() => {
                this.productList = data;
            });
    }).catch(console.error.bind(console));
  }

  readinputs(){
    this.value = this.input.value;
    this.unit = this.input.unit;
    this.product = this.input.product;
  }

  presentPopover(event) {
      let popover = this.popoverCtrl.create(PopoverPagePage, {
        actions : [
          {
            title: 'Alle löschen',
            callback: () => { this.deleteAll(); }
          },
          {
            title: 'Online einkaufen',
            callback: () => { this.shopOnline();}
          }
        ]
      });
      popover.present({ ev: event });
  }

  public add() {
    if(this.product){
        this.listService.add({
            value: this.value,
            unit: this.unit,
            product: this.product
        });
        this.value = undefined;
        this.unit = "";
        this.product = "";
    }
  }

  shopOnline(){
      let alert = this.alertController.create({
          title: "Bald verfügbar",
          buttons: [
              {
                  text: "Abbrechen"
              }
            ]
      })
      alert.present();
  }

  public delete(key){
      this.listService.delete(key);
  }

  public deleteAll(){
      let alert = this.alertController.create({
              title: "Bestätigung",
              message: "Wirklich alles löschen?",
              buttons: [
                  {
                      text: "Abbrechen"
                  },
                  {
                      text: "Sicher!",
                      handler: data => {
                          for(var item of this.productList){
                            this.listService.delete(item);
                          }
                      }
                  }
              ]
          });
          alert.present();

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
