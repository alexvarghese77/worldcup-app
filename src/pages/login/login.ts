import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

//import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorage } from '../../services/localstorage.service';
import { ValidateEmail } from '../../customValidations/customValidator';
import { GameService } from '../../services/game.service';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  error = 'erreo';
  private todo: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private storage: LocalStorage,
    public navCtrl: NavController,
    public menu: MenuController,
    private alertCtrl: AlertController,
    private gameservice: GameService
  ) {
    this.todo = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, ValidateEmail])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  logForm() {
    console.log(this.todo.value);
    let credentials = this.todo.value;
    this.auth
      .signInWithEmail(credentials)
      .then(
        () => {
          this.storage.setAuth(credentials).then(result => {
            this.gameservice.getUserDetails();
            this.navCtrl.setRoot(TabsPage);
          });
        }

        // error => this.loginError = error.message
      )
      .catch(error => {
        const alert = this.alertCtrl.create({
          title: 'Invalid Login!',
          message: 'Please check the credentials or Sign Up',
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              handler: () => {}
            }
          ]
        });
        alert.present();
      });
  }
  signup() {
    this.navCtrl.setRoot(SignupPage);
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }
}
