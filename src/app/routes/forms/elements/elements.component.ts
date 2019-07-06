import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-elements',
  templateUrl: './elements.component.html',
})
export class ElementsComponent implements OnInit {
  q = {
    username: '',
    email: '',
    gender: '',
  };

  reactiveForm1: FormGroup;
  reactiveForm2: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reactiveForm1 = fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      city: [''],
      address: [''],
      company: [''],
      mobile: [''],
      tele: [''],
      website: [''],
    });

    this.reactiveForm2 = fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      city: [''],
      address: [''],
      company: [''],
      mobile: [''],
      tele: [''],
      website: [''],
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
