import { Component, NgZone } from '@angular/core';
import { NavController, Platform, AlertController, PopoverController } from 'ionic-angular';

//Page import
import { PopoverPagePage } from '../popover-page/popover-page';

//Service import
import { ListService } from '../../providers/list.service';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {

  public productList = [];
  public input: any;
  product: any;
  unit: any;
  value: any;
  checked: any;
  containsChecked: boolean = false;

  constructor(
    public navCtrl: NavController,
    private alertController: AlertController,
    private zone: NgZone,
    private listService: ListService,
    public popoverCtrl: PopoverController,
    private platform: Platform ) {}

    // Reading all inputs from input-fields inside the HTML-page and store them for later use
    readinputs(){
      this.value = this.input.value;
      this.unit = this.input.unit;
      this.product = this.input.product;
    }

    // Activate top-right-corner menu popover and hand over page specific functions
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
            callback: () => { this.future();}
          }
        ]
      });
      popover.present({ ev: event });
    }

    // Store item containing the input-values in the devices storage
    public add() {
      //Adding item via listService only if it contains a product describtion that is not NULL
      if(this.product){
        this.listService.add({
          value: this.value,
          unit: this.unit,
          product: this.product,
          checked: false
        });
        // Reset input-placeholders to default
        this.ionViewDidEnter();
        this.value = undefined;
        this.unit = "";
        this.product = "";
      }
    }

    // Inserts item values into input-fields to enable editing
    editItem(key){
      this.value = key.value;
      this.unit = key.unit;
      this.product = key.product;
      this.listService.delete(key);
      this.ionViewDidEnter();
    }

    // Inverts the item checked value as it gets checked or unchecked
    editChecked(item){
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

    // Placeholder method for future features
    future(){
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

    // Deleting a specific item from the devices storage
    public delete(key){
      this.listService.delete(key);
      this.ionViewDidEnter();
    }

    // Deleting all items from the devices storage, including an alert asking for verification
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

    // Deleting all items that are checked from the devices storage
    public deleteAllChecked(){
      for(var item of this.productList){
        if(item.checked)
        this.listService.delete(item);
      }
      this.ionViewDidEnter();
    }

    // Lifecycle event provided by the NavController
    // "Runs when the page has loaded. This event only happens once per page being created."
    // https://ionicframework.com/docs/v2/api/navigation/NavController/
    // Receiving all items from devices storage, saving them as a global productList
    ionViewDidLoad(){
      this.platform.ready().then(() => {
        this.listService.initDB();
        this.listService.getAll().then(data => {
          this.zone.run(() => {
            this.productList = data;
          });
        }).catch(console.error.bind(console));
      });
    }

    // Lifecycle event provided by the NavController
    // "Runs when the page has fully entered and is now the active page."
    // https://ionicframework.com/docs/v2/api/navigation/NavController/
    // Receiving all items from devices storage, saving them as a global prductList
    // Iterating the productList for checked items setting the containsChecked variable accordingly
    ionViewDidEnter() {
      this.containsChecked = false;
      this.platform.ready().then(() => {
        this.listService.getAll().then(data => {
          this.productList = data;
          for(let item of this.productList){
            if(item.checked){
              this.containsChecked = true;
            }
          }
        }).catch(console.error.bind(console));
      });
    }

}
