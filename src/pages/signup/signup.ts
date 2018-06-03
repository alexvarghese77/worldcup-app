import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import firebase from 'firebase';
import { LocalStorage } from '../../services/localstorage.service';
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
    private storage: LocalStorage
  ) {
    this.signup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: [''],
      password: ['', Validators.required],
      cpassword: ['']
    });
  }
  logForm() {
    console.log(this.signup.value);
    let credentials = this.signup.value;

    //*******mobile number varification code here */
    this.auth.signUp(credentials).then(() => {
      this.auth.updateUser(credentials);
      this.storage.setAuth(credentials);
      this.navCtrl.setRoot(TabsPage);
    });
  }
  login() {
    this.navCtrl.setRoot(LoginPage);
  }

  /* public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private auth: AuthService
  ) {}

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container'
    );
  }
  signIn(phoneNumber: number) {
    const appVerifier = this.recaptchaVerifier;
    const phoneNumberString = '+91' + phoneNumber;
    console.log('appveri', appVerifier);
    this.auth
      .signUp(phoneNumberString, appVerifier)
      .then(confirmationResult => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log('confirmresult', confirmationResult);
        let prompt = this.alertCtrl.create({
          title: 'Enter the Confirmation code',
          inputs: [
            { name: 'confirmationCode', placeholder: 'Confirmation Code' }
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Send',
              handler: data => {
                // Here we need to handle the confirmation code
                confirmationResult
                  .confirm(data.confirmationCode)
                  .then(function(result) {
                    // User signed in successfully.
                    console.log(result.user);
                    // ...
                  })
                  .catch(function(error) {
                    // User couldn't sign in (bad verification code?)
                    // ...
                  });
              }
            }
          ]
        });
        prompt.present();
      })
      .catch(function(error) {
        console.error('SMS not sent', error);
      });
  }*/
}
