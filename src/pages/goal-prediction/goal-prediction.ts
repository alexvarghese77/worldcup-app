import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../services/game.service';
import { LocalStorage } from '../../services/localstorage.service';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the GoalPredictionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goal-prediction',
  templateUrl: 'goal-prediction.html'
})
export class GoalPredictionPage {
  matchdetails: '';
  goal1 = '';
  goal2 = '';
  user = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gameservice: GameService,
    private storage: LocalStorage,
    private toastCtrl: ToastController
  ) {
    this.setPredictedGoals();
  }
  setPredictedGoals() {
    //console.log(this.navParams.get('data'));
    var matchD = this.navParams.get('data');
    this.matchdetails = matchD;
    this.goal1 = matchD.team1goals + '';
    this.goal2 = matchD.team2goals + '';
  }
  savePredictedGoal() {
    var match = this.navParams.get('data');
    console.log('in predict goal');
    if (this.goal1 === '' || this.goal2 === '') {
      let toast = this.toastCtrl.create({
        message: 'Enter the Goals',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    this.storage.getAuth().then(result => {
      this.user = result;
    });
    var predictionDetails = {
      matchId: match.matchId,
      team1Goal: parseInt(this.goal1),
      team2Goal: parseInt(this.goal2),
      date: match.date
    };

    this.gameservice
      .writePredictedGoal(predictionDetails)
      .then(result => {
        console.log('in predict getUserDetails');
        this.gameservice.getUserDetails();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {
        console.log(err);
      });
  }
  backButtonClick() {
    console.log('back button pressed');
    this.navCtrl.setRoot(HomePage);
  }
}
