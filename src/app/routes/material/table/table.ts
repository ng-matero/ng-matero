import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { Breadcrumb } from '@shared';

export interface UserData {
  name: string;
  color: string;
  age: number;
}

const exampleData = [
  { name: 'Austin', color: 'blue', age: 30 },
  { name: 'Jeremy', color: 'green', age: 33 },
  { name: 'Kara', color: 'purple', age: 29 },
  { name: 'Tina', color: 'yellow', age: 35 },
  { name: 'Brad', color: 'pink', age: 40 },
  { name: 'Jules', color: 'red', age: 21 },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
  styleUrl: './table.scss',
  imports: [
    Breadcrumb,
    CdkTableModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class TableDemo implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) pager!: MatPaginator;

  displayedColumns = ['name', 'color', 'age'];
  basicDataSource!: BasicDataSource;
  sortDataSource!: SortDataSource;
  paginatedDataSource!: PaginatedDataSource;

  ngOnInit(): void {
    this.basicDataSource = new BasicDataSource();
    this.sortDataSource = new SortDataSource(this.sort);
    this.paginatedDataSource = new PaginatedDataSource(this.pager);
  }
}

export class BasicDataSource extends DataSource<UserData> {
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

  constructor() {
    super();
    this.dataChange.next(exampleData);
  }

  connect(): Observable<UserData[]> {
    return this.dataChange;
  }

  disconnect() {}
}

export class SortDataSource extends DataSource<UserData> {
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

  constructor(private sort: MatSort) {
    super();
    this.dataChange.next(exampleData);
  }

  connect(): Observable<UserData[]> {
    const displayDataChanges = [this.dataChange, this.sort.sortChange];

    return merge(...displayDataChanges).pipe(map(() => this.getSortedData()));
  }

  disconnect() {}

  getSortedData(): UserData[] {
    const data = [...exampleData];
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a: UserData, b: UserData) => {
      return (a.age < b.age ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }
}

export class PaginatedDataSource extends DataSource<UserData> {
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

  constructor(private paginator: MatPaginator) {
    super();
    this.dataChange.next(exampleData);
  }

  connect(): Observable<UserData[]> {
    const displayDataChanges = [this.dataChange, this.paginator.page];

    return merge(...displayDataChanges).pipe(
      map(() => {
        const data = [...exampleData];
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
      })
    );
  }

  disconnect() {}
}
