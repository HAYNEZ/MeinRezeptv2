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
    tags: any;
    rating: any;
    image: any;
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
     this.platform = platform;
     this.photoTaken = false;
    this.input = params.get("firstPassed");
    console.log(this.input);
    console.log("In manually");
    if(this.input[0]!="") {
      console.log("OCR inputs received.");
      this.ingredients = this.input[0];
      console.log(this.ingredients);

    }else{
      console.log("OCR inputs not received.");

      this.ingredients = new Array();
      let ingredient = new Array(3);
      this.ingredients.push(ingredient);
      console.log(this.ingredients.length);
    }

    this.steps = new Array();
    if(this.input[1]!=""){
      let step = "" + this.input[1];
      this.steps.push(step);
    }else{
      console.log(this.steps);
      let step = "";
      this.steps.push(step);
      console.log("Steps length:" + this.steps.length);
    }
 // 	 this.ingredients = this.input[0];
 //       // this.ingredient = [200, 'ml', 'Milch'];
 //        this.preparation = this.input[1];
        this.base64Image = "assets/img/demo.jpg";
        this.zone = zone;
        this.platform = platform;
        this.image = null;
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

 saveRecipe() {
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
