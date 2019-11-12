import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import { EasyColumn } from './easy-table.interface';

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
  @Input() pageIndex = 1;
  @Input() pageSize = 100;
  @Output() page = new EventEmitter<any>();

  displayedColumns: string[];

  constructor() {}

  ngOnInit() {
    this.displayedColumns = this.columns.map(item => item.index);
  }
}
