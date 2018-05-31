import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';

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
    public navCtrl: NavController
  ) {
    this.signup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['']
    });
  }
  logForm() {
    console.log(this.signup.value);
    let credentials = this.signup.value;
    this.auth.signUp(credentials).then(() => this.navCtrl.setRoot(TabsPage));
  }
  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
