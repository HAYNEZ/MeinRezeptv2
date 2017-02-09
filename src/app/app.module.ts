import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

//Service imports
import { RecipeService } from '../providers/recipe.service';
import { ListService } from '../providers/list.service';

//Page imports
import { TabsPage } from '../pages/tabs/tabs';
import { RecipeBookPage } from '../pages/recipe-book/recipe-book';
import { AddOverviewPage } from '../pages/add-overview/add-overview';
import { AddRecipeManuallyPage } from '../pages/add-recipe-manually/add-recipe-manually';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { RecipeDetailsPage } from '../pages/recipe-details/recipe-details';
import { PopoverPagePage } from '../pages/popover-page/popover-page';
import { TextRecognitionPage } from '../pages/text-recognition/text-recognition';
import { InformationPage } from '../pages/information/information';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    RecipeBookPage,
    RecipeDetailsPage,
    AddOverviewPage,
    AddRecipeManuallyPage,
    ShoppingListPage,
    PopoverPagePage,
    TextRecognitionPage,
    InformationPage
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
    AddOverviewPage,
    AddRecipeManuallyPage,
    ShoppingListPage,
    PopoverPagePage,
    TextRecognitionPage,
    InformationPage
  ],
  providers: [
    RecipeService,
    ListService
  ]
})
export class AppModule {}
