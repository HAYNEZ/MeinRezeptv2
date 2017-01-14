import { Component, NgZone} from '@angular/core';
import { NavController, Platform, ActionSheetController, PopoverController } from 'ionic-angular';
import { RecipeService } from '../../providers/recipe.service';
import { ListService } from '../../providers/list.service';
import {RecipeDetailsPage} from '../recipe-details/recipe-details';
import { InformationPage} from '../information/information';
// import { MyPopOverPage } from './detailsuche';
import { PopoverPagePage } from '../popover-page/popover-page';


@Component({
  selector: 'page-recipe-book',
  templateUrl: 'recipe-book.html'
})

export class RecipeBookPage {

    searchTerm: string = '';
    public recipes = [];

    constructor(
      public navCtrl: NavController,
      public actionSheetCtrl: ActionSheetController,
      public popoverCtrl: PopoverController,
      private recipeService: RecipeService,
      private addRecipeManually: RecipeService,
      private platform: Platform,
      private zone: NgZone,
      private listService : ListService
    ) {
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
        });
    }

    showInformation() {
      this.navCtrl.push(InformationPage);
    }

    presentPopover(event) {
        let popover = this.popoverCtrl.create(PopoverPagePage, {
          actions : [
            {
              title: 'Sortieren ...',
              callback: () => { this.presentSortOptions(); }
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

    presentSortOptions() {
       const actionSheet = this.actionSheetCtrl.create({
           buttons: [
               {
                   text: 'Alphabetisch',
                   handler: () => {
                      this.sortAlphabetically();

                   }
               },  {
                   text: 'Bewertung',
                   handler: () => {
                  this.sortRating();
                   }
               },  {
                   text: 'Datum',
                   handler: () => {
                  this.sortDate();
                   }
               },{
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
     })
    }

    sortRating() {
      this.recipes.sort(function(a, b){
          return a.rating-b.rating
      })

      this.recipes.reverse();
     }

sortDate(){
this.recipes.sort(function(a,b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
});

}

    ionViewDidLoad() {
        this.setFilteredItems();
    }

    setFilteredItems() {
        this.recipes = this.recipeService.filterItems(this.searchTerm);
    }

}
