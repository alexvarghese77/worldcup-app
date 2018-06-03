import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { AngularFireDatabase } from 'angularfire2/database';
//import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class GameService {
  //database = firebase.database();
  //private noteListRef = this.db.database.ref().child('TeamList');

  constructor() {
    const ref: firebase.database.Reference = firebase
      .database()
      .ref(`/fixtures/`);
  }

  writePredictedGoal(matchdetails) {
    const ref: firebase.database.Reference = firebase
      .database()
      .ref(`/user/8086481358`);
    var log = ref.push(matchdetails);
    console.log(log);
  }
}
