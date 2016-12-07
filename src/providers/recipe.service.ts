import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';

@Injectable()
export class RecipeService {
    private _db;
    private recipes;

    initDB() {
        this._db = new PouchDB('recipe');
    }


    add(recipe) {
        return this._db.post(recipe);
    }


    getAll() {

        if (!this.recipes) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    // Each row has a .doc object and we just want to send an 
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this.recipes = docs.rows.map(row => {
                        // Dates are not automatically converted from a string.
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this.recipes;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this.recipes);
        }
    }


    private onDatabaseChange = (change) => {
        var index = this.findIndex(this.recipes, change.id);
        var recipe = this.recipes[index];

        if (change.deleted) {
            if (recipe) {
                this.recipes.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (recipe && recipe._id === change.id) {
                this.recipes[index] = change.doc; // update
            } else {
                this.recipes.splice(index, 0, change.doc) // insert
            }
        }
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

}