import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
//import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import firebase from 'firebase';
import { LocalStorage } from '../../services/localstorage.service';
import { ValidateName } from '../../customValidations/customValidator';
import { ValidateEmail } from '../../customValidations/customValidator';
import { ValidateMobile } from '../../customValidations/customValidator';
import { passwordValidator } from '../../customValidations/customValidator';
import { Nav, Platform } from 'ionic-angular';
import { GameService } from '../../services/game.service';
//import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  private signup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public navCtrl: NavController,
    private storage: LocalStorage,
    public platform: Platform,
    private gameservice: GameService,
    private alertCtrl: AlertController
  ) {
    this.signup = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, ValidateName])],
      email: ['', Validators.compose([Validators.required, ValidateEmail])],
      mobile: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(15),
          ValidateMobile
        ])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      cpassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  logForm() {
    console.log(this.signup.value);
    let credentials = this.signup.value;
    if (credentials.password === credentials.cpassword) {
      this.auth.signUp(credentials).then(() => {
        this.auth.updateUser(credentials);
        this.storage.setAuth(credentials);
        this.gameservice.getUserDetails();
        this.navCtrl.setRoot(TabsPage);
      });
    } else {
      const alert = this.alertCtrl.create({
        title: 'Alert',
        message: 'Password and confirm password are not matching',
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
    //*******mobile number varification code here */
  }
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
