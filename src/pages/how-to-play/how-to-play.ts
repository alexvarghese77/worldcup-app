import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the HowToPlayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-how-to-play',
  templateUrl: 'how-to-play.html',
})
export class HowToPlayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HowToPlayPage');
  }
  backButtonClick() {
    console.log('back button pressed');
    this.navCtrl.setRoot(TabsPage);
  }
}
