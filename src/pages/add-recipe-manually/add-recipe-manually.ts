import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController, Platform, ItemSliding } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { RecipeDetailsPage } from '../recipe-details/recipe-details';
import { RecipeService } from '../../providers/recipe.service';


@Component({
  selector: 'page-add-recipe-manually',
  templateUrl: 'add-recipe-manually.html'
})
export class AddRecipeManuallyPage {
    recipe: any = {};
    edit : boolean = false;
    photoTaken: boolean;
    photoSelected: boolean;
    public base64Image: string;
    public preparation:any;
    title: any;
    ingredients: any;
    portions: any;
    time: any;
    tagString: string = "";
    tags: any;
    rating: number = 0;
    callback: any;
    product: any;
    unit: any;
    value: any;

 constructor( public navCtrl: NavController,
              public params: NavParams,
              private recipeService: RecipeService,
              private alertCtrl: AlertController,
              private viewCtrl: ViewController,
              private zone: NgZone,
              private platform: Platform
   ) {}

  // Lifecycle event provided by the NavController
  // "Runs when the page has loaded. This event only happens once per page being created."
  // https://ionicframework.com/docs/v2/api/navigation/NavController/
  // Receiving all details from a recipe if edit, empty if new, partly filled if OCR
 ionViewDidLoad(){
    //for asynchronous task updating
    this.zone = this.zone;
    //tomato picture per default
    this.photoTaken = false;

     //page is filled if edit, empty if new, partly filled if OCR
    this.recipe = this.params.get("recipe");
    //updates page after editing
    this.callback = this.params.get("callback");

    if(this.recipe){
      this.readInputs();
    }else{
      this.ingredients = [];
    }
    if(!this.base64Image){
      this.base64Image = "assets/img/demo.jpg";
    }
 }

 // When recipe is edited - reads selected recipe information
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
     this.ingredients = [];
   }
   if(this.recipe.tags){
     this.tagString = this.recipe.tags.join();
   }
 }

 // Opens a popup window and shows all the current default tags
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
     });
   }
   alert.addButton('Abbrechen');
   alert.addButton({
     text: 'Verwenden',
     //update tags
     handler: data => {
       if(data.length > 0){
         if(this.tagString.endsWith(",")){ //"Nachspeise," + " " -> "Nachspeise, "
           this.tagString += " ";
         } else if(!this.tagString.endsWith(", ") && this.tagString.length != 0 ) { //"Nachspeise" + ", " -> "Nachspeise, "
           this.tagString += ", ";
         }
       }
       if(this.tagString.endsWith(""))
        for(var i = 0; i < data.length; i++){
          if(i == data.length - 1){
            this.tagString += data[i];
          }else{
            this.tagString += data[i] + ", ";
          }
        }
      }
    });
    alert.present();
 }

// Opens Users Camera
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
     }, (error) => {
        console.log(error);
     });
 }

// Opens Users Gallery
 accessGallery(): void {
    let cameraOptions = {
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI,
        quality: 100,
        allowEdit: true,
        targetWidth: 500,
        targetHeight: 500,
        encodingType: Camera.EncodingType.JPEG,
        correctOrientation: true,
        saveToPhotoAlbum: true
    }
    Camera.getPicture(cameraOptions).then((file_uri) => {
          this.base64Image = file_uri;
          this.photoTaken = true;
          this.photoSelected = false;
        }, (error) => {
          console.log(SyntaxError);
        });
}

// Saves the ingredients - split into number value, unit and the product name
addIngredient(){
  if(this.product){
    let ingredient = [this.value, this.unit, this.product];
    this.ingredients.push(ingredient);
    this.value = undefined;
    this.unit = "";
    this.product = "";
  }
}

// Slider from right to left shows options
// Params2: Editing
// Allows to edit the current ingredients
editIngredient(ingredient, item:ItemSliding ){
  let index = this.ingredients.indexOf(ingredient);
    if(index > -1){
      let ingredient = this.ingredients[index];
      this.ingredients.splice(index, 1);
      this.product = ingredient[2];
      this.unit = ingredient[1];
      this.value = ingredient[0];
    }
    item.close();
}

// Slider from right to left shows options
// Params2: Deleting
// Allows to delete the current ingredients
removeIngredient(ingredient, item:ItemSliding){
  let index = this.ingredients.indexOf(ingredient);
    if(index > -1){
      this.ingredients.splice(index, 1);
    }
    item.close();
}

// Method to split the input tags
parseTags(){
  if(this.tagString != ""){
    //displaces the white space and spilts at the
    this.tags = this.replaceAll(this.tagString,"\\s+","").split(',');
  }
}

// Our case: Replaces every white space in str
//params: str - string to be used for replacements
        //find - substring/char to be replaced,
        //replace - substring/char to be replaced through
        // g - Global search does not return only the first hit but an array of all hits
replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

// Save the entered recipe and updates the recipe book
saveRecipe() {
    if(this.title){
      //pars tagString to tagArray
      this.parseTags();
      if(this.tags){
        //if tag is given in twice - remove it
        this.tags = this.recipeService.removeDoubleTags(this.tags);
      }
      if(!this.portions){
        //default value for correct portions calculator
        this.portions = 4;
      }

      if(this.recipe){
        if(this.recipe.tags){
          if(this.recipe.tags.join() != this.tagString){
            //update default tag list
            this.recipeService.updateTags(this.tags);
          }
        }
      }

      if(!this.params.get("edit")){
        this.recipe = {
         title: this.title,
         ingredients: this.ingredients,
         portions: this.portions,
         preparation: this.preparation,
         time: this.time,
         tags: this.tags,
         rating: this.rating,
         base64Image: this.base64Image
       };
     this.recipeService.add(this.recipe);
   }else{
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
    };
      //saves and updates recipe database
     this.recipeService.update(this.recipe).catch(console.error.bind(console));
   }
    //pushes recipe to the book stack
    this.navCtrl.push(RecipeDetailsPage, {recipe: this.recipe});
    this.dismiss(this.recipe);
  }else{
    this.noTitel();
  }
 }

 // Closes edit page and shows current recipe detail page to check the input
 dismiss(recipe) {
       this.viewCtrl.dismiss(recipe);
 }

 // Reminder for empty recipe titel
 // Opens a popup window
 noTitel(){
   let alert = this.alertCtrl.create({
       title: "Dein Rezept braucht noch einen Titel",
       buttons: [{ text: "OK" }]
   })
   alert.present();
 }
}
