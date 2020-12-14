import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions';

import { TablesDataService } from '../data.service';
import { TablesKitchenSinkEditComponent } from './edit/edit.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss'],
  providers: [TablesDataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesKitchenSinkComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('table_kitchen_sink.position'),
      field: 'position',
      sortable: true,
    },
    {
      header: this.translate.stream('table_kitchen_sink.name'),
      field: 'name',
      sortable: true,
      disabled: true,
    },
    { header: this.translate.stream('table_kitchen_sink.weight'), field: 'weight' },
    { header: this.translate.stream('table_kitchen_sink.symbol'), field: 'symbol' },
    { header: this.translate.stream('table_kitchen_sink.gender'), field: 'gender' },
    { header: this.translate.stream('table_kitchen_sink.mobile'), field: 'mobile', hide: true },
    { header: this.translate.stream('table_kitchen_sink.tele'), field: 'tele', width: '120px' },
    { header: this.translate.stream('table_kitchen_sink.birthday'), field: 'birthday' },
    { header: this.translate.stream('table_kitchen_sink.city'), field: 'city' },
    {
      header: this.translate.stream('table_kitchen_sink.address'),
      field: 'address',
      width: '200px',
    },
    { header: this.translate.stream('table_kitchen_sink.company'), field: 'company' },
    { header: this.translate.stream('table_kitchen_sink.website'), field: 'website' },
    { header: this.translate.stream('table_kitchen_sink.email'), field: 'email' },
    {
      header: this.translate.stream('table_kitchen_sink.operation'),
      field: 'operation',
      width: '120px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('table_kitchen_sink.edit'),
          click: record => this.edit(record),
        },
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('table_kitchen_sink.delete'),
          tooltip: this.translate.stream('table_kitchen_sink.delete'),
          pop: true,
          popTitle: this.translate.stream('table_kitchen_sink.confirm_delete'),
          popCloseText: this.translate.stream('table_kitchen_sink.close'),
          popOkText: this.translate.stream('table_kitchen_sink.ok'),
          click: record => this.delete(record),
        },
      ],
    },
  ];
  list = [];
  isLoading = true;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnMovable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;

  constructor(
    private translate: TranslateService,
    private dataSrv: TablesDataService,
    public dialog: MtxDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.list = this.dataSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
