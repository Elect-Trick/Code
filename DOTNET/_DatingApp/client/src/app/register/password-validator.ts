import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class PasswordValidator {
 static passwordMatchingValidatior: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirm');

    // console.log('Mactching',{notMatched: true});
    return password?.value === confirmPassword?.value
      ? null
      : {notmatched: true} ;
  };
}
