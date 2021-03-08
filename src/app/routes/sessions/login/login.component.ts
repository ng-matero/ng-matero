import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, StartupService, TokenService } from '@core';
import { AuthService } from '@core/authentication2/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private token: TokenService,
    private startup: StartupService,
    private settings: SettingsService,
    private auth: AuthService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('ng-matero')]],
      password: ['', [Validators.required, Validators.pattern('ng-matero')]],
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
          let url = this.token.referrer!.url || '/';
          if (url.includes('/auth')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      }
    });
  }
}
