import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ChallengeService } from '../../services/challenge.service';
import { LoadingController } from 'ionic-angular/index';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { ToastController } from 'ionic-angular';
import { LocalStorage } from '../../services/localstorage.service';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-challenges',
  templateUrl: 'challenges.html'
})
export class ChallengesPage {
  todayDate: '';
  todaysChallenges = [];
  userDetails;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public datepipe: DatePipe,
    public challengeService: ChallengeService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private localStorage: LocalStorage,
    private alertController: AlertController
  ) {
    Observable.interval(1000).subscribe();
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    loadingPopup.present();

    this.challengeService.getMegaChallanges().then(result => {
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          var val = result[key];
          this.todaysChallenges.push(val);
        }
      }
      loadingPopup.dismiss();
      this.setUserDetails();
    });
    let day = new Date();

    // this.todayDate = this.datepipe.transform(day, 'dd MMM yyyy');
  }

  ionViewDidEnter() {
    this.setUserDetails();
  }
  setUserDetails() {
    this.localStorage
      .getAuth()
      .then(result => {
        this.userDetails = result;
        this.updateTodaysChallanges();
      })
      .catch(() => console.log('Error'));
  }
  updateTodaysChallanges() {
    var ans = '';
    if (this.userDetails != null && this.todaysChallenges.length > 0) {
      if (this.userDetails.predictedMegaChallenges) {
        for (var i = 0; i < this.todaysChallenges.length; i++) {
          var cId = this.todaysChallenges[i].cId;
          if (this.userDetails.predictedMegaChallenges[cId]) {
            ans = this.userDetails.predictedMegaChallenges[cId].ans;
            this.todaysChallenges[i].ans = ans;
          } else {
            ans = '';
            this.todaysChallenges[i].ans = ans;
          }
        }
      } else {
        for (var i = 0; i < this.todaysChallenges.length; i++) {
          var cId = this.todaysChallenges[i].cId;
          ans = '';
          this.todaysChallenges[i].ans = ans;
        }
      }
    } else {
      for (var i = 0; i < this.todaysChallenges.length; i++) {
        var cId = this.todaysChallenges[i].cId;
        ans = '';
        this.todaysChallenges[i].ans = ans;
      }
    }
  }
  saveChallangeInput(cId, date, time) {
    var item = { date: date, time: time };
    if (this.timerfn(item) != 'Time Up') {
      var ele = <HTMLInputElement>document.getElementById(cId);
      var ans = ele.value;
      if (ans == '' || ans == null) {
        let toastM = this.toastCtrl.create({
          message: 'Please Enter your prediction',
          duration: 3000,
          position: 'top'
        });
        toastM.present();
      } else {
        var re = /^[a-zA-Z ]{4,30}$/;
        if (!re.test(ans.toLowerCase())) {
          let toast2 = this.toastCtrl.create({
            message: 'Please Enter valid prediction',
            duration: 3000,
            position: 'top'
          });
          toast2.present();
        } else {
          this.challengeService.updatePrediction(cId, ans).then(result => {
            let toast = this.toastCtrl.create({
              message: 'Successfully Saved',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          });
        }
      }
    } else {
      const alert = this.alertController.create({
        title: 'Time Up!!',
        message: 'Prediction time over!!',
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {
              // this.platform.exitApp(); // Close this application
            }
          }
        ]
      });
      alert.present();
    }
  }

  timerfn(item) {
    var timeArr = item.date.split('-');
    var time =
      timeArr[1] +
      '/' +
      timeArr[0] +
      '/' +
      timeArr[2] +
      ' ' +
      item.time +
      ':00';
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
