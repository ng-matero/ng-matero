import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
})
export class ProfileSettingsComponent implements OnInit {
  reactiveForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'You must enter a value'
      : form.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
