import { Component, NgModule, ViewChild, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { GoalPredictionPage } from '../goal-prediction/goal-prediction';
import { Network } from '@ionic-native/network';
import { MyApp } from '../../app/app.component';
import { AlertController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { LoadingController } from 'ionic-angular/index';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { storage } from 'firebase';
import { LocalStorage } from '../../services/localstorage.service';

@NgModule({
  providers: [Network, LocalNotifications]
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Network, DatePipe, LocalNotifications]
})
export class HomePage {
  todaysMatches = [];
  count = 0;
  today = '';
  todayDate = '';
  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    public network: Network,
    //public myApp: MyApp,
    public platform: Platform,
    private alertCtrl: AlertController,
    public datepipe: DatePipe,
    private loadingCtrl: LoadingController,
    private localNotifications: LocalNotifications,
    private localStorage: LocalStorage
  ) {
    Observable.interval(1000).subscribe();
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });
    let day = new Date();

    this.todayDate = this.datepipe.transform(day, 'dd MMM yyyy');
    // console.log(this.todayDate);

    day.setHours(8);
    day.setMinutes(30);
    day.setSeconds(0);

    this.localNotifications.schedule({
      id: 3,
      title: 'Warning',
      text: 'Dont fall asleep',
      trigger: { at: day },
      every: 'day'
    });
    // Show the popup
    loadingPopup.present();

    authService.getTodaysMatchs().then(result => {
      for (var key in result) {
        if (result.hasOwnProperty(key)) {
          var val = result[key];
          this.todaysMatches.push(val);
        }
      }
      loadingPopup.dismiss();
    });

    console.log(this.todaysMatches);
  }

  goToPrediction(item) {
    console.log('Match details', item);
    this.navCtrl.setRoot(GoalPredictionPage, { data: item });
  }
  ionViewWillEnter() {
    let date = new Date();
    this.today = this.datepipe.transform(date, 'dd MMM yyyy');
    this.incrementCount();
    console.log(this.count);
    this.checkInterConnection();
  }
  incrementCount() {
    this.count++;
  }
  checkInterConnection() {
    this.network.onDisconnect().subscribe(() => {
      console.log('you are offline');
    });
    if (this.network.type === 'none') {
      console.log('no internet');

      const alert = this.alertCtrl.create({
        title: 'No Internet Access!!',
        message: 'App closed due to no internet access!!',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.platform.exitApp(); // Close this application
            }
          }
        ]
      });
      alert.present();
    }
  }

  testfn(item) {
    //console.log('method called');
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

  getMatch(matchId) {
    console.log('matchId', matchId);

    let userDetails;
    //   this.localStorage.getAuth().then(result => {
    //     userDetails = result;
    //   }).catch(()=>console.log("Error"))
  }
}
