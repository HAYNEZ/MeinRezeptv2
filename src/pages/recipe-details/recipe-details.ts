import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, PopoverController, AlertController } from 'ionic-angular';
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
    }

    // Calculating ingredients values for different portion values
    calcPortion(){
      let oldValue = this.recipe.portions;
      let newValue = this.servingsDefault;
      this.factor = newValue/oldValue;
      for(let i = 0; i < this.recipe.ingredients.length; i++){
        if(this.recipe.ingredients[i][0]){
          this.calculatedValues[i] = Math.round(this.factor*this.recipe.ingredients[i][0]*100)/100;
        }
      }
    }

    // Activate top-right-corner menu popover and hand over page specific functions
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
          {
            title: 'Teilen',
            callback: () => { this.future(); }
          },
          {
            title: 'In Einkaufsliste',
            callback: () => { this.addToList(); }
          }
          ,
          {
            title: 'Kochmodus AN',
            callback: () => { this.future(); }
          },
          {
            title: 'Kochmodus AUS',
            callback: () => { this.future(); }
          }
        ]
      });
      popover.present({ev:event});
    }

    // Deletes the current recipe from the devices storage
    delete() {
      this.recipeService.delete(this.recipe);
      this.navCtrl.pop();
    }

    // Pushes the current recipe into the AddRecipeManuallyPage where it can be edited
    edit() {
      this.navCtrl.push(AddRecipeManuallyPage, {recipe: this.recipe, edit : true});
      this.viewCtrl.dismiss(this.recipe);
    }

    // Placeholder method for a future features
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

    // Removes current details page as active page
    dismiss(recipe) {
      this.viewCtrl.dismiss(recipe);
    }

    // Changes active view to the general tab
    switchGeneral() {
      document.getElementById('demo').innerHTML = this.recipe.time;
    }

    // Changes active view to the ingredients tab
    switchIngredients() {
      document.getElementById('demo').innerHTML = this.recipe.time;
    }

    // Changes active view to the steps tab
    switchSteps() {
      document.getElementById('demo').innerHTML = 'Steps';
    }

    // Return the input points of the rating system
    range(min, max){
      let input = [];
      for( let i = min; i<=max; i++){
        input.push(i);
      }
      return input;
    }

    // Adds all items of the recipe to the shopping-list storage
    addToList(){
      for( let item of this.recipe.ingredients){
        this.listService.add({
          value: item[0],
          unit: item[1],
          product: item[2]
        });
      }
    }

    // Lifecycle event provided by the NavController
    // "Runs when the page has loaded. This event only happens once per page being created."
    // https://ionicframework.com/docs/v2/api/navigation/NavController/
    // Prepares the preparation string for a better display, by splitting it after each ending sentence
    ionViewDidLoad(){
      if(this.recipe.preparation != null && typeof this.recipe.preparation === 'string'){
        let array = this.recipe.preparation.split(".");
        for(let i = 0; i < array.length; i++){
          if(array[i] != ""){
            array[i] = array[i] + ".\n";
          }
        }
        this.recipe.preparation = array;
      }
      this.factor = 1;
      this.servingsDefault = this.recipe.portions;
      this.calculatedValues = [];
      for(let i = 0; i < this.recipe.ingredients.length; i++){
        this.calculatedValues[i] = this.recipe.ingredients[i][0];
      }
    }
  }
