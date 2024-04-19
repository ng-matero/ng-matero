import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { BASE_URL } from '../interceptors/base-url-interceptor';

export const SANCTUM_PREFIX = new InjectionToken<string>('SANCTUM_PREFIX');

@Injectable({
  providedIn: 'root',
})
export class SanctumService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL, { optional: true });
  private readonly prefix = inject(SANCTUM_PREFIX, { optional: true });

  load() {
    return new Promise(resolve => this.toObservable().subscribe(resolve));
  }

  toObservable() {
    return this.http.get(this.getUrl());
  }

  private getUrl() {
    const prefix = this.prefix || 'sanctum';
    const path = `/${prefix.replace(/^\/|\/$/g, '')}/csrf-cookie`;

    if (!this.baseUrl) {
      return path;
    }

    const url = new URL(this.baseUrl);

    return url.origin + path;
  }
}
