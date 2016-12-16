import { Component, NgZone } from '@angular/core';

import { NavController, NavParams, ViewController, Platform} from 'ionic-angular';
import { Camera } from 'ionic-native';

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

    _zone: any;
    public base64Image: string;
	 public ingredients:any;
	 public preparation:any;
	 public input:any;
     title: any;
     portions: any;
     description: any;
     time: any;
     tags: any;
     rating: any;
     image: any;

  constructor(public navCtrl: NavController, public params: NavParams,private recipeService: RecipeService,
      private viewCtrl: ViewController,  private zone: NgZone, private platform: Platform) {
     this.input = params.get("firstPassed");

  	 this.ingredients = this.input[0];

         this.preparation = this.input[1];
         this.base64Image = "assets/img/pizza2.jpg";
         this.zone = zone;
         this.platform = platform;
         this.image = null;
  }

  takePicture(): void {
      Camera.getPicture({
          quality: 75,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 500,
          targetHeight: 500,
          saveToPhotoAlbum: true
      }).then(imageData => {
          this.base64Image = "data:image/jpeg;base64," + imageData;

      }, error => {
          console.log("ERROR -> " + JSON.stringify(error));
      });
  
  }




 /* accessGallery() {
      Camera.getPicture({
          sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          destinationType: Camera.DestinationType.DATA_URL
      }).then((imageData) => {
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
          console.log(err);
      });
  }*/




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
          .then(file_uri => this.base64Image = file_uri,
          err => console.log(err));
  }







  saveRecipe() {
      let recipe = {


          "title": this.title,
          "portions": this.portions,
          "description": this.description,
          "time": this.time,
          "tags": this.tags,
          "rating": this.rating,
          "base64Image": this.base64Image
      };
      this.recipeService.add(recipe);
      this.dismiss(recipe);
      this.getBackgroundImage(recipe);
  }

  dismiss(recipe) {
        this.viewCtrl.dismiss(recipe);
  }

  getBackgroundImage(recipe) {


    /* var urlString = 'url(assets/' + this.base64Image + '.jpg)';
      document.getElementsByClassName("recipeP").style.backgroundImage = urlString;
      alert("HIII");*/
  }
}
