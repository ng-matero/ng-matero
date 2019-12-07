import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GridColumn } from '@ng-matero/extensions';
import { serialize } from '@shared';

const TAG = {
  true: { text: 'Yes', color: 'red-100' },
  false: { text: 'No', color: 'green-100' },
};

@Injectable()
export class TableAdvancedService {
  columns: GridColumn[] = [
    {
      title: 'Name',
      index: 'name',
      type: 'format',
      format: (data: any) => {
        return `<a href="${data.html_url}" target="_blank">${data.name}</a>`;
      },
    },
    {
      title: 'Owner',
      index: 'owner.login',
    },
    {
      title: 'Owner Avatar',
      index: 'owner.avatar_url',
      type: 'img',
    },
    {
      title: 'Description',
      index: 'description',
      width: '300px',
    },
    {
      title: 'stars',
      index: 'stargazers_count',
    },
    {
      title: 'forks',
      index: 'forks_count',
    },
    {
      title: 'Score',
      index: 'score',
    },
    {
      title: 'Issues',
      index: 'open_issues',
    },
    {
      title: 'Language',
      index: 'language',
    },
    {
      title: 'License',
      index: 'license.name',
    },
    {
      title: 'Home Page',
      index: 'homepage',
      type: 'link',
    },
    {
      title: 'Is forked',
      index: 'fork',
      type: 'format',
      format: (data: any) => {
        return JSON.stringify(data.fork);
      },
    },
    {
      title: 'Archived',
      index: 'archived',
      type: 'tag',
      tag: TAG,
    },
    {
      title: 'Created Date',
      index: 'created_at',
    },
    {
      title: 'Updated Date',
      index: 'updated_at',
    },
  ];

  constructor(private http: HttpClient) {}

  getData(query = {}) {
    return this.http.get('https://api.github.com/search/repositories?' + serialize(query));
  }
}
