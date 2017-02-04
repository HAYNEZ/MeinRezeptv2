import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, PopoverController,AlertController } from 'ionic-angular';
import { ListService } from '../../providers/list.service';
import { RecipeService } from '../../providers/recipe.service';
import { AddRecipeManuallyPage } from '../add-recipe-manually/add-recipe-manually';
import { PopoverPagePage } from '../popover-page/popover-page';


@Component({
  selector: 'page-recipe-details',
  templateUrl: 'recipe-details.html'
})

export class RecipeDetailsPage {

  section:any;
  recipe: any;
  factor: any;
  calculatedValues: any;
  servingsDefault: any;

  constructor(public navCtrl: NavController,
              public params: NavParams,
              private listService: ListService,
              public popoverCtrl: PopoverController,
              private alertController: AlertController,
              private recipeService: RecipeService,
              private viewCtrl: ViewController) {
    this.recipe = params.get("recipe");
    this.section = "general";
    this.factor = 1;
    this.servingsDefault = this.recipe.portions;
    this.calculatedValues = new Array();
    for(var i = 0; i < this.recipe.ingredients.length; i++){
      this.calculatedValues[i]=this.recipe.ingredients[i][0];
    }
  }

  calcPortion(){
    var oldValue = this.recipe.portions
    var newValue = this.servingsDefault;
    this.factor = newValue/oldValue;
    for(var i = 0; i < this.recipe.ingredients.length; i++){
      this.calculatedValues[i] = Math.round(this.factor*this.recipe.ingredients[i][0]*100)/100;
    }
  }

  presentPopover(event) {
      let popover = this.popoverCtrl.create(PopoverPagePage, {
        actions : [
          {
            title: 'Bearbeiten',
            callback: () => { this.edit(); }
          },
          {
            title: 'Löschen',
            callback: () => { this.delete(); }
          },
          // {
          //   title: 'Teilen',
          //   callback: () => { this.future(); }
          // },
          {
            title: 'In Einkaufsliste',
            callback: () => { this.addToList(); }
          }
          // ,
          // {
          //   title: 'Kochmodus AN',
          //   callback: () => { this.future(); }
          // },
          // {
          //   title: 'Kochmodus AUS',
          //   callback: () => { this.future(); }
          // }
        ]
      });
      popover.present({ev:event});
  }

  delete() {
    console.log("Details - delete" + this.recipe.title);
      this.recipeService.delete(this.recipe);
      this.navCtrl.pop();
  }

  edit() {

    this.navCtrl.push(AddRecipeManuallyPage, {recipe: this.recipe, edit : true, callback: () => { } });
      this.viewCtrl.dismiss(this.recipe);
  }

  future() {
    let alert = this.alertController.create({
        title: "Noch nicht verfügbar...",
        buttons: [
            {
                text: "Abbrechen"
            }
        ]
    });
    alert.present();
  }



  dismiss(recipe) {
        this.viewCtrl.dismiss(recipe);
  }


  switchGeneral() {
    document.getElementById('demo').innerHTML = this.recipe.time;
  }

  switchIngredients() {
    document.getElementById('demo').innerHTML = this.recipe.time;
  }

  switchSteps() {
    document.getElementById('demo').innerHTML = 'Steps';
  }

  range(min, max){
    let input = [];
    for( let i = min; i<=max; i++){
      input.push(i);
    }
    // console.log(input);
    return input;
  }

  addToList(){
    for( let item of this.recipe.ingredients){
        this.listService.add({
        value: item[0],
        unit: item[1],
        product: item[2]
      });
    }
  }

}
