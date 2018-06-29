import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../services/game.service';
import { AuthService } from '../../services/auth.service';
import { DatePipe } from '@angular/common';
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
  isThereAnyResultTdy = true;
  todayDate = '';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gameservice: GameService,
    private authService: AuthService,
    private datepipe: DatePipe
  ) {
    //gameservice.getMatchPrizeWinners();
    let day = new Date();
    var yesterday = new Date(day);
    yesterday.setDate(day.getDate() - 1);
    this.todayDate = this.datepipe.transform(yesterday, 'dd MMM yyyy');
    authService
      .getYesterdaysResults()
      .then(result => {
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            var val = result[key];
            this.todaysResults.push(val);
          }
        }
        this.isThereAnyResultTdy = this.todaysResults.length > 0 ? true : false;
      })
      .catch(error => console.log('error'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
}
