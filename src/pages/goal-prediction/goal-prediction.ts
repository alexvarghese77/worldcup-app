import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../services/game.service';
import { LocalStorage } from '../../services/localstorage.service';

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
    private storage: LocalStorage
  ) {
    console.log(this.navParams.get('data'));
    this.matchdetails = this.navParams.get('data');
  }

  savePredictedGoal() {
    console.log('in predict goal');
    var predictionDetails = {
      matchId: 6,
      team1Goal: 2,
      team2Code: 2
    };
    this.gameservice.writePredictedGoal(predictionDetails);
  }
}
