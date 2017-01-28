import { Component } from '@angular/core';

import { RecipeBookPage } from '../recipe-book/recipe-book';
import { ShoppingListPage} from '../shopping-list/shopping-list';
import { AddOverviewPage } from '../add-overview/add-overview';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;

  constructor() {
    this.tab1Root = RecipeBookPage;
    this.tab2Root = AddOverviewPage;
    this.tab3Root = ShoppingListPage;
  }
}
