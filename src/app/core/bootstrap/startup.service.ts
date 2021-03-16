import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iif, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private injector: Injector, private menu: MenuService, private http: HttpClient) {}

  load(): Promise<any> {
    return new Promise((resolve) => {
      const menu$ = this.http.get('assets/data/menu.json?_t=' + Date.now());
      this.injector.get(AuthService).user().pipe(
        switchMap(user => iif(() => user.id === 0, of({ menu: [] }), menu$)),
      ).subscribe({
        next: (response: any) => {
          this.menu.recursMenuForTranslation(response.menu, 'menu');
          this.menu.set(response.menu);
        },
      });
      resolve(null);
    });
  }
}
