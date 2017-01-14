import { Injectable } from '@angular/core';

import PouchDB from 'pouchdb';

@Injectable()
export class ListService {
    private _db;
    private items;

    initDB() {
        this._db = new PouchDB('list');
    }


    add(item) {
        return this._db.post(item);
    }

    delete(item) {
      console.log("Delete list item");
        return this._db.remove(item);
    }

    deleteDB(){
      this._db.destroy(function (err, response) {
        if (err) {} else {}
      });
    }

    getAll() {

        if (!this.items) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    // Each row has a .doc object and we just want to send an
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this.items = docs.rows.map(row => {
                        // Dates are not automatically converted from a string.

                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this.items;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this.items);
        }
    }


    private onDatabaseChange = (change) => {
        var index = this.findIndex(this.items, change.id);
        var item = this.items[index];

        if (change.deleted) {
            if (item) {
                this.items.splice(index, 1); // delete
            }
        } else {

            if (item && item._id === change.id) {
                this.items[index] = change.doc; // update
            } else {
                this.items.splice(index, 0, change.doc) // insert
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

    public getItems(){
      return this.items;
    }


}
