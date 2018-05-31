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
  teamList = [];
  fixture = [];

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.user = user;
      console.log('state of user', this.user);
    });

    //read team list data from firebase
    const teamList: firebase.database.Reference = firebase
      .database()
      .ref(`/TeamList/`);
    teamList.on('value', personSnapshot => {
      this.teamList = personSnapshot.val();
    });
    //read fixture from firebase
    const fixture: firebase.database.Reference = firebase
      .database()
      .ref(`/fixtures/`);
    fixture.on('value', personSnapshot => {
      this.fixture = personSnapshot.val();
    });
  }
  signInWithEmail(credentials) {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }

  signUp(credentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    );
  }
  getTodaysMatchs() {
    // let matches = this.fixture.filter(match => {
    //   return match.date == '28-06-2018';
    // });
    //return matches;
    return this.fixture;
  }
}
