import { Component, NgZone} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { RecipeService } from '../../providers/recipe.service';
import {RecipeDetailsPage} from '../recipe-details/recipe-details';

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

    public recipes = [];

    constructor(public navCtrl: NavController, private recipeService: RecipeService,
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
      this.navCtrl.push(RecipeDetailsPage, {recipe: recipe});
    }

    delete(recipe) {
        this.recipeService.delete(recipe);
    }
}
