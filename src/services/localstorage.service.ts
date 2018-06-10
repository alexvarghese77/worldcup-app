import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorage {
  constructor(private storage: Storage) {
    console.log('storage initalised');
  }
  setAuth(credentials) {
    return this.storage.set('user', credentials);
  }
  getAuth() {
    return this.storage.get('user');
  }
  clearstorage() {
    this.storage.clear().then(() => {
      console.log('data cleared succcess fully');
    });
  }
}
