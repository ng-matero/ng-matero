import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EasyColumn, UTILS } from '@shared';

@Injectable()
export class TableAdvancedService {
  columns: EasyColumn[] = [
    {
      title: 'Name',
      index: 'name',
    },
    // {
    //   title: 'Owner',
    //   index: 'owner',
    // },
    // {
    //   title: 'Is Forked',
    //   index: 'fork',
    // },
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
      title: 'Language',
      index: 'language',
    },
    {
      title: 'Link',
      index: 'html_url',
    },
    {
      title: 'Created Date',
      index: 'created_at',
    },
  ];

  constructor(private http: HttpClient) {}

  getData(query = {}) {
    return this.http.get('https://api.github.com/search/repositories?' + UTILS.serialize(query));
  }
}
