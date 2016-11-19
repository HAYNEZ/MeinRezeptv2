import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { AddRecipePage } from '../pages/add-recipe/add-recipe';

import { HomePage } from '../pages/home/home';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AddRecipePage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AddRecipePage,
    HomePage
  ],
  providers: []
})
export class AppModule {}
