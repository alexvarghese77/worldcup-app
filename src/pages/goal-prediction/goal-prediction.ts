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
  matchdetails: object;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gameservice: GameService,
    private storage: LocalStorage,
    private toastCtrl: ToastController
  ) {
    console.log(this.navParams.get('data'));
    this.matchdetails = this.navParams.get('data');
  }
  goal1 = '';
  goal2 = '';
  savePredictedGoal() {
    var match = this.navParams.get('data');
    console.log('in predict goal');
    if(this.goal1 === ""||this.goal2 === ""){
      let toast = this.toastCtrl.create({
      message: 'Enter the Goals',
      duration: 3000,
      position: 'top'
    });
   toast.present();
    }
    var predictionDetails = {
      matchId: match.matchId,
      team1Goal: parseInt(this.goal1),
      team2Goal: parseInt(this.goal2)
    };
    this.gameservice
      .writePredictedGoal(predictionDetails)
      .then(result => {
        this.navCtrl.setRoot(HomePage);
      })
      .catch(err => {});
  }
  backButtonClick() {
    console.log('back button pressed');
    this.navCtrl.setRoot(HomePage);
  }
}
