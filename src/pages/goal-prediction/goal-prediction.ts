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
  team1Name: '';
  team2Name: '';
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
    this.team1Name = this.getTeamName(matchD.team1Code);
    this.team2Name = this.getTeamName(matchD.team2Code);
  }
  savePredictedGoal() {
    var match = this.navParams.get('data');
    console.log('in predict goal');
    var falg = true;
    if (this.goal1 === '' || this.goal2 === '') {
      let toast = this.toastCtrl.create({
        message: 'Enter the Goals',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      falg = false;
    } else if (!/^\d+$/.test(this.goal1) || !/^\d+$/.test(this.goal2)) {
      let toast2 = this.toastCtrl.create({
        message: 'Enter valid Goals',
        duration: 3000,
        position: 'top'
      });
      toast2.present();
      falg = false;
    } else {
      var g1 = parseInt(this.goal1);
      var g2 = parseInt(this.goal2);
      if (g1 > 15 || g2 > 15) {
        let toast3 = this.toastCtrl.create({
          message: 'Goals Limited to 15',
          duration: 3000,
          position: 'top'
        });
        toast3.present();
        falg = false;
      } else {
        falg = true;
      }
    }
    if (falg) {
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
  }
  backButtonClick() {
    console.log('back button pressed');
    this.navCtrl.setRoot(HomePage);
  }
  getTeamName(code) {
    var teamList = {
      RUS: 'Russia',
      KSA: 'SaudiArabia',
      EGY: 'Egypt',
      URU: 'Uruguay',
      POR: 'Portugal',
      ESP: 'Spain',
      MAR: 'Morocco',
      IRN: 'Iran',
      FRA: 'France',
      AUS: 'Australia',
      PER: 'Peru',
      DEN: 'Denmark',
      ARG: 'Argentina',
      ISL: 'Iceland',
      CRO: 'Croatia',
      NGA: 'Nigeria',
      BRA: 'Brazil',
      SUI: 'Switzerland',
      CRC: 'CostaRica',
      SRB: 'Serbia',
      GER: 'Germany',
      MEX: 'Mexico',
      SWE: 'Sweden',
      KOR: 'SouthKorea',
      BEL: 'Belgium',
      PAN: 'Panama',
      TUN: 'Tunisia',
      ENG: 'England',
      POL: 'Poland',
      SEN: 'Senegal',
      COL: 'Colombia',
      JPN: 'Japan'
    };
    return teamList[code] ? teamList[code] : code;
  }
}
