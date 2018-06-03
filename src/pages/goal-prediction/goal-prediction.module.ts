import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalPredictionPage } from './goal-prediction';

@NgModule({
  declarations: [
    GoalPredictionPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalPredictionPage),
  ],
})
export class GoalPredictionPageModule {}
