import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
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
    public navCtrl: NavController
  ) {
    this.todo = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['']
    });
  }
  logForm() {
    console.log(this.todo.value);
    let credentials = this.todo.value;
    this.auth.signInWithEmail(credentials).then(
      () => this.navCtrl.setRoot(TabsPage)
      // error => this.loginError = error.message
    );
  }
  signup() {
    this.navCtrl.setRoot(SignupPage);
  }
}
