import { Component, NgZone } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { ListService } from '../../providers/list.service';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})

export class ShoppingListPage {

  public productList= [];

  constructor(public navCtrl: NavController, private alertController: AlertController,
    private zone: NgZone, private listService: ListService) {
    this.productList = [];

    this.listService.getAll().then(data => {
            this.zone.run(() => {
                this.productList = data;
            });
    }).catch(console.error.bind(console));
  }

  public add() {
        let alert = this.alertController.create({
            title: "Add Item",
            message: "Füge eine Artikel hinzu!",
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
                    text: "Hinzufühgen",
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
      var index = this.productList.indexOf(key, 0);
      this.productList.splice(index,1);
    }

    public deleteAll(){
      var all = this.productList.length;
      this.productList.splice(0,all);
    }


  ionViewDidLoad() {
    this.listService.getAll().then(data => {
          this.zone.run(() => {
              this.productList = data;
          });
    }).catch(console.error.bind(console));
  }





}
