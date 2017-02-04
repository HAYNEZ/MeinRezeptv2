import { Component, NgZone  } from '@angular/core';
import { NavController,NavParams, AlertController, ViewController, Platform, ItemSliding  } from 'ionic-angular';
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
  recipe: any ={};
  edit : boolean = false;
  photoTaken: boolean;
   photoSelected: boolean;
   _zone: any;
   public base64Image: string;
  public preparation:any;
  // public input:any;
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
    // this.zone = zone;
    //  this.photoTaken = false;

     //filled if edit, empty if new, partly filled if OCR
    // this.recipe = params.get("recipe");
    // this.callback = params.get("callback");
    // if(params.get("edit")){
    //   this.edit = params.get("edit");
    // }


    // if(this.input){
    //   this.readInputs();
    // }else{
    //   this.ingredients = new Array();

      // this.steps = new Array();
      // let step = "";
      // this.steps.push(step);
    // }

 // 	 this.ingredients = this.input[0];
 //       // this.ingredient = [200, 'ml', 'Milch'];
 //        this.preparation = this.input[1];
        // if(!this.base64Image){
        //   this.base64Image = "assets/img/demo.jpg";
        // }

        // this.platform = platform;
 }

 ionViewDidLoad(){
   this.zone = this.zone;
    this.photoTaken = false;

   //filled if edit, empty if new, partly filled if OCR
  this.recipe = this.params.get("recipe");
  this.callback = this.params.get("callback");
  let edited = this.params.get("edit");
  if(edited){
    this.edit = true;
  }

  if(this.recipe){
    this.readInputs();
  }else{
    this.ingredients = new Array();
  }
  if(!this.base64Image){
    this.base64Image = "assets/img/demo.jpg";
  }
 }

 readInputs() {
   this.title = this.recipe.title;
   this.base64Image = this.recipe.base64Image;
   this.portions = this.recipe.portions;
   this.rating = this.recipe.rating;
   this.time = this.recipe.time;
   this.preparation = this.recipe.preparation;

   if(this.recipe.ingredients) {
     this.ingredients = this.recipe.ingredients;
   }else{
     this.ingredients = new Array();
     let ingredient = new Array(3);
     this.ingredients.push(ingredient);
   }

   if(this.recipe.tags){
    //  console.log(this.input.tags);
     this.tagString = this.recipe.tags.join();
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

editIngredient(ingredient, item:ItemSliding ){
  let index = this.ingredients.indexOf(ingredient);
  // console.log("Delete:"+ index + "of" + this.ingredients.length);

  if(index > -1){
    let ingredient = this.ingredients[index];
    this.ingredients.splice(index, 1);
    this.product = ingredient[2];
    this.unit = ingredient[1];
    this.value = ingredient[0];
  }
  item.close();
  // this.nIngredients --;
 //  console.log(this.ingredients.length);
}

removeIngredient(ingredient, item:ItemSliding){
  let index = this.ingredients.indexOf(ingredient);
  // console.log("Delete:"+ index + "of" + this.ingredients.length);

  if(index > -1){
    this.ingredients.splice(index, 1);
  }
  item.close();
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

    if(this.title){
      //tagString to tagArray
      this.parseTags();
      if(this.tags){
        this.tags = this.recipeService.removeDoubleTags(this.tags);
      }
      if(this.recipe){
        if(this.recipe.tags){
          if(this.recipe.tags.join() != this.tagString){
            this.recipeService.updateTags(this.tags);
          }
        }
      }

      if(!this.edit){
        this.recipe = {
         title: this.title,
         ingredients: this.ingredients,
         portions: this.portions,
         preparation: this.preparation,
         time: this.time,
         tags: this.tags,
         rating: this.rating,
         base64Image: this.base64Image,
         date: new Date()
       };
     this.recipeService.add(this.recipe);
   }else{
     console.log(this.recipe._id);
    //  this.recipe = ;
     console.log("UPDATE");
     this.recipe = {
       _id: this.recipe._id,
       _rev: this.recipe._rev,
      title: this.title,
      ingredients: this.ingredients,
      portions: this.portions,
      preparation: this.preparation,
      time: this.time,
      tags: this.tags,
      rating: this.rating,
      base64Image: this.base64Image,
      date: new Date()
    };
     this.recipeService.update(this.recipe).catch(console.error.bind(console));
        console.log(this.recipe);
   }

    this.navCtrl.push(RecipeDetailsPage, {recipe: this.recipe});
    this.dismiss(this.recipe);
  }else{
    this.noTitel();
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
