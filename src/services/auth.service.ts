import { Injectable, Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { AngularFireDatabase } from 'angularfire2/database';
//import AuthProvider = firebase.auth.AuthProvider;
import { DatePipe } from '@angular/common';

@Component({
  providers: [DatePipe]
})
@Injectable()
export class AuthService {
  private user: firebase.User;
  //database = firebase.database();
  //private noteListRef = this.db.database.ref().child('TeamList');
  fixture = [];

  constructor(public afAuth: AngularFireAuth, public datepipe: DatePipe) {
    afAuth.authState.subscribe(user => {
      this.user = user;
      console.log('state of user', this.user);
    });
  }
  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  // return firebase
  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );

    //   .auth()
    //   .signInWithPhoneNumber(phoneNumberString, appVerifier);
  }
  updateUser(credentials) {
    const ref: firebase.database.Reference = firebase.database().ref(`/user/`);
    ref
      .child(credentials.email.replace(/\./g, '_'))
      .update({ name: credentials.name });
    ref
      .child(credentials.email.replace(/\./g, '_'))
      .update({ mobile: credentials.mobile });
  }
  getTodaysMatchs() {
    var date = new Date();
    var ddmmyyyy = this.datepipe.transform(date, 'dd-MM-yyyy');
    const fixture: firebase.database.Reference = firebase
      .database()
      .ref(`/Matches/${ddmmyyyy}`);

    console.log('method called');

    return new Promise(function(resolve, reject) {
      fixture.on('value', personSnapshot => {
        console.log('value updated in promis');
        resolve(personSnapshot.val());
      });
    });
  }

  getYesterdaysResults() {
    var date = new Date();
    var yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);
    var ddmmyyyy = this.datepipe.transform(yesterday, 'dd-MM-yyyy');
    const fixture: firebase.database.Reference = firebase
      .database()
      .ref(`/Matches/${ddmmyyyy}`);
    console.log('method called');

    return new Promise(function(resolve, reject) {
      fixture.on('value', personSnapshot => {
        console.log('value updated in promis');
        resolve(personSnapshot.val());
      });
    });
  }
  getCurrentUser() {
    // var userID = this.user.email.replace(/\./g, '_');
    // const userDetails: firebase.database.Reference = firebase
    //   .database()
    //   .ref(`/users/` + userID);
    // console.log(userDetails);
    // return new Promise(function(resolve, reject) {
    //   userDetails.on('value', personSnapshot => {
    //     console.log('value updated in promis');
    //     resolve(personSnapshot.val());
    //   });
    // });
  }
}
