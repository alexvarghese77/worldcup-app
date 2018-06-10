import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  todaysResults = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gameservice: GameService,
    private authService: AuthService
  ) {
    //gameservice.getMatchPrizeWinners();

    authService
      .getYesterdaysResults()
      .then(result => {
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            var val = result[key];
            this.todaysResults.push(val);
          }
        }
      })
      .catch(error => console.log('error'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
}
