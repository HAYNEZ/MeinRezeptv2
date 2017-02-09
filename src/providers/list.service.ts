  import { Injectable, NgZone} from '@angular/core';

  import PouchDB from 'pouchdb';

  //PouchDB References/Tutorials:
  //http://gonehybrid.com/how-to-use-pouchdb-sqlite-for-local-storage-in-ionic-2/
  //https://www.joshmorony.com/part-2-creating-a-multiple-user-app-with-ionic-2-pouchdb-couchdb/

  @Injectable()
  export class ListService {
      private _db;
      private items;

      constructor(
        private zone: NgZone
      ){}

  //Initializes the database for the shopping-list
      initDB() {
          this._db = new PouchDB('list');
      }


  //Adds an item to the shopping-list database
      add(item) {
          return this._db.post(item);
      }

  //Updates an item in the shopping-list database
      update(item) {
        return this._db.put(item).catch((error) => {
          console.log(error);
        });
      }


  //Deletes an item from the shopping-list
      delete(item) {
        console.log("Delete list item");
          return this._db.remove(item);
      }

  //Gets all the items saved in the database.
      getAll() {

          if (!this.items) {
              //allDocs function to get an array back of all the item objects in the database.
              return this._db.allDocs({ include_docs: true })
                  .then(docs => {

                      // Each row has a .doc object and we just want to send an
                      // array of item objects back to the calling controller,
                      // so we map the array to contain just the .doc objects.

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

  //Keeps the cached data in sync with the database when there is data added or changed
      private onDatabaseChange = (change) => {

        let changedDoc = null;
        let changedIndex = null;

        this.items.forEach((doc, index) => {

          if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
            }

        });


        if(change.deleted){  //A document was deleted
          if(changedDoc){  //Solved multi removements
          this.items.splice(changedIndex, 1);
          }
        }else{

          if(changedDoc){  //A document was updated
            this.items[changedIndex] = change.doc;
          }
          else {   //A document was added
            this.items.unshift(change.doc);
          }
        }
      }


  //Returns an item
      public getItems(){
        return this.items;
      }


  }
