import { Injectable, NgZone } from '@angular/core';
import * as Collections from 'typescript-collections';

import PouchDB from 'pouchdb';

@Injectable()
export class RecipeService {
    private _db;
    private recipes;
    private tags = new Collections.Set<string>();

    constructor(
      private zone: NgZone
    ){}

    initDB() {
        this._db = new PouchDB('recipe');
    }

    add(recipe) {
        return this._db.post(recipe);
    }

    update(recipe) {
      return this._db.put(recipe).catch((error) => {
        console.log(error);
      });
    }

    delete(recipe) {
        console.log("db delete " + recipe.title);
        return this._db.remove(recipe).catch((error) => {
          console.log(error);
        });
    }

    getAll() {

        // if(this.recipes) {
        //   return Promise.resolve(this.recipes);
        // }
        // return new Promise(resolve => {
        //   this._db.allDocs({
        //     include_docs:true
        //   }).then((result) => {
        //     this.recipes = [];
        //     let docs = result.rows.map((row) => {
        //       this.recipes.push(row.doc);
        //     });
        //     resolve(this.recipes);
        //     this._db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
        //       this.handleChange(change);
        //     });
        //   }).catch((error) => {
        //     console.log(error);
        //   })
        // })
        if (!this.recipes) {
          // console.log("no data");
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    // Each row has a .doc object and we just want to send an
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this.recipes = docs.rows.map(row => {
                        // Dates are not automatically converted from a string.

                        return row.doc;
                    });
                    console.log(this.recipes);

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', (change) => {
                          this.onDatabaseChange(change);
                        });
                    // console.log(this.recipes);
                    return this.recipes;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this.recipes);
        }

    }


    // handleChange(change) {
    //   let changedDoc = null;
    //   let changedIndex = null;
    //   this.recipes.forEach((doc, index) => {
    //     if(doc._id === change.id){
    //       changedDoc = doc;
    //       changedIndex = index;
    //     }
    //   });
    //   if(change.deleted) {
    //     console.log("Delete detected");
    //     console.log(this.recipes);
    //     this.recipes.splice(changedIndex, 1);
    //     console.log(this.recipes);
    //
    //   }else{
    //     if(changedDoc){
    //       this.recipes[changedIndex] = change.doc;
    //     }else{
    //       this.recipes.push(change.doc);
    //     }
    //   }
    // }

      private onDatabaseChange = (change) => {

        let changedDoc = null;
  let changedIndex = null;

  this.recipes.forEach((doc, index) => {

    if(doc._id === change.id){
      changedDoc = doc;
      changedIndex = index;
    }

  });

  //A document was deleted

      if(change.deleted){
        if(changedDoc){
        this.recipes.splice(changedIndex, 1);
      }
      }
      else {

        //A document was updated
        if(changedDoc){
          this.recipes[changedIndex] = change.doc;
        }

        //A document was added
        else {
          this.recipes.push(change.doc);
        }

  }
          ///// WORKS!!
          // var index = this.findIndex(this.recipes, change.id);
          // console.log("change detected");
          // console.log("all recipes");
          // console.log(this.recipes);
          // console.log("length" + this.recipes.length);
          // console.log("change");
          // console.log(change);
          // var recipe = this.recipes[index];
          //
          // if (change.deleted) {
          //     if (recipe) {
          //       if(recipe._id === change.id){
          //         this.recipes.splice(index, 1); // delete
          //       }
          //     }
          // } else {
          //     // change.doc.Date = new Date(change.doc.Date);
          //     if (recipe && recipe._id === change.id) {
          //         this.recipes[index] = change.doc; // update
          //     } else {
          //         this.recipes.splice(index, 0, change.doc) // insert
          //     }
          // }
      }
      // Binary search, the array is by default sorted by _id.
      private findIndex(array, id) {
          var low = 0, high = array.length, mid;
          while (low < high) {
              mid = (low + high) >>> 1;
              array[mid]._id < id ? low = mid + 1 : high = mid
          }
          return low;
      }
    // private onDatabaseChange (change){

      // if(change){
      // console.log("db change is triggered");
      // console.log(change.id);
      //   var changedIndex = null;
      //   var changedRecipe = null;
      //   this.recipes.forEach((doc, index) => {
      //     if(doc._id === change.id){
      //       changedRecipe = doc;
      //       changedIndex = index;
      //     }
      //   })
      //   console.log("Changed recipe");
      //   console.log(changedRecipe);
      //
      //   if (change.deleted) {
      //       if (this.recipes) {
      //         console.log("delete");
      //           this.recipes.splice(changedIndex, 1); // delete
      //       }
      //   } else {
      //
      //       if (changedRecipe) { // && recipe._id === change.id
      //         console.log("update");
      //           this.recipes[changedIndex] = change.doc; // update
      //       } else {
      //         console.log("insert");
      //           this.recipes.push(change.doc);//.splice(index, 0, change.doc) // insert
      //       }
      //   }
      // }
    // }

    initialiseTags(){

      this.tags.add("Dessert");
      this.tags.add("Vegetarisch");
      this.tags.add("Einfach");
      this.tags.add("Schnell");
      this.tags.add("Soßen");
      this.tags.add("Gebäck");
      // console.log(this.recipes);
      this.getAll().then(data => {
        this.recipes = data;

        if(data){
          for(let i = 0; i < data.length; i++){
            let tags = data[i].tags;
            if(tags){
              for(let j = 0 ; j < tags.length; j++){
                // console.log(tags[j]);
                  this.tags.add(tags[j]);
              }
            }
          }
        }
      });
      // console.log(this.recipes);
    }

    getTags(){
      return this.tags.toArray().sort();
    }

    //Call on new recipe saving, or edit save, after save of manually
    updateTags(tagArray){
      if(tagArray){
        for( let i = 0; i < tagArray.length; i++){
          this.tags.add(tagArray[i]);
        }
      }
    }



    //Title search
     filterItemsTitle(searchTerm){
        return this.recipes.filter((recipe) => {
            return recipe.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    }

    //Ingredient search
     filterItemsIngredient(searchTerm){
       if(this.recipes){
         return this.recipes.filter((recipe) => {
           if(recipe.ingredients){
             for (let i = 0; i < recipe.ingredients.length; i++){
               if(recipe.ingredients[i][2]){
                 if (recipe.ingredients[i][2].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
                     return true;
                 }
               }
              }
              return false;
           }

          });
       }

    }

    filterTag(searchTag){
      if(this.recipes){
        return this.recipes.filter((recipe) => {
          if(recipe.tags){
            for(let i = 0; i< recipe.tags.length; i++){
              if(new String(recipe.tags[i]).valueOf() == new String(searchTag).valueOf())
                return true;
            }
            return false;
          }
          return false;
        })
      }
    }

    removeDoubleTags(tags){
      var result = new Collections.Set<string>();
      for(var tag of tags){
        result.add(tag);
      }
      return result.toArray();
    }

    // checkTagsDuplicate(recipe){
    //   let tags = recipe.tags;
    //   if(tags){
    //   var set =  new Collections.Set<string>();
    //   for(var i = 0; i< tags.length; i++){
    //     set.add(tags[i]);
    //   }
    //   recipe.tags = set.toArray();
    // }
    // }

}
