import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.firstName = new FormControl(this.authService.currentUser?.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);  // need to match FormControlName property in html. 1st param is the default value, 2nd param is validators
    this.lastName = new FormControl(this.authService.currentUser?.lastName, Validators.required); // need to match FormControlName property in html. 1st param is the default value, 2nd param is validators

    // add controls to formGroup, need to have [FormGroup] in <form> element.
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  cancel() {
    this.router.navigate(['events']);
  }

  saveProfile(formValues) {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
      this.router.navigate(['events']);
    }
  }

  validateFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }
}
