import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms-elements',
  templateUrl: './elements.component.html',
})
export class FormsElementsComponent implements OnInit {
  q = {
    username: '',
    email: '',
    gender: '',
  };

  reactiveForm1: FormGroup;
  reactiveForm2: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reactiveForm1 = this.fb.group({
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

    this.reactiveForm2 = this.fb.group({
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
