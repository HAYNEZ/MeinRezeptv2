import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as jq from "jquery";
import * as Sly from "http://darsa.in/sly/js/sly.min.js";
/*
  Generated class for the Taptoadd page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-taptoadd',
  templateUrl: 'taptoadd.html'
})
export class TaptoaddPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {

   jq(function($) {
  var options = {
    horizontal: 1,
    itemNav: 'basic',
    speed: 300,
    mouseDragging: 1,
    touchDragging: 1
};
var frame = new Sly('#frame', options).init();
});
  }

}
