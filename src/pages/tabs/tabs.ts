import { Component } from '@angular/core';

import { RecipeBookPage } from '../recipe-book/recipe-book';
//import { AddRecipePage } from '../add-recipe/add-recipe';
import { ShoppingListPage} from '../shopping-list/shopping-list';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = RecipeBookPage;
    this.tab2Root = HomePage;
    this.tab3Root = ShoppingListPage;
  }
}
