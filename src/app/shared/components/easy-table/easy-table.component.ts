import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { EasyColumn } from './easy-table.interface';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PeriodicElement } from 'app/routes/dashboard/dashboard.component';

@Component({
  selector: 'easy-table',
  templateUrl: './easy-table.component.html',
  styleUrls: ['./easy-table.component.scss'],
  host: {
    class: 'matero-easy-table',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EasyTableComponent implements OnInit {
  @Input() columns: EasyColumn[] = [];
  @Input() data = [];
  @Input() sum = [];
  @Input() total = 0;
  @Input() loading = true;
  @Input() tooltip = true; // 是否显示字段提示

  @Input() front = true; // 是否前端分页
  @Input() sizeChanger = true;
  @Input() pageIndex = 0;
  @Input() pageSize = 100;
  @Output() page = new EventEmitter<any>();

  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = this.columns.map(item => item.index);
  }
}
