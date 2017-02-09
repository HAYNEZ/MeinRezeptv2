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
  option: any;
  constructor(  public navCtrl: NavController,
                public params: NavParams,
                public loadingCtrl: LoadingController)
  {
    if(params.get("option") == 2){
      this.demoPhoto();
    }
    // switch(params.get("option")){
    //   case 0: this.option = this.choosePhoto();
    //           break;
    //   case 1: this.option = this.takePhoto();
    //           break;
    //   case 2: this.demoPhoto();
    //           break;
    // }
  }

  addIngPhoto(){
    this.sourceType = this.params.get("option");
    this.getPicture(this.sourceType, "ing");
  }

  //second photo is taken or choosen
  addTextPhoto(){
    this.getPicture(this.sourceType, "prep");
  }

  //choose the first photo with the ingredients
  //source type is set to choosing photo for second image
  // choosePhoto() {
  //   // !
  //   // alert("Choose a photo of the ingredients!");
  //   // this.sourceType = 0;
  //   // this.getPicture(this.sourceType, "ing"); // 0 == Library
  // }

  //take the first photo with the ingredients
  //source type is set to taking photo for second image
  // takePhoto() {
  //   alert("Take a photo of the ingredients!");
  //   this.sourceType = 1;
  //   this.getPicture(this.sourceType, "ing"); // 1 == Camera
  // }

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


  //text of photos is analyzed
  analyze() {
    //loader to show that the app is doing something
    let loader = this.loadingCtrl.create({
     content: 'Bitte warten...'
    });
    // loader.present();
    //arrays for saving lines of ingredients and preparation
    var arrayIng = [];
    var arrayPrep = [];
    //analyze first image

    (<any>window).OCRAD(document.getElementById('imageIng'), textIng => {
      // loader.dismissAll();
      //text is separated into array of lines
      // console.log(textIng);
      arrayIng = this.toLines(textIng);
      // console.log(arrayIng);
    });
    //analyze second image
    // loader.present();
    (<any>window).OCRAD(document.getElementById('imagePrep'), textPrep => {
      // console.log(textPrep
      //text is separated into array of lines
      arrayPrep = this.toLines(textPrep);
      //both texts are formatted
      // console.log(arrayPrep);
      let ingredients = this.formatIngredients(arrayIng);
      let preparation = this.formatPreparation(arrayPrep);
      // loader.dismiss();
      this.tranferData(ingredients, preparation);
    });


    // this.formatText(arrayIng, arrayPrep);

  }

  //text is separated into array of lines
  toLines(text){
    let lines = text.split("\n");
    let array = [];
    for(let k = 0; k < lines.length; k++){
      if(lines[k] != "")
        array.push(lines[k]);
    }
    return array;
  }

  tranferData(ingredients, preparation){
    let recipe = {
      "title" : null,
      "ingredients" :  ingredients,
      "portions": null,
      "preparation" : preparation,
      "time": null,
      "tags": null,
      "rating": 0,
      "base64Image": ""
    }
    console.log(recipe);
    //send recipe object to input page
    this.navCtrl.push(AddRecipeManuallyPage, {recipe: recipe});
  }

/*
  Formats the input text into ingredients and preparation sections
*/
  // formatText(arrayIng, arrayPrep){
  //   //create recipe object
  //   let recipe = {
  //     "title" : null,
  //     "ingredients" :  this.formatIngredients(arrayIng),
  //     "portions": null,
  //     "preparation" : this.formatPreparation(arrayPrep),
  //     "time": null,
  //     "tags": null,
  //     "rating": 0,
  //     "base64Image": ""
  //   }
  //   //send recipe object to input page
  //   this.navCtrl.push(AddRecipeManuallyPage, {recipe: recipe});
  // }

/*
  Formats ingredient lines array into an 2-dimensional-array of ingredients
*/
  formatIngredients(lines){
    console.log(lines);
    let ingredients = [];
    //iterate over ingredient lines
    for(let i = 0; i < lines.length; i++){
      //split each line at every whitespace, array[0] is the value, array[1] is the unit, every following belongs to the name
      let ing_array = lines[i].split(" ");
      console.log(ing_array);
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
