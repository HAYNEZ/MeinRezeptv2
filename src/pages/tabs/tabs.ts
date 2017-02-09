import { Component } from '@angular/core';

//Page imports
import { RecipeBookPage } from '../recipe-book/recipe-book';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { AddOverviewPage } from '../add-overview/add-overview';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabRecipeBook: any;
  tabAddOverview: any;
  tabShoppingList: any;

  constructor() {
    this.tabRecipeBook = RecipeBookPage;
    this.tabAddOverview = AddOverviewPage;
    this.tabShoppingList = ShoppingListPage;
  }
  
}
