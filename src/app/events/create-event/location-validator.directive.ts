import { Directive } from "@angular/core";
import { AbstractControl, FormGroup, Validator, NG_VALIDATORS } from "@angular/forms";

@Directive({
  selector: '[validateLocation]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LocationValidator,
    multi: true
  }]
})

// to include Validators for angular to pick up we need to include it as above in
// NG_VALIDATORS with multi: true, without multi it will override the existing validators,
// we just want to append to the list
export class LocationValidator implements Validator {
  validate(formGroup: FormGroup): { [key: string] : any } {
    let addressControl = formGroup.controls['address'];
    let cityControl = formGroup.controls['city'];
    let countryControl = formGroup.controls['country'];

    // need to go up to root and then get it, as it's a sibling to the controls where this validator is added
    let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'];

    if ((addressControl && addressControl.value && cityControl && cityControl.value &&
          countryControl && countryControl.value) || (onlineUrlControl && onlineUrlControl.value)) {
            return null;
    } else {
      return { validateLocation: false};
    }
  }
}
