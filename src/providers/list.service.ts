import { Injectable, NgZone} from '@angular/core';

import PouchDB from 'pouchdb';

@Injectable()
export class ListService {
    private _db;
    private items;

    constructor(
      private zone: NgZone
    ){}

    initDB() {
        this._db = new PouchDB('list');
    }

    add(item) {
        return this._db.post(item);
    }

    update(item) {
      return this._db.put(item).catch((error) => {
        console.log(error);
      });
    }

    filterChecked(){
      return this.items.filter((item)=>{
        return item.checked;
      });
    }

    filterUnchecked(){
    return this.items.filter((item)=>{
      return !item.checked;
    });
    }

    delete(item) {
      console.log("Delete list item");
        return this._db.remove(item);
    }

    getAll() {

        if (!this.items) {
            return this._db.allDocs({ include_docs: true })
                .then(docs => {

                    // Each row has a .doc object and we just want to send an
                    // array of birthday objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this.items = docs.rows.map(row => {
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this._db.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', (change) => {
                          this.onDatabaseChange(change);
                        });
                    // console.log(this.items);
                    return this.items;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this.items);
        }
    }


    private onDatabaseChange = (change) => {

      let changedDoc = null;
      let changedIndex = null;

      this.items.forEach((doc, index) => {

        if(doc._id === change.id){
          changedDoc = doc;
          changedIndex = index;
          }

      });

      //A document was deleted

      if(change.deleted){
        if(changedDoc){
        this.items.splice(changedIndex, 1);
        }
      }else{

        //A document was updated
        if(changedDoc){
          this.items[changedIndex] = change.doc;
        }

      //A document was added
        else {
          this.items.unshift(change.doc);
        }

      }
    }

    // Binary search, the array is by default sorted by _id.
    // private findIndex(array, id) {
    //     var low = 0, high = array.length, mid;
    //     while (low < high) {
    //         mid = (low + high) >>> 1;
    //         array[mid]._id < id ? low = mid + 1 : high = mid
    //     }
    //     return low;
    // }

    public getItems(){
      return this.items;
    }


}
