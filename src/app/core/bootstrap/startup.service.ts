import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { TokenService } from '../authentication/token.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private menuReq$ = this.http.get('/me/menu');

  constructor(private token: TokenService, private menu: MenuService, private http: HttpClient) {}

  load(): Promise<any> {
    this.token
      .change()
      .pipe(switchMap(() => iif(() => this.token.valid(), this.menuReq$, of({ menu: [] }))))
      .subscribe((response: any) => {
        this.menu.addNamespace(response.menu, 'menu');
        this.menu.set(response.menu);
      });

    return Promise.resolve();
  }
}
