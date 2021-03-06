import { Component, NgZone } from '@angular/core';
import { NavController, Platform, ActionSheetController, PopoverController, AlertController } from 'ionic-angular';
import { RecipeService } from '../../providers/recipe.service';
import { ListService } from '../../providers/list.service';
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { InformationPage } from '../information/information';
import { PopoverPagePage } from '../popover-page/popover-page';


@Component({
  selector: 'page-recipe-book',
  templateUrl: 'recipe-book.html'
})

export class RecipeBookPage {

    searchTerm: string = '';
    public recipes = [];
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

    showInformation() {
      this.navCtrl.push(InformationPage);
    }

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

    showDetails(recipe) {
      this.navCtrl.push(RecipeDetailsPage, {recipe: recipe});
    }

    delete(recipe) {
        this.recipeService.delete(recipe);
    }

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

    sortRating() {
      this.recipes.sort(function(a, b){
          return a.rating-b.rating
      });
      this.recipes.reverse();
     }

    sortDate(){
        this.recipes.sort(function(a,b) {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        });
        this.recipes.reverse();
    }

    removeTagFilter() {
      this.tagString = null;
      this.ionViewDidEnter();
    }

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

    ionViewDidEnter() {
      this.tagString = null;
          this.recipeService.getAll()
              .then(data => {
                      this.recipes = data;
              })
              .catch(console.error.bind(console));
    }

    setFilteredItems() {
          this.titleResults = this.recipeService.filterItemsTitle(this.searchTerm);
          this.ingredientResults = this.recipeService.filterItemsIngredient(this.searchTerm);
          if(this.searchTerm.valueOf() == ''){
            this.titleResults = null;
            this.ingredientResults = null;
        }
    }
}
