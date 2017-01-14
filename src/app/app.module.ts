import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { RecipeService } from '../providers/recipe.service';
import {  ListService } from '../providers/list.service';

import { TabsPage } from '../pages/tabs/tabs';
import { RecipeBookPage } from '../pages/recipe-book/recipe-book';
import { AddRecipePage } from '../pages/add-recipe/add-recipe';
import { AddRecipeManuallyPage } from '../pages/add-recipe-manually/add-recipe-manually';
import { HomePage } from '../pages/home/home';
import { ShoppingListPage} from '../pages/shopping-list/shopping-list';
import { RecipeDetailsPage } from '../pages/recipe-details/recipe-details';
import { PopoverPagePage } from '../pages/popover-page/popover-page';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    RecipeBookPage,
    RecipeDetailsPage,
    AddRecipePage,
    AddRecipeManuallyPage,
    HomePage,
    ShoppingListPage,
    PopoverPagePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    RecipeBookPage,
    RecipeDetailsPage,
    AddRecipePage,
    AddRecipeManuallyPage,
    HomePage,
    ShoppingListPage,
    PopoverPagePage
  ],
  providers: [RecipeService, ListService]
})
export class AppModule {}
