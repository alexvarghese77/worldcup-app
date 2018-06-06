import { Component, ViewChild, NgModule } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
// import { Network } from '@ionic-native/network';

import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
//import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { LocalStorage } from '../services/localstorage.service';

// @NgModule({
//   providers: [Network]
// })
@Component({
  templateUrl: 'app.html'
  // providers: [Network]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  //rootPage:any = TabsPage;
  pages: Array<{ title: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: LocalStorage,
    public app: App,
    private alertCtrl: AlertController // private network: Network
  ) {
    platform.registerBackButtonAction(() => {
      let nav = app.getActiveNavs()[0];
      let activeView = nav.getActive();

      if (activeView.name === 'LoginPage' || activeView.name === 'HomePage') {
        if (nav.canGoBack()) {
          //Can we go back?
          nav.pop();
        } else {
          const alert = this.alertCtrl.create({
            title: 'App termination',
            message: 'Do you want to close the app?',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Application exit prevented!');
                }
              },
              {
                text: 'Close App',
                handler: () => {
                  this.platform.exitApp(); // Close this application
                }
              }
            ]
          });
          alert.present();
        }
      }
    });

    this.storage.getAuth().then(result => {
      console.log('authdetails', result);
      result ? (this.rootPage = TabsPage) : (this.rootPage = LoginPage);
      this.initializeApp();
    });

    //debugger;
    // // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Leaderboard', component: TabsPage },
      { title: 'Leaderboard', component: TabsPage },
      { title: 'Howto Play', component: AboutPage },
      { title: 'FAQ', component: ContactPage },
      { title: 'Terms and conditions', component: ContactPage }
    ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    this.storage.clearstorage();
    this.nav.setRoot(LoginPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  /*checkInterConnection() {
    if (this.network.type === 'none') {
      const alert = this.alertCtrl.create({
        title: 'App termination due to no internet',
        message: 'No network connection!! Please Conect to a network!!',
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
  }*/
}
