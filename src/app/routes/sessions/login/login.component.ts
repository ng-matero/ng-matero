import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { AuthService } from '@core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private startup: StartupService,
    private auth: AuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember_me: [''],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('remember_me');
  }

  login() {
    this.auth.login(this.username.value, this.password.value, this.rememberMe.value).subscribe(authenticated => {
      if (authenticated) {
        // Regain the initial data
        this.startup.load().then(() => {
          this.router.navigateByUrl('/');
        });
      }
    }, (error) => {
      if (error.status === 422) {
        const errors = error.body.errors;
        const form = this.loginForm;
        Object.keys(errors).forEach(key => form.get(key)?.setErrors(errors[key][0]));
      }
    });
  }
}
