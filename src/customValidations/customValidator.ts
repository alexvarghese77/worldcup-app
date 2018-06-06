import { AbstractControl } from '@angular/forms';

export function ValidateEmail(control: AbstractControl) {
  console.log('validator called');

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(control.value.toLowerCase())) {
    return null;
  }
  return { validUrl: true };
}
