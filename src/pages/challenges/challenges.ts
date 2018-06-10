import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ChallengeService } from '../../services/challenge.service';
import { LoadingController } from 'ionic-angular/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { ToastController } from 'ionic-angular';

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
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
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
  saveChallangeInput(cId) {
    var ele = <HTMLInputElement>document.getElementById(cId);
    var ans = ele.value;
    this.challengeService.updatePrediction(cId, ans).then(result => {
      let toast = this.toastCtrl.create({
        message: 'Successfully Saved',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  timerfn(item) {
    var timeArr = item.date.split('-');
    var time = `${timeArr[1]}-${timeArr[0]}-${timeArr[2]} ${item.time}`;
    var countDownDate = new Date(time).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    var t = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    if (distance < 0) {
      //this.zone.run(() => {
      return 'Time Up';

      // });
    }

    return t;
  }
}
