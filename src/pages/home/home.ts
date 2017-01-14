import { Component } from '@angular/core';

import { NavController, ActionSheetController, LoadingController, NavParams } from 'ionic-angular';
import { AddRecipeManuallyPage } from '../add-recipe-manually/add-recipe-manually';
import { TextRecognitionPage } from '../text-recognition/text-recognition';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  OCRAD: any;
  textrecognitionOption: Number = 0;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {}

  navigateOptionOne() {
    this.navCtrl.push(AddRecipeManuallyPage, {firstPassed: ["",""]});
  }

  navigateOptionTwo(option: Number){
    this.navCtrl.push(TextRecognitionPage, {option: option});
  }

  choosePhoto() {
          this.getPicture(0); // 0 == Library
        }

  takePhoto() {
          this.getPicture(1); // 1 == Camera
        }

  demoPhoto() {
          this.srcImage = 'assets/img/testRezept2.png';
        }

//method to make a pullover button menu with the above methods
//redundant - can be deleted
  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: 'Demo Photo',
          handler: () => {
            this.srcImage = 'assets/img/testRezept2.png';
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
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
     content: 'Please wait...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      //alert(text);
      this.formatText(text);
      console.log(text);
    });
  }

  formatText(input){
    var lines = input.split("\n");
    var ing = "";
    var prep = "";
    var k = 0;
    while(!isNaN(lines[k].charAt(0))){
      ing += lines[k] + "\n";
      k++;
    }
    for(k; k<lines.length; k++){
      prep += lines[k] + "\n";
    }
    var formattedText = new Array;
    formattedText[0] = this.formatIngredientsBlock(ing);
    formattedText[1] = this.formatPreparation(prep);

    this.navCtrl.push(AddRecipeManuallyPage, {firstPassed: formattedText});
}

formatIngredientsBlock(text){
  //textblock an allen whitespaces und newlines trennen
  var array = text.split(/\n|\s/);

  //neues Array in dem die einzelnen Zutaten als Datensatz eingetragen werden
  var ingredients = new Array;
  var arrayCount = 0;

  //Schleife über alle Wörter
  for (var i = 0; i<array.length; i++){
    var first = array[i].charAt(0);
    //Prüfen ob erster Char des Wortes eine Zahl ist
    if(!isNaN(first)){
      //Zahl in Array eintragen
      ingredients[arrayCount] = array[i];
      var nextIsNan;
      if((i + 1)<array.length)
        nextIsNan = isNaN(array[(i+1)].charAt(0));
      else
        nextIsNan = false;

      while(nextIsNan){
        i++;
        ingredients[arrayCount] += " " + array[i];

        if(i<array.length-1){
          nextIsNan = isNaN(array[(i+1)].charAt(0));
        }else{
          nextIsNan = false;
        }
      }
      arrayCount += 1;
    }
  }
  var result = new Array;
  for(var j = 0; j<ingredients.length; j++){

    result[j] = this.splitIngredient(ingredients[j]);
  }
  return result;
}

splitIngredient(ingredient){
  var pieces = ingredient.split(" ");
  var amount = "";
  var i = 0;
  while((!(isNaN(pieces[i]))) && i < pieces.length){
    amount += pieces[i];
    i++;
  }
  var unit = "";
  if(isNaN(pieces[i-1].charAt(pieces[i-1].length))){
    //
  }else{
    unit = pieces[i];
    i++;
  }

  var thing = "";
  while(i < pieces.length){
    thing += pieces[i];
    i++;
  }
  var result = [amount, unit, thing]
  return result;
}

formatPreparation(text){
  //ueberfluessige Zeilenumbrüche entfernen, nur Absätze als Zeilenumbruch interpretieren
  var array = text.split("\n");

  var result = "";
  for(var j = 0; j<array.length; j++){
    if(array[j].length == 0){
      result += "\n";
    }else{
      result += array[j];
    }
  }
  //document.getElementById("preparation").innerHTML = result;
  return result;
}

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

}
