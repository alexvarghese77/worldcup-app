import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameService } from '../../services/game.service';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private gameservice: GameService
  ) {
    gameservice.getMatchPrizeWinners();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }
}
