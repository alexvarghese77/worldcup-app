import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { GoalPredictionPage } from '../goal-prediction/goal-prediction';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todaysMatches;
  count = 0;
  constructor(public navCtrl: NavController, private authService: AuthService) {
    authService.getTodaysMatchs().then(result => {
      this.todaysMatches = result;
    });
    console.log(this.todaysMatches);
  }

  goToPrediction(item) {
    console.log('Match details', item);
    this.navCtrl.setRoot(GoalPredictionPage, { data: item });
  }
<<<<<<< HEAD
  ionViewWillEnter() {
    this.incrementCount();
    console.log(this.count);
    // this.authService.getCurrentUser().then(result => {
    //   console.log(result);
    // });
  }
  incrementCount() {
    this.count++;
  }
=======
  // ionViewWillEnter() {}
  //   this.authService.getCurrentUser().then(result => {
  //     console.log(result);
  //   });
>>>>>>> a204e4514e6546b34f6f8e5f48f780fd14cb1b23
}
