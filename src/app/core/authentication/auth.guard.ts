import { Injectable, Inject, Optional } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlSegment,
  Router,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { TokenService } from './token.service';

const LOGIN_URL = '/auth/login';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  private gotoLogin(url?: string) {
    setTimeout(() => {
      if (/^https?:\/\//g.test(url!)) {
        this.document.location.href = url as string;
      } else {
        this.router.navigateByUrl(url);
      }
    });
  }

  private checkJWT(model: any, offset?: number): boolean {
    return !!model?.token;
  }

  private process(): boolean {
    const res = this.checkJWT(this.token.get<any>(), 1000);
    if (!res) {
      this.gotoLogin(LOGIN_URL);
    }
    return res;
  }

  constructor(
    private router: Router,
    private token: TokenService,
    @Optional() @Inject(DOCUMENT) private document: any
  ) {}

  // lazy loading
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.process();
  }
  // route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.process();
  }
  // all children route
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.process();
  }
}
