import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface RepoSearchList {
  incomplete_results: boolean;
  items: any[];
  total_count: number;
}

@Injectable({
  providedIn: 'root',
})
export class TablesRemoteDataService {
  private http = inject(HttpClient);

  getList(params = {}): Observable<RepoSearchList> {
    return this.http.get<RepoSearchList>('https://api.github.com/search/repositories', { params });
  }
}
