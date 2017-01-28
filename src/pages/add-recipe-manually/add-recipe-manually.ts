import { Component, NgZone  } from '@angular/core';
import { NavController,NavParams, AlertController, ViewController, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';
import {RecipeDetailsPage} from '../recipe-details/recipe-details';
// import { DomSanitizer } from '@angular/platform-browser';

import { RecipeService } from '../../providers/recipe.service';

/*
  Generated class for the AddRecipeManually page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-recipe-manually',
  templateUrl: 'add-recipe-manually.html'
})
export class AddRecipeManuallyPage {
  photoTaken: boolean;
   photoSelected: boolean;
   _zone: any;
   public base64Image: string;
  public preparation:any;
  public input:any;
    title: any;
    nIngredients: number = 0;
    ingredients: any;
    steps: any;
    testText: any;
    portions: any;
    description: any;
    time: any;
    tagString : string ="";
    tags: any;
    rating: number = 0;
    date: any;

    callback: any;

    product: any;
    unit: any;
    value: any;
 constructor(public navCtrl: NavController,
    public params: NavParams,
    private recipeService: RecipeService,
    private alertCtrl: AlertController,
     private viewCtrl: ViewController,
     private zone: NgZone,
     private platform: Platform
    //  ,
    //  private _DomSanitizationService: DomSanitizer
   ) {
    //  this.platform = platform;
    this.zone = zone;
     this.photoTaken = false;

    this.input = params.get("recipe");
    this.callback = params.get("callback");

    if(this.input){
      this.readInputs();
    }else{
      this.ingredients = new Array();

      // this.steps = new Array();
      // let step = "";
      // this.steps.push(step);
    }

 // 	 this.ingredients = this.input[0];
 //       // this.ingredient = [200, 'ml', 'Milch'];
 //        this.preparation = this.input[1];
        if(!this.base64Image){
          this.base64Image = "assets/img/demo.jpg";
        }

        // this.platform = platform;
 }

 readInputs() {
   this.title = this.input.title;
   this.base64Image = this.input.base64Image;
   this.portions = this.input.portions;
   this.rating = this.input.rating;
   this.time = this.input.time;
   this.preparation = this.input.preparation;

   if(this.input.ingredients) {
     this.ingredients = this.input.ingredients;
   }else{
     this.ingredients = new Array();
     let ingredient = new Array(3);
     this.ingredients.push(ingredient);
   }


  //  if(this.input.preparation){

  //  }

   if(this.input.tags){
     console.log(this.input.tags);
     this.tagString = this.input.tags.join();
   }
 }

 showTags() {
   let tags = this.recipeService.getTags();
   let alert = this.alertCtrl.create({
     title: "Vorhandene Tags",
     subTitle: "Wähle passende Tags aus."
   });
   for(let i = 0; i < tags.length; i++){
     alert.addInput({
       type: 'checkbox',
       label: tags[i],
       value: tags[i]
     })
   }
   alert.addButton('Abbrechen');
   alert.addButton({
     text: 'Verwenden',
     handler: data => {
       if(data.length>0){
         //"Nachspeise," + " " -> "Nachspeise, "
         if(this.tagString.endsWith(",")) this.tagString += " ";
         //"Nachspeise" + ", " -> "Nachspeise, "
         else if(!this.tagString.endsWith(", ") && this.tagString.length != 0 ) this.tagString += ", ";
       }
       if(this.tagString.endsWith(""))
      for(var i =0; i <data.length; i++ ){
        if(i == data.length -1){
          this.tagString += data[i];
        }else{
          this.tagString += data[i] + ", ";
        }
      }
     }
   });
   alert.present();
 }

/*
 takePicture():void {
   let cameraOptions = {
     sourceType: Camera.PictureSourceType.CAMERA,
     destinationType: Camera.DestinationType.DATA_URL,
     quality: 75,
     allowEdit: true,
     targetWidth: 500,
     targetHeight: 500,
     encodingType: Camera.EncodingType.JPEG,
     saveToPhotoAlbum: true
   };
     Camera.getPicture(cameraOptions).then((imageData) => {
         this.base64Image = `data:image/jpeg;base64,${imageData}`;
     }, (error) => {
         console.log("ERROR -> " + JSON.stringify(error));
     });
 }*/





 takePicture(): void {
     let options = {
         sourceType: Camera.PictureSourceType.CAMERA,
         destinationType: Camera.DestinationType.DATA_URL,
         quality: 100,
         allowEdit: true,
         targetWidth: 500,
         targetHeight: 500,
         encodingType: Camera.EncodingType.JPEG,
         correctOrientation: true,
         saveToPhotoAlbum: true
     }
     Camera.getPicture(options).then((imageData) => {
         this.base64Image = 'data:image/jpeg;base64,' + imageData;
         this.photoTaken = true;
         this.photoSelected = false;
     }, (err) => {
         // Handle error
     });
 }


 accessGallery(): void {
    let cameraOptions = {
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI,
        quality: 100,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 500,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true
    }
    Camera.getPicture(cameraOptions)
        .then((file_uri) => {
          this.base64Image = file_uri;
        }, (error) => {
          console.log(SyntaxError)
        });
}

addIngredient(){
  if(this.product){
    let ingredient = [this.value, this.unit, this.product];
    this.ingredients.push(ingredient);
    //reset values
    this.value = undefined;
    this.unit = "";
    this.product = "";
  }

}

removeIngredient(ingredient){
  let index = this.ingredients.indexOf(ingredient);
  // console.log("Delete:"+ index + "of" + this.ingredients.length);

  if(index > -1){
    this.ingredients.splice(index, 1);
  }
  // this.nIngredients --;
 //  console.log(this.ingredients.length);
}

// setNIngredients(number:number){
//   this.nIngredients = number;
// }

// addStep(){
//  let step = "";
//  this.steps.push(step);
// }
//
// removeStep(step){
//   let index = this.steps.indexOf(step);
//   console.log("Delete:"+ index + "of" + this.steps.length);
//   if(index > -1){
//     this.steps.splice(index, 1);
//   }
// }

parseTags(){
  if(this.tagString != ""){
    this.tags = this.replaceAll(this.tagString,"\\s+","").split(',');
  }
}

replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

 saveRecipe() {
    this.parseTags();
    // if(!this.rating){
    //   this.rating =0;
    // }
    this.tags = this.recipeService.removeDoubleTags(this.tags);
    if(!this.title){
      this.noTitel();
    }else{
     let recipe = {
         "title": this.title,
         "ingredients": this.ingredients,
         "portions": this.portions,
         "preparation": this.preparation,
         "time": this.time,
         "tags": this.tags,
         "rating": this.rating,
         "base64Image": this.base64Image,
         "date" : new Date()
     };
     this.recipeService.add(recipe);
     this.recipeService.updateTags(this.tags);
     if(this.callback){
       this.callback();
     }
     //pushes the new recipe and show its detail side
     this.navCtrl.push(RecipeDetailsPage, {recipe: recipe});

     this.dismiss(recipe);
   }
 }

 dismiss(recipe) {
       this.viewCtrl.dismiss(recipe);
      //  this.navCtrl.parent.select(0);
 }

 trackByIndex(index: number, obj: any): any {
   return index;
 }

 noTitel(){
   let alert = this.alertCtrl.create({
       title: "Dein Rezept braucht noch einen Titel",
       buttons: [
           {
               text: "OK"
           }
         ]
   })
   alert.present();
 }


//Funktioniert nicht, später hilfreich?
checkif(){

var title =document.getElementById("recipeTitle");
var titlelength = this.title.length;



if(titlelength>11){
  alert(titlelength);
 title.style.fontSize="20px";
}

}



}
