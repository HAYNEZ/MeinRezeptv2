import { Component, NgZone } from '@angular/core';
import { NavController, Platform, ActionSheetController} from 'ionic-angular';
import { RecipeService } from '../../providers/recipe.service';
// <<<<<<< HEAD
// import { RecipeDetailsPage } from '../recipe-details/recipe-details';
// =======
import {RecipeDetailsPage} from '../recipe-details/recipe-details';
import { PopoverController } from 'ionic-angular';
import { MyPopOverPage } from './detailsuche';
// >>>>>>> 6ec91ef34feb7c2feedebc98687dffc92b276e7b

/*
  Generated class for the RecipeBook page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-recipe-book',
    templateUrl: 'recipe-book.html'
})
export class RecipeBookPage {

    searchTerm: string = '';
    public recipes = [];

// <<<<<<< HEAD
//     constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private recipeService: RecipeService,
// =======
    constructor(public navCtrl: NavController,public popoverCtrl: PopoverController, private recipeService: RecipeService,
// >>>>>>> 6ec91ef34feb7c2feedebc98687dffc92b276e7b
        private platform: Platform,
        private zone: NgZone) {
        this.platform.ready().then(() => {
            this.recipeService.initDB();

            this.recipeService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.recipes = data;
                    });
                })
                .catch(console.error.bind(console));
        });

    }

    showDetails(recipe) {
        this.navCtrl.push(RecipeDetailsPage, { recipe: recipe });
    }

    delete(recipe) {
        this.recipeService.delete(recipe);
    }

// <<<<<<< HEAD
//     presentActionSheet() {
//         const actionSheet = this.actionSheetCtrl.create({
//             buttons: [
//                 {
//                     text: 'Alphabetisch',
//                     handler: () => {
//                        this.sortAlphabetically();
//
//                     }
//                 }, {
//                     text: 'Erstellungsdatum',
//                     handler: () => {
//
//                     }
//                 }, {
//                     text: 'Favoriten',
//                     handler: () => {
//
//                     }
//                 }, {
//                     text: 'Kochhäufigkeit',
//                     handler: () => {
//
//                     }
//                 }, {
//                     text: 'Preis',
//                     handler: () => {
//
//                     }
//                 }
//             ]
//         });
//         actionSheet.present();
//     }
//
//
//     sortAlphabetically() {
//
//         let sortedContacts = this.recipes.sort();
//         let currentLetter = false;
//         let currentContacts = [];
//
//         sortedContacts.forEach((value, index) => {
//
//             if (value.charAt(0) != currentLetter) {
//
//                 currentLetter = value.charAt(0);
//
//                 let newGroup = {
//                     letter: currentLetter,
//                     contacts: []
//                 };
//
//                 currentContacts = newGroup.contacts;
//
//
//             }
//
//             currentContacts.push(value);
//
//         });
//
//     }
// =======
    ionViewDidLoad() {

        this.setFilteredItems();

    }

    setFilteredItems() {

        this.recipes = this.recipeService.filterItems(this.searchTerm);

    }

  presentPopover() {
  }



// >>>>>>> 6ec91ef34feb7c2feedebc98687dffc92b276e7b

}
