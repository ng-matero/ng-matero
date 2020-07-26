import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(private menu: MenuService, private http: HttpClient) {}

  load(): Promise<any> {
    return new Promise((resolve, reject) => {
      // add function or http calls toload that at the starting of the application
      resolve();
    });
  }
}
