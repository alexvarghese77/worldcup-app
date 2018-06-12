import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

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
    private gameservice: GameService,
    private toastCtrl: ToastController
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
            this.navCtrl.setRoot(TabsPage).then(res => {
              this.gameservice.getUserDetails();
            });
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
  frgtPwd() {
    let alert = this.alertCtrl.create({
      title: 'Reset Password',
      message: 'Please enter your registered email address',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'username',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Reset Password',
          role: 'cancel',
          handler: data => {
            if (data.username) {
              var email, toastM;
              if (this.validateEmail(data.username)) {
                this.auth
                  .resetPassword(data.username)
                  .then(result => {
                    const alert = this.alertCtrl.create({
                      title: 'Password Reset',
                      message:
                        'Please check the your email for the reset password link!',
                      buttons: [
                        {
                          text: 'OK',
                          role: 'cancel',
                          handler: () => {
                            alert.dismiss();
                          }
                        }
                      ]
                    });
                    alert.present();
                  })
                  .catch(error => {
                    let toast = this.toastCtrl.create({
                      message: 'Not a registered email addrress',
                      duration: 3000,
                      position: 'top'
                    });
                    toast.present();
                    return false;
                  });
              } else {
                toastM = this.toastCtrl.create({
                  message: 'Please Enter valid email',
                  duration: 3000,
                  position: 'top'
                });
                toastM.present();
                return false;
              }
            } else {
              let toastM = this.toastCtrl.create({
                message: 'Please Enter valid email',
                duration: 3000,
                position: 'top'
              });
              toastM.present();
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  validateEmail(username) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(username.toLowerCase())) {
      return true;
    }
    return false;
  }
}
