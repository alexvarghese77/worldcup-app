import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LocalStorage } from './localstorage.service';
//import { AngularFireDatabase } from 'angularfire2/database';
//import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class GameService {
  //database = firebase.database();
  //private noteListRef = this.db.database.ref().child('TeamList');
  private user;
  constructor(private storage: LocalStorage) {
    const ref: firebase.database.Reference = firebase
      .database()
      .ref(`/fixtures/`);

    this.storage.getAuth().then(result => {
      this.user = result;
    });
  }

  writePredictedGoal(predictionDetails) {
    return this.storage.getAuth().then(result => {
      let user = result.email.replace(/\./g, '_');
      const ref: firebase.database.Reference = firebase
        .database()
        .ref(`/user/${user}/predictedmatches/`);
      var log = ref.child(predictionDetails.matchId).update(predictionDetails);
      predictionDetails.user = user;
      this.updatePredictedMatches(predictionDetails);
    });
  }
  updatePredictedMatches(predictionDetails) {
    const ref: firebase.database.Reference = firebase
      .database()
      .ref(`/predictedMatches/${predictionDetails.matchId}`);
    ref.child(predictionDetails.user).update(predictionDetails);
  }

  getLocaldata() {
    return this.storage.getAuth();
  }

  getMatchPrizeWinners() {
    const matchPrizeWinners: firebase.database.Reference = firebase
      .database()
      .ref(`/matchPrizeWinners/`);

    matchPrizeWinners.on('value', personSnapshot => {
      console.log(personSnapshot.val());
    });
  }

  getUserDetails() {
    this.getLocaldata().then(result => {
      let user = result.email.replace(/\./g, '_');
      const getUserData: firebase.database.Reference = firebase
        .database()
        .ref(`/user/${user}`);

      getUserData.on('value', personSnapshot => {
        console.log(personSnapshot.val());
        var auth = personSnapshot.val();
        auth.email = result.email;
        this.storage.setAuth(auth);
      });
    });
  }
}
