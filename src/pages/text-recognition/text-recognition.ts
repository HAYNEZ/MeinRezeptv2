import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AddRecipeManuallyPage } from '../add-recipe-manually/add-recipe-manually';


@Component({
  selector: 'page-text-recognition',
  templateUrl: 'text-recognition.html'
})

export class TextRecognitionPage {

  srcImageIng: string;
  srcImagePrep: string;
  sourceType: number;
  OCRAD: any;

  constructor(  public navCtrl: NavController,
                public params: NavParams,
                public loadingCtrl: LoadingController)
  {
    switch(params.get("option")){
      case 0: this.choosePhoto();
              break;
      case 1: this.takePhoto();
              break;
      case 2: this.demoPhoto();
              break;
    }
  }

  //choose the first photo with the ingredients
  //source type is set to choosing photo for second image
  choosePhoto() {!
    alert("Choose a photo of the ingredients!");
    this.sourceType = 0;
    this.getPicture(this.sourceType, "ing"); // 0 == Library
  }

  //take the first photo with the ingredients
  //source type is set to taking photo for second image
  takePhoto() {
    alert("Take a photo of the ingredients!")
    this.sourceType = 1;
    this.getPicture(this.sourceType, "ing"); // 1 == Camera
  }

  //both demo photos are set to test ocr
  demoPhoto() {
    this.srcImageIng = 'assets/img/demoIng.png';
    this.srcImagePrep = 'assets/img/demoPrep.png';
  }

  //Cordova camera organizes picture either from camera or existing photos
  getPicture(sourceType: number, type: string) {
    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    Camera.getPicture({
      quality: 100,
      destinationType: 0, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      //picture is saved depending on whether it is ingredients or preparation
      if(type == "ing"){
        this.srcImageIng = `data:image/jpeg;base64,${imageData}`;
      }else if(type == "prep"){
        this.srcImagePrep = `data:image/jpeg;base64,${imageData}`;
      }
      
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  //second photo is taken or choosen 
  addTextPhoto(){
    this.getPicture(this.sourceType, "prep");
  }

  //text of photos is analyzed
  analyze() {
    //loader to show that the app is doing something
    let loader = this.loadingCtrl.create({
     content: 'Bitte warten...'
    });
    //arrays for saving lines of ingredients and preparation
    var arrayIng = [];
    var arrayPrep = [];
    //analyze first image
    loader.present();
    (<any>window).OCRAD(document.getElementById('imageIng'), textIng => {
      loader.dismissAll();
      //text is separated into array of lines
      arrayIng = this.toLines(textIng);
    });
    //analyze second image
    loader.present();
    (<any>window).OCRAD(document.getElementById('imagePrep'), textPrep => {
      loader.dismissAll();
      //text is separated into array of lines
      arrayPrep = this.toLines(textPrep);
      //both texts are formatted
      this.formatText(arrayIng, arrayPrep);
    });    
  }

  //text is separated into array of lines
  toLines(text){
    let lines = text.split("\n");
    let array = [];
    let k = 0;
    do{
      array.push(lines[k]);
      k++;
    }while(lines[k] != "");
    return array;
  }

/*
  Formats the input text into ingredients and preparation sections
*/
  formatText(arrayIng, arrayPrep){
    //create recipe object
    let recipe = {
      "title" : null,
      "ingredients" :  this.formatIngredients(arrayIng),
      "portions": null,
      "preparation" : this.formatPreparation(arrayPrep),
      "time": null,
      "tags": null,
      "rating": 0,
      "base64Image": ""
    }
    //send recipe object to input page
    this.navCtrl.push(AddRecipeManuallyPage, {recipe: recipe});
  }

/*
  Formats ingredient lines array into an 2-dimensional-array of ingredients
*/
  formatIngredients(lines){
    let ingredients = [];
    //iterate over ingredient lines
    for(let i = 0; i < lines.length; i++){
      //split each line at every whitespace, array[0] is the value, array[1] is the unit, every following belongs to the name
      let ing_array = lines[i].split(" ");
      let value = ing_array[0];
      let unit = ing_array[1];
      let name = "";
      for(let j = 2; j < ing_array.length; j++){
        if(j < ing_array.length -1)
          //add the removed whitespace again if it is not the last part
          name += ing_array[j] + " ";
        else
          name += ing_array[j];
      }
      //put ingredient together and add it to ingredients array
      ingredients.push([value, unit, name]);
    }
    return ingredients;
  }

/*
  Formats preparation lines array into a preparation string
*/
  formatPreparation(array){
    let preparation = "";
    for(let i = 0; i < array.length; i++){
      if(i < array.length - 1)
        preparation += array[i] + " ";
      else
        preparation += array[i];
    }
    return preparation;
  }
}