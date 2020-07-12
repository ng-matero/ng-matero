import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService, StartupService, SettingsService } from '@core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _token: TokenService,
    private _startup: StartupService,
    private _settings: SettingsService
  ) {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required, Validators.pattern('ng-matero')]],
      password: ['', [Validators.required, Validators.pattern('ng-matero')]],
    });
  }

  ngOnInit() {}

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    const { token, username, uid } = { token: 'ng-matero-token', uid: 1, username: 'ng-matero' };
    // Set user info
    this._settings.setUser({ id: uid, name: username, avatar: '' });
    // Set token info
    this._token.set({ token, uid, username });
    // Regain the initial data
    this._startup.load().then(() => {
      let url = this._token.referrer!.url || '/';
      if (url.includes('/auth')) {
        url = '/';
      }
      this._router.navigateByUrl(url);
    });
  }
}
