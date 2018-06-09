import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ChallengeService } from '../../services/challenge.service';
import { LoadingController } from 'ionic-angular/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@IonicPage()
@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html'
})
export class ChallengesPage {
  todayDate: '';
  todaysChallenges = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public datepipe: DatePipe,
    public challengeService: ChallengeService,
    private loadingCtrl: LoadingController
  ) {
    Observable.interval(1000).subscribe();
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();

    this.challengeService.getChallanges().then(result => {
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          var val = result[key];
          this.todaysChallenges.push(val);
        }
      }
      loadingPopup.dismiss();
    });
    let day = new Date();

    // this.todayDate = this.datepipe.transform(day, 'dd MMM yyyy');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChallengesPage');
  }
}
