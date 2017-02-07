import { Component, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, PopoverController, ItemSliding} from 'ionic-angular';
import { ListService } from '../../providers/list.service';
import { PopoverPagePage } from '../popover-page/popover-page';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})


export class ShoppingListPage {

  public productList = [];
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
                private platform: Platform ) {}


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
        this.ionViewDidEnter();
        this.value = undefined;
        this.unit = "";
        this.product = "";

    }
  }

  editItem(key){
    console.log(key[0]);
        this.value = key.value;
        this.unit = key.unit;
        this.product = key.product;
        this.listService.delete(key);
  }

  edit(item){
    this.listService.update({
      _id: item._id,
      _rev: item._rev,
      value: item.value,
      unit: item.unit,
      product: item.product,
      checked: !item.checked
    });
    this.ionViewDidEnter();
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
      this.ionViewDidEnter();
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
                          this.ionViewDidEnter();
                      }
                  }
              ]
          });
          alert.present();
  }

  public deleteAllChecked(){
    for(var item of this.productList){
      if(item.checked)
        this.listService.delete(item);
    }
    this.ionViewDidEnter();
  }

  ionViewDidLoad(){
    console.log("did load");
    this.platform.ready().then(() => {
      this.listService.initDB();

      this.listService.getAll()
          .then(data => {
              this.zone.run(() => {
                  this.productList = data;
              });
          })
          .catch(console.error.bind(console));
        });
  }

  ionViewDidEnter() {
    console.log("did enter");
    this.platform.ready().then(() => {
        this.listService.getAll()
            .then(data => {
                console.log(data);
                    this.productList = data.reverse().sort(function(x, y) {
                      return (x.checked === y.checked)? 0 : x.checked? -1 : 1;
                    });
                    this.productList = this.productList.reverse();
                    console.log(this.productList);
            })
            .catch(console.error.bind(console));
          });

  }
}
