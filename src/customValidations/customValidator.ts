import { AbstractControl, FormGroup } from '@angular/forms';

export function ValidateEmail(control: AbstractControl) {
  console.log('validator called');

  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(control.value.toLowerCase())) {
    return null;
  }
  return { validUrl: true };
}

export function ValidateName(control: AbstractControl) {
  console.log('validator called');

  var re = /^[a-zA-Z ]{4,30}$/;
  if (re.test(control.value.toLowerCase())) {
    return null;
  }
  return { validUrl: true };
}
export function ValidateMobile(control: AbstractControl) {
  var re = /^[\d*]{10,15}$/;
  if (re.test(control.value.toLowerCase())) {
    return null;
  }
  return { validUrl: true };
}
export function ValidateEmpNum(control: AbstractControl) {
  var re = /^[\d*]{6,7}$/;
  if (re.test(control.value.toLowerCase())) {
    return null;
  }
  return { validUrl: true };
}

export function passwordValidator(control: AbstractControl) {
  if (control.get('password').value === control.get('cpassword').value) {
    return { invalid: true };
  }
  return { validUrl: true };
}
