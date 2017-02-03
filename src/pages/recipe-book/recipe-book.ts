import { Component, NgZone} from '@angular/core';
import { NavController, Platform, ActionSheetController, PopoverController, AlertController } from 'ionic-angular';
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
    ) {
      console.log("construct");
        // this.platform.ready().then(() => {
        //     this.recipeService.initDB();
        //     this.listService.initDB();
        //
        //
        //     this.recipeService.getAll()
        //         .then(data => {
        //             this.zone.run(() => {
        //                 this.recipes = data;
        //             });
        //         })
        //         .catch(console.error.bind(console));
        //     this.recipeService.initialiseTags();
        // });

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
      // console.log(tags);
      let alert = this.alertCtrl.create({
        title: "Tag-Filter",
        subTitle: "Wähle einen Tag"
      });
      // alert.setTitle('Tag-Filter');
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
          // console.log('Checkbox data:', data);
          // this.testCheckboxOpen = false;
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

    // sortDate(){
    //   this.recipes.sort(function(a,b) {
    //       return new Date(a.date).getTime() - new Date(b.date).getTime()
    //   });
sortDate(){
this.recipes.sort(function(a,b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
})

    this.recipes.reverse();

    }

    removeTagFilter() {
      this.tagString = null;
      this.ionViewDidEnter();
    }
    ionViewDidLoad(){
      console.log("did load");
      this.platform.ready().then(() => {
      this.recipeService.initDB();
      this.listService.initDB();


      this.recipeService.getAll()
          .then(data => {
              this.zone.run(() => {
                console.log(data);
                  this.recipes = data;
              });
          })
          .catch(console.error.bind(console));
      this.recipeService.initialiseTags();
    });
    }

    ionViewDidEnter() {
      console.log("did enter");
      // console.log("did enter");
      //   // this.setFilteredItems();
      //   this.platform.ready().then(() => {
      //   this.recipeService.getAll().then((data) => {
      //     console.log(data);
      //     this.recipes = data;
      //   }).catch(console.error.bind(console));
      // });
      // console.log(this.recipes);


          this.recipeService.getAll()
              .then(data => {
                console.log(data);
                  // this.zone.run(() => {
                      this.recipes = data;
                  // });
              })
              .catch(console.error.bind(console));


    }

    setFilteredItems() {
        // this.recipes = this.recipeService.filterItemsIngredient(this.searchTerm);

          this.titleResults = this.recipeService.filterItemsTitle(this.searchTerm);
          this.ingredientResults = this.recipeService.filterItemsIngredient(this.searchTerm);
          if(this.searchTerm.valueOf() == ''){
            this.titleResults = null;
            this.ingredientResults = null;
        }

    }

}
