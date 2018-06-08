import { Component, Input, NgZone } from '@angular/core';

/**
 * Generated class for the TimerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {
  text: string = '05H : 30M :20S';
  @Input() name: string;
  constructor(private zone: NgZone) {
    // Set the date we're counting down to
    this.timerCalc();
    console.log('name*********', this.name);
  }
  updateText(t) {
    this.zone.run(() => {
      this.text = t;
    });
  }
  timerCalc() {
    let countDownDate = new Date('Jun 9, 2018 15:37:25').getTime();
    console.log('countDownDate', countDownDate);
    // Update the count down every 1 second
    let x = setInterval(() => {
      // Get todays date and time
      var now = new Date().getTime();
      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"

      var t = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

      //If the count down is over, write some text
      if (distance < 0) {
        clearInterval(x);
        //this.zone.run(() => {
        var t = 'EXPIRED';

        // });
      }
      this.updateText(t);
    }, 1000);
  }
}
