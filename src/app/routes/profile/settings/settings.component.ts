import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
})
export class ProfileSettingsComponent implements OnInit {
  reactiveForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      company: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      tele: ['', [Validators.required]],
      website: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  getErrorMessage(form: UntypedFormGroup) {
    return form.get('email')?.hasError('required')
      ? 'You must enter a value'
      : form.get('email')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
