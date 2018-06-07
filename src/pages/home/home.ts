import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { GoalPredictionPage } from '../goal-prediction/goal-prediction';
import { Network } from '@ionic-native/network';
import { MyApp } from '../../app/app.component';
import { AlertController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { LoadingController } from 'ionic-angular/index';

@NgModule({
  providers: [Network]
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Network, DatePipe]
})
export class HomePage {
  todaysMatches;
  count = 0;
  today = '';
  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    public network: Network,
    //public myApp: MyApp,
    public platform: Platform,
    private alertCtrl: AlertController,
    public datepipe: DatePipe,
    private loadingCtrl: LoadingController
  ) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Loading data...'
    });

    // Show the popup
    loadingPopup.present();
    authService.getTodaysMatchs().then(result => {
      this.todaysMatches = result;
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
}
