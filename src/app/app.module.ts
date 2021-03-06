import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_CONFIG } from '../config/config';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { GoalPredictionPage } from '../pages/goal-prediction/goal-prediction';
import { ChallengesPage } from '../pages/challenges/challenges';
import { ResultPage } from '../pages/result/result';
import { FeedbackPage } from '../pages/feedback/feedback';
import { HowToPlayPage } from '../pages/how-to-play/how-to-play';
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { GameService } from '../services/game.service';
import { LocalStorage } from '../services/localstorage.service';
import { ChallengeService } from '../services/challenge.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ChallengesPage,
    TabsPage,
    LoginPage,
    SignupPage,
    GoalPredictionPage,
    ResultPage,
    FeedbackPage,
    HowToPlayPage,
    LeaderboardPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    NgxErrorsModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ChallengesPage,
    TabsPage,
    LoginPage,
    SignupPage,
    GoalPredictionPage,
    ResultPage,
    FeedbackPage,
    HowToPlayPage,
    LeaderboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AuthService,
    GameService,
    LocalStorage,
    ChallengeService,
    DatePipe,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
