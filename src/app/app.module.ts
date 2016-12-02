import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import {Storage} from '@ionic/storage';
import {SQLite} from 'ionic-native';
import {RecipeService} from '../providers/recipe.service';

import { TabsPage } from '../pages/tabs/tabs';
import { RecipeBookPage } from '../pages/recipe-book/recipe-book';
import { AddRecipePage } from '../pages/add-recipe/add-recipe';
import { AddRecipeManuallyPage } from '../pages/add-recipe-manually/add-recipe-manually';
import { HomePage } from '../pages/home/home';
import { ShoppingListPage} from '../pages/shopping-list/shopping-list';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    RecipeBookPage,
    AddRecipePage,
    AddRecipeManuallyPage,
    HomePage,
    ShoppingListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    RecipeBookPage,
    AddRecipePage,
    AddRecipeManuallyPage,
    HomePage,
    ShoppingListPage
  ],
  providers: [
    RecipeService,
    Storage,
    SQLite
  ]
})
export class AppModule {}
