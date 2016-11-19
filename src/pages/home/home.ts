import { Component } from '@angular/core';

import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  OCRAD: any;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController
  ) {}

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
    var text = input;

    var lines = text.split("\n");

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

    // alert(ing);
    // alert(prep);
  
    this.formatIngredientsBlock(ing);
    this.formatPreparation(prep);
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
  var result = "";
  for(var j = 0; j<ingredients.length; j++){
    result += ingredients[j] + "<br>";
  }
  //document.getElementById("ingredients").innerHTML = result;
  alert(result);
}

formatPreparation(text){
  var array = text.split("\n");

  var result = "";
  for(var j = 0; j<array.length; j++){
    if(array[j].length == 0){
      result += "<br>";
    }else{
      result += array[j];
    }
  }
  //document.getElementById("preparation").innerHTML = result;
  alert(result);
}

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

}
