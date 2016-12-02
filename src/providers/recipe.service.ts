import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import {Storage} from '@ionic/storage';

@Injectable()
export class RecipeService {

  dataFilePath: string = '../assets/recipe-data.json';

  constructor(platform: Platform, public http: Http, public storage: Storage){
    platform.ready().then(() => {
      setTimeout(() => {
        this.storage.set('recipes', new Promise(resolve => {
          this.http.get(this.dataFilePath).map((res) => {
            console.log("service- constructor");
            return res.json().recipes;
          }).subscribe((data) => {
            console.log(data);
            resolve(data);
          });
        }));
      },5000);

    });
  }

  getAllRecipes() : Promise<Object>{
    // return new Promise(resolve => {
    //   this.http.get(this.dataFilePath)
    //     .map(res => res.json().recipes)
    //     .subscribe(data => {
    //       resolve(data);
    //     });
    // }).then((data) => {
    //   storage
    // });

    let promise = this.storage.get('recipes');

      promise.then((res) => {
        console.log(res);
      });

      return promise;
      // this.storage.get('recipes').then((res) => {
      //   console.log("service- getAll");
      //   console.log(typeof(res));
      //   return new Promise((resolve) => {
      //     resolve(res);
      //   });
      // });
      // return res;


  }

  addRecipe(recipe) {
    // return new Promise(resolve => {
    //   this.http.post(this.dataFilePath, JSON.stringify(data))
    //     .subscribe((data) => {
    //       resolve(data);
    //     });
    // });

  //   this.storage.get('recipes').then((res)=> {
  //     console.log("service- add");
  //     console.log(res.recipes);
  //     res.recipes.push(recipe);
  //     console.log(res.recipes);
  //   });
  //
  //   console.log("Recipe");
  //   console.log(recipe);

  let promise = this.storage.get('recipes');
  let res =  promise.then((res) => {
    console.log("Recipe:");
    console.log(recipe);
    res.push(recipe);
    console.log("Recipes:");
    console.log(res);
    return res;
  });

  this.storage.set('recipes', res);
  }

}
