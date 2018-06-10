import { Injectable, Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { DatePipe } from '@angular/common';

@Component({
  providers: [DatePipe]
})
@Injectable()
export class ChallengeService {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth, public datepipe: DatePipe) {
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
}
