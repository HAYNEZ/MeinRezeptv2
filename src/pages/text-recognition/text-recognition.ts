import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AddRecipeManuallyPage } from '../add-recipe-manually/add-recipe-manually';


@Component({
  selector: 'page-text-recognition',
  templateUrl: 'text-recognition.html'
})

export class TextRecognitionPage {

  srcImage: string;
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

  choosePhoto() {
    this.getPicture(0); // 0 == Library
  }

  takePhoto() {
    this.getPicture(1); // 1 == Camera
  }

  demoPhoto() {
    this.srcImage = 'assets/img/demo.png';
  }

  getPicture(sourceType: number) {
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
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    let loader = this.loadingCtrl.create({
     content: 'Bitte warten...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      alert(text);
      this.formatText(text);
    });
  }

/*
  Formats the input text into ingredients and preparation sections
*/
  formatText(input){
    //divide input into single lines
    let lines = input.split("\n");
    //arrays for lines divided into ingredients and preparation
    let ing_a = [];
    let prep_a = [];
    //search for ingredient lines until empty line
    let k = 0;
    do{
      ing_a.push(lines[k]);
      k++;
    }while(lines[k] != "");
    //remove the empty line from array
    ing_a.pop();
    //add remaining lines to preparation array (if line is not empty)
    while(k < lines.length){
      if(lines[k] != "")
        prep_a.push(lines[k]);
      k++;
    }
    //create recipe object
    let recipe = {
      "title" : null,
      "ingredients" :  this.formatIngredients(ing_a),
      "portions": null,
      "preparation" : this.formatPreparation(prep_a),
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

/*
  Checks if a char code is in the range of numbers
*/
  isNumber(charCode): boolean {
    return (charCode> 47 && charCode < 58);
  }

  // formatText(input){
  //   var lines = input.split("\n");
  //   var ing = "";
  //   var prep = "";
  //   var k = 0;
  //   while(!isNaN(lines[k].charAt(0))){
  //     ing += lines[k] + "\n";
  //     k++;
  //   }
  //   for(var k = 0; k < lines.length; k++){
  //     prep += lines[k] + "\n";
  //   }
  //   let recipe = {
  //     "title" : null,
  //     "ingredients" :  this.formatIngredientsBlock(ing),
  //     "portions": null,
  //     "preparation" : this.formatPreparation(prep),
  //     "time": null,
  //     "tags": null,
  //     "rating": 0,
  //     "base64Image": ""
  //   }
  //   this.navCtrl.push(AddRecipeManuallyPage, {recipe: recipe});
  // }
  //
  // formatIngredientsBlock(text){
  //   //textblock an allen whitespaces und newlines trennen
  //   var array = text.split(/\n|\s/);
  //
  //   //neues Array in dem die einzelnen Zutaten als Datensatz eingetragen werden
  //   var ingredients = new Array;
  //   var arrayCount = 0;
  //
  //   //Schleife über alle Wörter
  //   for (var i = 0; i < array.length; i++){
  //     var first = array[i].charAt(0);
  //     //Prüfen ob erster Char des Wortes eine Zahl ist
  //     if(!isNaN(first)){
  //       //Zahl in Array eintragen
  //       ingredients[arrayCount] = array[i];
  //       var nextIsNan;
  //       if((i + 1) < array.length)
  //         nextIsNan = isNaN(array[(i+1)].charAt(0));
  //       else
  //         nextIsNan = false;
  //
  //       while(nextIsNan){
  //         i++;
  //         ingredients[arrayCount] += " " + array[i];
  //
  //         if(i<array.length-1){
  //           nextIsNan = isNaN(array[(i+1)].charAt(0));
  //         }else{
  //           nextIsNan = false;
  //         }
  //       }
  //       arrayCount += 1;
  //     }
  //   }
  //   var result = new Array;
  //   for(var j = 0; j < ingredients.length; j++){
  //     if(ingredients[j] != ""){
  //       result[j] = this.splitIngredient(ingredients[j]);
  //     }
  //   }
  //   return result;
  // }
  //
  // splitIngredient(ingredient){
  //   var pieces = ingredient.split(" ");
  //   var amount = "";
  //   var i = 0;
  //   while((!(isNaN(pieces[i]))) && i < pieces.length){
  //     amount += pieces[i];
  //     i++;
  //   }
  //   var unit = "";
  //   if(isNaN(pieces[i-1].charAt(pieces[i-1].length))){
  //     //
  //   }else{
  //     unit = pieces[i];
  //     i++;
  //   }
  //
  //   var thing = "";
  //   while(i < pieces.length){
  //     thing += pieces[i];
  //     i++;
  //   }
  //   var result = [amount, unit, thing];
  //   return result;
  // }
  //
  // formatPreparation(text){
  // //ueberfluessige Zeilenumbrüche entfernen, nur Absätze als Zeilenumbruch interpretieren
  //   var array = text.split("\n");
  //
  //   var result = "";
  //   for(var j = 0; j < array.length; j++){
  //     if(array[j].length == 0){
  //       //result += "\n";
  //     }else{
  //       result += array[j];
  //     }
  //   }
  //
  //   var result1 = result.split(".");
  //   for(var j = 0; j < result1.length; j++){
  //     if(result1[j] == ""){
  //       result1.splice(j,1);
  //     }
  //   }
  //   result = "";
  //   for(var j = 0; j < result1.length; j++){
  //     result += result1[j];
  //     result += " ";
  //   }
  //   return result;
  // }
}
