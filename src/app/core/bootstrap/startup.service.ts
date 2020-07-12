import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private _menu: MenuService, private _http: HttpClient) {}

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._http
        .get('assets/data/menu.json?_t=' + Date.now())
        .pipe(
          catchError(res => {
            resolve();
            return throwError(res);
          })
        )
        .subscribe(
          (res: any) => {
            this._menu.recursMenuForTranslation(res.menu, 'menu');
            this._menu.set(res.menu);
          },
          () => {
            reject();
          },
          () => {
            resolve();
          }
        );
    });
  }
}
