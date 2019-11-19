import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { TableAdvancedService } from './advanced.service';
import { PageEvent } from '@angular/material';
import { delEmptyKey } from '@shared';

@Component({
  selector: 'app-tables-advanced',
  templateUrl: './advanced.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TableAdvancedService],
})
export class TablesAdvancedComponent implements OnInit {
  columns = [];
  list = [];
  total = 0;
  isLoading = true;

  query = {
    q: 'user:nzbin',
    sort: 'stars',
    order: 'desc',
    page: 0,
    per_page: 5,
  };

  get params() {
    const p = Object.assign({}, this.query);
    p.page += 1;
    return delEmptyKey(p);
  }

  constructor(private advancedSrv: TableAdvancedService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.columns = this.advancedSrv.columns;
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.advancedSrv.getData(this.params).subscribe((res: any) => {
      this.list = res.items;
      this.total = res.total_count;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  getNextPage(e: PageEvent) {
    this.query.page = e.pageIndex;
    this.query.per_page = e.pageSize;
    this.getData();
  }

  search() {
    this.query.page = 0;
    this.getData();
  }
}
