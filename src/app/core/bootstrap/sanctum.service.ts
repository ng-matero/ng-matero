import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../interceptors/base-url-interceptor';

export const SANCTUM_PREFIX = new InjectionToken<string>('SANCTUM_PREFIX');

@Injectable({
  providedIn: 'root',
})
export class SanctumService {
  constructor(
    private http: HttpClient,
    @Optional() @Inject(BASE_URL) private baseUrl?: string,
    @Optional() @Inject(SANCTUM_PREFIX) private prefix?: string
  ) {}

  load() {
    return this.toObservable().toPromise();
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
