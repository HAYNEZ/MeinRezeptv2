import { Injectable, NgZone } from '@angular/core';
import * as Collections from 'typescript-collections';

import PouchDB from 'pouchdb';

//PouchDB References/Tutorials:
//http://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-ionic-2/
//https://www.joshmorony.com/part-2-creating-a-multiple-user-app-with-ionic-2-pouchdb-couchdb/

@Injectable()
export class RecipeService {
    private _db;
    private recipes;
    private tags = new Collections.Set<string>();

    constructor(
      private zone: NgZone
    ){}

    //Initializes the database for the recipes
    initDB() {
        this._db = new PouchDB('recipe');
    }

    //Adds a recipe to the recipe database
    add(recipe) {
        return this._db.post(recipe);
    }

    //Updates a recipe in the recipe database
    update(recipe) {
      return this._db.put(recipe).catch((error) => {
        console.log(error);
      });
    }

    //Deletes a recipe
    delete(recipe) {
        // console.log("db delete " + recipe.title);
        return this._db.remove(recipe).catch((error) => {
          console.log(error);
        });
    }

    //Gets all the recipes saved in the database.
    getAll() {
        if (!this.recipes) {
            //allDocs function to get an array back of all the item objects in the database.
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    // Each row has a .doc object and we just want to send an
                    // array of recipe objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this.recipes = docs.rows.map(row => {
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', (change) => {
                          this.onDatabaseChange(change);
                        });

                    return this.recipes;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this.recipes);
        }

    }

//Keeps the cached data in sync with the database when there is data added or changed
    private onDatabaseChange = (change) => {

        let changedDoc = null;
        let changedIndex = null;

        this.recipes.forEach((doc, index) => {
          if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
          }
        });

        if(change.deleted){     //A document was deleted
          if(changedDoc){       //Avoid multi removements
            this.recipes.splice(changedIndex, 1);
          }
        } else {
          if(changedDoc){       //A document was updated
            this.recipes[changedIndex] = change.doc;
          } else {              //A document was added
            this.recipes.push(change.doc);
          }
        }
    }

    //Adds Tags to the tags collection and initializes them
    initialiseTags(){

      this.tags.add("Dessert");
      this.tags.add("Vegetarisch");
      this.tags.add("Einfach");
      this.tags.add("Schnell");
      this.tags.add("Soßen");
      this.tags.add("Gebäck");

      this.getAll().then(data => {
        this.recipes = data;

        if(data){
          for(let i = 0; i < data.length; i++){
            let tags = data[i].tags;
            if(tags){
              for(let j = 0 ; j < tags.length; j++){
                  this.tags.add(tags[j]);
              }
            }
          }
        }
      });
    }


    //Returns all tags of the tags collection
    getTags(){
      return this.tags.toArray().sort();
    }

    //Called on new recipe savings, or edit save, to update the tags collection
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

    //Tag search
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

    //Prevents saving doubled tags
    removeDoubleTags(tags){
      var result = new Collections.Set<string>();
      for(var tag of tags){
        result.add(tag);
      }
      return result.toArray();
    }
    
}
