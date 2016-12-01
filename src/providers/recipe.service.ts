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

  add(recipe: Recipe) : Promise<any>{
    return this.db.put(recipe);
  }

  update(recipe: Recipe) : Promise<any> {
        return this.db.put(recipe);
    }

  getAll() : Observable<any>{
    return Observable.fromPromise(
      this.initDB().then(() => {
        return this.db.allDocs({include_docs: true});
      }).then(docs => {
        return docs.rows.map(row => {
          return row.doc;
        })
      }));

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
