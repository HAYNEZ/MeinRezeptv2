import { Component, NgZone  } from '@angular/core';
import { NavController,NavParams, ViewController, Platform } from 'ionic-angular';
import { Camera } from 'ionic-native';
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
    rating: any;
    date: any;

 constructor(public navCtrl: NavController,
    public params: NavParams,
    private recipeService: RecipeService,
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

    if(this.input){
      this.readInputs();
    }else{
      this.ingredients = new Array();
      let ingredient = new Array(3);
      this.ingredients.push(ingredient);

      this.steps = new Array();
      let step = "";
      this.steps.push(step);
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


   if(this.input.ingredients) {
     this.ingredients = this.input.ingredients;
   }else{
     this.ingredients = new Array();
     let ingredient = new Array(3);
     this.ingredients.push(ingredient);
   }


   if(this.input.preparation){
    //  let step = "" + this.input.preparation;
    //  this.steps.push(step);
    this.steps = this.input.preparation;
   }else{
     this.steps = new Array();
     let step = "";
     this.steps.push(step);
   }

   if(this.input.tags){
     console.log(this.input.tags);
     this.tagString = this.input.tags.join();
   }
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
  let ingredient = new Array(3);
  this.ingredients.push(ingredient);
  this.nIngredients ++;
   // console.log(this.ingredients.length);
}

removeIngredient(ingredient){
  let index = this.ingredients.indexOf(ingredient);
  console.log("Delete:"+ index + "of" + this.ingredients.length);

  if(index > -1){
    this.ingredients.splice(index, 1);
  }
  this.nIngredients --;
 //  console.log(this.ingredients.length);
}

setNIngredients(number:number){
  this.nIngredients = number;
}

addStep(){
 let step = "";
 this.steps.push(step);
}

removeStep(step){
  let index = this.steps.indexOf(step);
  console.log("Delete:"+ index + "of" + this.steps.length);
  if(index > -1){
    this.steps.splice(index, 1);
  }
}

parseTags(){
  if(this.tagString != ""){
    this.tags = this.tagString.split(',');
  }
}

 saveRecipe() {
    this.parseTags();
     let recipe = {
         "title": this.title,
         "ingredients": this.ingredients,
         "portions": this.portions,
         "preparation": this.steps,
         "time": this.time,
         "tags": this.tags,
         "rating": this.rating,
         "base64Image": this.base64Image,
         "date" : new Date()
     };
     this.recipeService.add(recipe);
     this.dismiss(recipe);

 }

 dismiss(recipe) {
       this.viewCtrl.dismiss(recipe);
 }

 trackByIndex(index: number, obj: any): any {
   return index;
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
