import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { GoalPredictionPage } from '../goal-prediction/goal-prediction';
import { Network } from '@ionic-native/network';
import { MyApp } from '../../app/app.component';
import { AlertController } from 'ionic-angular';

@NgModule({
  providers: [Network]
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Network]
})
export class HomePage {
  todaysMatches;
  count = 0;
  constructor(
    public navCtrl: NavController,
    private authService: AuthService,
    public network: Network,
    //public myApp: MyApp,
    public platform: Platform,
    private alertCtrl: AlertController
  ) {
    authService.getTodaysMatchs().then(result => {
      this.todaysMatches = result;
    });
    console.log(this.todaysMatches);
  }

  goToPrediction(item) {
    console.log('Match details', item);
    this.navCtrl.setRoot(GoalPredictionPage, { data: item });
  }
  ionViewWillEnter() {
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
