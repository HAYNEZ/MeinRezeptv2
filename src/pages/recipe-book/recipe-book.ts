import { Component, NgZone } from '@angular/core';
import { NavController, Platform, ActionSheetController, PopoverController, AlertController } from 'ionic-angular';

//Page import
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { InformationPage } from '../information/information';
import { PopoverPagePage } from '../popover-page/popover-page';

//Service import
import { RecipeService } from '../../providers/recipe.service';
import { ListService } from '../../providers/list.service';


@Component({
  selector: 'page-recipe-book',
  templateUrl: 'recipe-book.html'
})
export class RecipeBookPage {

    recipes = [];
    searchTerm: string = '';
    tagString: string;

    titleResults: any;
    ingredientResults: any;

    constructor(
      public navCtrl: NavController,
      public actionSheetCtrl: ActionSheetController,
      public popoverCtrl: PopoverController,
      private alertCtrl: AlertController,
      private recipeService: RecipeService,
      private platform: Platform,
      private zone: NgZone,
      private listService : ListService
    ) {}

    //Opens the Impressum page
    showInformation() {
      this.navCtrl.push(InformationPage);
    }

    //Menu functionality : Shows menu with two functions: Sort and Tag-Filter
    presentPopover(event) {
        let popover = this.popoverCtrl.create(PopoverPagePage, {
          actions : [
            {
              title: 'Sortieren ...',
              callback: () => { this.presentSortOptions(); }
            },
            {
              title: 'Tag-Filter',
              callback: () => { this.presentTagFilter(); }
            }
          ]
        });
        popover.present({ev:event});
    }

    //When clicking on a recipe, the details page of the recipe opens
    showDetails(recipe) {
      this.navCtrl.push(RecipeDetailsPage, {recipe: recipe});
    }

    //Deletes a recipe
    delete(recipe) {
        this.recipeService.delete(recipe);
    }

    //Opens a popup window and lets you sort recipes by tags
    presentTagFilter() {
      let tags = this.recipeService.getTags();

      let alert = this.alertCtrl.create({
        title: "Tag-Filter",
        subTitle: "Wähle einen Tag"
      });
      for(let i = 0; i < tags.length; i++){
        alert.addInput({
          type: 'radio',
          label: tags[i],
          value: tags[i]
        })
      }
      alert.addButton('Abbrechen');
      alert.addButton({
        text: 'Filtern',
        handler: data => {
          this.tagString = data;
          this.recipes = this.recipeService.filterTag(data);
        }
      });
      alert.present();
    }

    //Opens a popup window and lets you sort recipes by alphabet, rating or date
    presentSortOptions() {
       const actionSheet = this.actionSheetCtrl.create({
           buttons: [
               {
                   text: 'Alphabetisch',
                   handler: () => {
                      this.sortAlphabetically();
                   }
               }, {
                   text: 'Bewertung',
                   handler: () => {
                     this.sortRating();
                   }
               }, {
                   text: 'Datum',
                   handler: () => {
                     this.sortDate();
                   }
               }, {
                 text: 'Abbruch',
                 role: 'cancel'
               }
           ]
       });
       actionSheet.present();
   }

   //Sorting recipes alphabetically
   sortAlphabetically() {
    this.recipes.sort(function(a, b){
         var titleA=a.title.toLowerCase(), titleB=b.title.toLowerCase()
         if (titleA < titleB) //sort string ascending
             return -1
         if (titleA > titleB)
             return 1
         return 0 //default return value (no sorting)
     });
    }

    //Sorting recipes by rating in descending order
    sortRating() {
      this.recipes.sort(function(a, b){
          return a.rating-b.rating
      });
      this.recipes.reverse();
     }

    //Sorting recipes by date in descending order
    sortDate(){
        this.recipes.sort(function(a,b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });
        this.recipes.reverse();
    }

    //Stops the filtering function
    removeTagFilter() {
      this.tagString = null;
      this.ionViewDidEnter();
    }

    //Function for filtering by title or ingredients
    setFilteredItems() {
          this.titleResults = this.recipeService.filterItemsTitle(this.searchTerm);
          this.ingredientResults = this.recipeService.filterItemsIngredient(this.searchTerm);
          if(this.searchTerm.valueOf() == ''){
            this.titleResults = null;
            this.ingredientResults = null;
        }
    }

    // Lifecycle event provided by the NavController
    // "Runs when the page has loaded. This event only happens once per page being created."
    // https://ionicframework.com/docs/v2/api/navigation/NavController/
    // Receiving all items from device's storage, saving them as a array named "recipes", initialises tags
    ionViewDidLoad(){
      this.platform.ready().then(() => {
        this.recipeService.initDB();
        this.listService.initDB();

        this.recipeService.getAll()
            .then(data => {
                this.zone.run(() => {
                    this.recipes = data;
                });
            })
            .catch(console.error.bind(console));
        this.recipeService.initialiseTags();
      });
    }

    // Lifecycle event provided by the NavController
    // "Runs when the page has fully entered and is now the active page."
    // https://ionicframework.com/docs/v2/api/navigation/NavController/
    // Receiving all items from devices storage, saving them as a global array named "recipes"
    ionViewDidEnter() {
      this.tagString = null;
          this.recipeService.getAll()
              .then(data => {
                      this.recipes = data;
              })
              .catch(console.error.bind(console));
    }

}
