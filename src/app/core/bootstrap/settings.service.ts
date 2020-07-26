import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppSettings, defaults } from '../settings';
import { LocalStorageService } from '@shared/services/storage.service';

export const USER_KEY = 'usr';

export interface User {
  name: string;
  id: number;
  avatar: string;
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private options = defaults;

  get notify(): Observable<any> {
    return this.notify$.asObservable();
  }
  private notify$ = new BehaviorSubject<any>({});

  get user() {
    return this.store.get(USER_KEY);
  }

  get language() {
    return this.options.language;
  }

  constructor(private store: LocalStorageService) {}

  setLayout(options?: AppSettings): AppSettings {
    this.options = Object.assign(defaults, options);
    return this.options;
  }

  setNavState(type: string, value: boolean) {
    this.notify$.next({ type, value } as any);
  }

  getOptions(): AppSettings {
    return this.options;
  }

  setUser(value: User) {
    this.store.set(USER_KEY, value);
  }

  removeUser() {
    this.store.remove(USER_KEY);
  }

  setLanguage(lang: string) {
    this.options.language = lang;
    this.notify$.next({ lang });
  }
}
