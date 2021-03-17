import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { AuthService } from '../authentication/auth.service';
import { TokenService } from '@core/authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private token: TokenService, private menu: MenuService, private http: HttpClient) {}

  load(): Promise<any> {
    return new Promise(resolve => {
      const menu$ = this.http.get('/me/menu');
      this.token
        .change()
        .pipe(switchMap(() => iif(() => this.token.valid(), menu$, of({ menu: [] }))))
        .subscribe((response: any) => {
          this.menu.recursMenuForTranslation(response.menu, 'menu');
          this.menu.set(response.menu);
        });
      resolve(null);
    });
  }
}
