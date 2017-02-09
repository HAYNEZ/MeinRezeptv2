import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

//import rootPage
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform) {
    // Check if platform is ready and plugins are available.
    platform.ready().then(() => {
      // Doing higher level native things
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
