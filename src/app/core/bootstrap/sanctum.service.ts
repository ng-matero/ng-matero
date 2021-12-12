import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  load(): Promise<unknown> {
    return new Promise(resolve => this.toObservable().subscribe(resolve));
  }

  toObservable(): Observable<any> {
    return this.http.get(this.getUrl());
  }

  private getUrl(): string {
    const prefix = this.prefix || 'sanctum';
    const path = `/${prefix.replace(/^\/|\/$/g, '')}/csrf-cookie`;

    if (!this.baseUrl) {
      return path;
    }

    const url = new URL(this.baseUrl);

    return url.origin + path;
  }
}
