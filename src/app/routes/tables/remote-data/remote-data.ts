import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { finalize } from 'rxjs';

import { PageHeader } from '@shared';
import { TablesRemoteDataService } from './remote-data.service';

@Component({
  selector: 'app-tables-remote-data',
  templateUrl: './remote-data.html',
  styleUrl: './remote-data.scss',
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MtxGridModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    PageHeader,
  ],
})
export class TablesRemoteData implements OnInit {
  private readonly remoteSrv = inject(TablesRemoteDataService);

  columns: MtxGridColumn[] = [
    {
      header: 'Name',
      field: 'name',
      formatter: (data: any) => `<a href="${data.html_url}" target="_blank">${data.name}</a>`,
    },
    { header: 'Owner', field: 'owner.login' },
    { header: 'Owner Avatar', field: 'owner.avatar_url', type: 'image' },
    { header: 'Description', field: 'description', width: '300px' },
    { header: 'Stars', field: 'stargazers_count', type: 'number' },
    { header: 'Forks', field: 'forks_count', type: 'number' },
    { header: 'Score', field: 'score', type: 'number' },
    { header: 'Issues', field: 'open_issues', type: 'number' },
    { header: 'Language', field: 'language' },
    { header: 'License', field: 'license.name' },
    { header: 'Home Page', field: 'homepage', type: 'link' },
    { header: 'Is forked', field: 'fork', type: 'boolean' },
    {
      header: 'Archived',
      field: 'archived',
      type: 'tag',
      tag: {
        true: { text: 'Yes', color: 'red-95' },
        false: { text: 'No', color: 'green-95' },
      },
    },
    { header: 'Created Date', field: 'created_at' },
    { header: 'Updated Date', field: 'updated_at' },
  ];
  list: any[] = [];
  total = 0;
  isLoading = true;

  query = {
    q: 'user:nzbin',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 10,
  };

  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return p;
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.isLoading = true;

    this.remoteSrv
      .getList(this.params)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(res => {
        this.list = res.items;
        this.total = res.total_count;
        this.isLoading = false;
      });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.per_page = e.pageSize;
    this.getList();
  }

  search() {
    this.query.page = 0;
    this.getList();
  }

  reset() {
    this.query.page = 0;
    this.query.per_page = 10;
    this.getList();
  }
}
