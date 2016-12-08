import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})

export class ShoppingListPage {

  public productList: Array<Object>;

  constructor(public navCtrl: NavController, private alertController: AlertController) {
    this.productList = [];
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
                        this.productList.push({
                            value: data.value,
                            name: data.product,
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
    console.log('Hello ShoppingListPage Page');
  }
}
