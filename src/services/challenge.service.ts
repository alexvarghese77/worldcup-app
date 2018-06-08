import { Injectable, Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DatePipe } from '@angular/common';
import { LocalStorage } from './localstorage.service';

@Component({
  providers: [DatePipe]
})
@Injectable()
export class ChallengeService {
  private user: firebase.User;

  constructor(
    public afAuth: AngularFireAuth,
    public datepipe: DatePipe,
    private storage: LocalStorage
  ) {
    afAuth.authState.subscribe(user => {
      this.user = user;
      console.log('state of user', this.user);
    });
  }

  getChallanges() {
    var date = new Date();
    date.setDate(date.getDate());
    var ddmmyyyy = this.datepipe.transform(date, 'dd-MM-yyyy');
    const challenge: firebase.database.Reference = firebase
      .database()
      .ref(`/Challanges/${ddmmyyyy}`);

    console.log('method called');

    return new Promise(function(resolve, reject) {
      challenge.on('value', personSnapshot => {
        console.log('value updated in promis', personSnapshot.val());
        resolve(personSnapshot.val());
      });
    });
  }
  getMegaChallanges() {
    const challenge: firebase.database.Reference = firebase
      .database()
      .ref(`/Challanges/MegaChallenges`);

    console.log('method called');

    return new Promise(function(resolve, reject) {
      challenge.on('value', personSnapshot => {
        console.log('value updated in promis', personSnapshot.val());
        resolve(personSnapshot.val());
      });
    });
  }

  updatePrediction(cId, ans) {
    return this.storage.getAuth().then(result => {
      let user = result.email.replace(/\./g, '_');
      var node = { [user]: ans };
      const ref: firebase.database.Reference = firebase
        .database()
        .ref(`/MegaChallangePredictions/`);
      var log = ref.child(cId).update(node);
      this.updateInUser(cId, ans, user);
    });
  }
  updateInUser(cId, ans, user) {
    const ref: firebase.database.Reference = firebase
      .database()
      .ref(`/user/${user}/predictedMegaChallenges/`);
    var log = ref.child(cId).update({ ans: ans });
  }
  getUserDetails() {
    this.storage.getAuth().then(result => {
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
