import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
//import { AngularFireDatabase } from 'angularfire2/database';
//import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
  private user: firebase.User;
  //database = firebase.database();
  //private noteListRef = this.db.database.ref().child('TeamList');
  fixture = [];

  constructor(public afAuth: AngularFireAuth) {
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

  signUp(phoneNumberString, appVerifier) {
    // return this.afAuth.auth.createUserWithEmailAndPassword(
    //   credentials.email,
    //   credentials.password
    // );
    return firebase
      .auth()
      .signInWithPhoneNumber(phoneNumberString, appVerifier);
  }
  getTodaysMatchs() {
    // let matches = this.fixture.filter(match => {
    //   return match.date == '28-06-2018';
    // });
    //return matches;

    const fixture: firebase.database.Reference = firebase
      .database()
      .ref(`/fixtures/`);
    //  fixture.on('value', personSnapshot => {
    //  console.log("value updated");
    //   return personSnapshot.val();

    // });
    console.log('method called');

    return new Promise(function(resolve, reject) {
      fixture.on('value', personSnapshot => {
        console.log('value updated in promis');
        resolve(personSnapshot.val());
      });
    });

    //console.log("shdkjhnskj",matchdetis)
    // matchdetis.then((result)=>{
    //   console.log(result);
    // }).catch(()=>"erreo")
  }
}
