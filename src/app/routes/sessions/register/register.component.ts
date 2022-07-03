import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  confirmValidator = (control: UntypedFormControl): { [k: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };

  registerForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [this.confirmValidator]],
  });

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit() {}
}
