import { Component, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, PopoverController} from 'ionic-angular';
import { ListService } from '../../providers/list.service';
import { PopoverPagePage } from '../popover-page/popover-page';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})

export class ShoppingListPage {

  public productList = [];
  public listFalse = [];
  public listTrue = [];
  public input:any;
  product: any;
  unit: any;
  value: any;
  checked: any;


  constructor(  public navCtrl: NavController,
                private alertController: AlertController,
                private zone: NgZone,
                private listService: ListService,
                public popoverCtrl: PopoverController,
                private platform: Platform ) {

                  this.listService.getAll()
                    .then(data => {
                          this.zone.run(() => {
                            this.productList = data;
                            this.listTrue = this.listService.filterChecked();
                            this.listFalse = this.listService.filterUnchecked();
                          });
                      })
                      .catch(console.error.bind(console));


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
            title: 'Alle erledigten löschen',
            callback: () => { this.deleteAllChecked(); }
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
            product: this.product,
            checked: false
        });
        this.value = undefined;
        this.unit = "";
        this.product = "";
    }
  }

  edit(key){
    var item = key;
    this.listService.delete(key);
    if(item.checked){
      this.listService.add({
          value: item.value,
          unit: item.unit,
          product: item.product,
          checked: false
      });
    }else{
      this.listService.add({
        value: item.value,
        unit: item.unit,
        product: item.product,
        checked: true
      });
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
                          for(var item of this.listTrue){
                            this.listService.delete(item);
                          }
                          for(var item of this.listFalse){
                            this.listService.delete(item);
                          }
                      }
                  }
              ]
          });
          alert.present();

  }

  public deleteAllChecked(){
    for(var item of this.listTrue){
      this.listService.delete(item);
    }
  }
}
