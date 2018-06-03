import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LocalStorage } from '../../services/localstorage.service';
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
    public menu: MenuController
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
      () => {
        this.storage.setAuth(credentials);
        this.navCtrl.setRoot(TabsPage);
      }

      // error => this.loginError = error.message
    );
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
