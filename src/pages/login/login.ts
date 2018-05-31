import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
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
  // email = new FormControl();
  // password = new FormControl();

  // constructor(public navCtrl: NavController, public navParams: NavParams) {

  // }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }
  // openPage() {
  //   // Reset the content nav to have just this page
  //   // we wouldn't want the back button to show in this scenario
  //   //console.log(this.email,this.password)
  //   //this.navCtrl.setRoot(TabsPage);
  // }

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

    // this.auth
    //   .signUp(credentials)
    //   .then
    //   // () => this.navCtrl.setRoot(HomePage),
    //   // error => this.signupError = error.message
    //   ();
  }
}
