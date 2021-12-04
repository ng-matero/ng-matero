import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../interceptors/base-url-interceptor';

export const SANCTUM_BASE_URL = new InjectionToken<string>('SANCTUM_BASE_URL', {
  providedIn: 'root',
  factory: () => '',
});
export const SANCTUM_PREFIX = new InjectionToken<string>('SANCTUM_PREFIX', {
  providedIn: 'root',
  factory: () => '',
});

@Injectable()
export class SanctumService {
  constructor(
    private http: HttpClient,
    @Inject(SANCTUM_BASE_URL) private baseUrl: string,
    @Inject(SANCTUM_PREFIX) private prefix: string
  ) {}

  load(): Promise<unknown> {
    return new Promise(resolve => this.toObservable().subscribe(resolve));
  }

  toObservable(): Observable<unknown> {
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
