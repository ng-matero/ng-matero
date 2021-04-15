import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  // private menuReq$ = this.http.get('/me/menu');
  private menuReq$ = this.http.get('assets/data/menu.json?_t=' + Date.now());

  constructor(private token: TokenService, private menu: MenuService, private http: HttpClient) {}

  /** Load the application only after get the menu or other essential informations such as roles and permissions. */
  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.token
        .change()
        .pipe(
          switchMap(() => iif(() => this.token.valid(), this.menuReq$, of({ menu: [] }))),
          catchError(error => throwError(error))
        )
        .subscribe((response: any) => {
          this.menu.addNamespace(response.menu, 'menu');
          this.menu.set(response.menu);

          resolve(null);
        });
    });
  }
}
