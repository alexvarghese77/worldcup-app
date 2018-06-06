import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { ChallengesPage } from '../challenges/challenges';
import { ResultPage } from '../result/result';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = ChallengesPage;
  tab3Root = ResultPage;

  constructor() {}
}
