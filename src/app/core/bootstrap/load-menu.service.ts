import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class LoadMenuService {
  constructor(private menu: MenuService, private http: HttpClient) {}

  load() {
    return this.http
      .get('assets/data/menu.json?_t=' + Date.now())
      .pipe(
        catchError(res => {
          return throwError(res);
        })
      )
      .subscribe(
        (res: any) => {
          this.menu.recursMenuForTranslation(res.menu, 'menu');
          this.menu.set(res.menu);
        },
        () => {},
        () => {}
      );
  }
}
