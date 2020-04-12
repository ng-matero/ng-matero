import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MtxGridColumn } from '@ng-matero/extensions';
import { serialize } from '@shared';

const TAG = {
  true: { text: 'Yes', color: 'red-100' },
  false: { text: 'No', color: 'green-100' },
};

@Injectable()
export class TableAdvancedService {
  columns: MtxGridColumn[] = [
    {
      header: 'Name',
      field: 'name',
      formatter: (data: any) => `<a href="${data.html_url}" target="_blank">${data.name}</a>`,
    },
    { header: 'Owner', field: 'owner.login' },
    { header: 'Owner Avatar', field: 'owner.avatar_url', type: 'image' },
    { header: 'Description', field: 'description', width: '300px' },
    { header: 'stars', field: 'stargazers_count' },
    { header: 'forks', field: 'forks_count' },
    { header: 'Score', field: 'score' },
    { header: 'Issues', field: 'open_issues' },
    { header: 'Language', field: 'language' },
    { header: 'License', field: 'license.name' },
    { header: 'Home Page', field: 'homepage', type: 'link' },
    {
      header: 'Is forked',
      field: 'fork',
      formatter: (data: any) => JSON.stringify(data.fork),
    },
    { header: 'Archived', field: 'archived', type: 'tag', tag: TAG },
    { header: 'Created Date', field: 'created_at' },
    { header: 'Updated Date', field: 'updated_at' },
  ];

  constructor(private http: HttpClient) {}

  getData(query = {}) {
    return this.http.get('https://api.github.com/search/repositories?' + serialize(query));
  }
}
