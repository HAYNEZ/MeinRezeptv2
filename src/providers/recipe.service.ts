import { Injectable } from '@angular/core';
import {Platform} from 'ionic-angular';
import PouchDB from 'pouchdb';
import {Observable} from 'rxjs/rx';

import {Recipe} from '../models/recipe';

@Injectable()
export class RecipeService {

  private db;

  constructor(private platform: Platform) {}

  initDB() : Promise<any> {
    return this.platform.ready().then(() => {
      this.db = new PouchDB('database');
    })
  }

  add(recipe) : Promise<any>{
    return this.db.post(recipe);
  }

  // update(recipe: Recipe) : Promise<any> {
  //       return this.db.put(recipe);
  //   }

  getAll() : Promise<any>{
    return this.initDB().then(() => {
        return this.db.allDocs({include_docs: true});
      }).then(docs => {
        return docs.rows.map(row => {
          // console.log("Service, get all ");
          // console.log(row.doc);
          return row.doc;
        })
      }).then((res) => {
        console.log(res);
        return res.json();
      });
    // );
      // Observable.fromPromise(

    //   this.db.allDocs({
    //   include_doc: true,
    //   attachments: true
    // }).then(function(result) {
    //
    // });
  }

  getChanges(): Observable<any> {
        return Observable.create(observer => {
                // Listen for changes on the database.
                this.db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', change => {
                        // Convert string to date, doesn't happen automatically.
                        // change.doc.date = new Date(change.doc.date);
                        observer.next(change.doc);
                    });
        });
    }

}
