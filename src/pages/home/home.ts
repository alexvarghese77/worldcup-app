import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todaysMatches = [];
  constructor(public navCtrl: NavController, private authService: AuthService) {
    this.todaysMatches = authService.getTodaysMatchs();
    console.log(this.todaysMatches);
  }
}
