/**
 * Title: validators/custom-validator.ts
 * Author: Nathaniel Liebhart
 * Description: custom validators
 */
import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, switchMapTo, tap, map } from 'rxjs/operators';

export class CustomValidators {
  static usernameValidator(service: AuthService) {
    return (control: AbstractControl): Observable<null | ValidationErrors> => {
      if (!control.valueChanges || control.pristine) {
        return of(null);
      } else {
        return control.valueChanges.pipe(
          debounceTime(700),
          distinctUntilChanged(),
          take(1),
          switchMapTo(service.checkIfUsernameExistsObservable(control.value)),
          tap(() => control.markAsTouched()),
          map((data) => (data ? null : { userExists: true }))
        );
      }
    };
  }
}
