import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { finalize } from 'rxjs';
import { TablesRemoteDataService } from './remote-data.service';

@Component({
  selector: 'app-tables-remote-data',
  templateUrl: './remote-data.component.html',
  styleUrls: ['./remote-data.component.scss'],
  providers: [TablesRemoteDataService],
})
export class TablesRemoteDataComponent implements OnInit {
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
        true: { text: 'Yes', color: 'red-100' },
        false: { text: 'No', color: 'green-100' },
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

  constructor(private remoteSrv: TablesRemoteDataService) {}

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
