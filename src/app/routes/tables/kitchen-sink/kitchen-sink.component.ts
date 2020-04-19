import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { MtxDialog } from '@ng-matero/extensions/dialog';

import { TablesKitchenSinkService } from './kitchen-sink.service';
import { TablesDataService } from '../data.service';
import { TablesKitchenSinkEditComponent } from './edit/edit.component';
import { MtxGridColumn } from '@ng-matero/extensions';

@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss'],
  providers: [TablesKitchenSinkService, TablesDataService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesKitchenSinkComponent implements OnInit {
  columns: MtxGridColumn[] = [
    { header: 'Position', field: 'position', sortable: true },
    { header: 'Name', field: 'name', sortable: true, disabled: true },
    { header: 'Weight', field: 'weight' },
    { header: 'Symbol', field: 'symbol' },
    { header: 'Gender', field: 'gender' },
    { header: 'Mobile', field: 'mobile', hide: true },
    { header: 'Tele', field: 'tele' },
    { header: 'City', field: 'city' },
    { header: 'Address', field: 'address', width: '200px' },
    { header: 'Date', field: 'date' },
    { header: 'Website', field: 'website' },
    { header: 'Company', field: 'company' },
    { header: 'Email', field: 'email' },
    {
      header: 'Option',
      field: 'option',
      width: '120px',
      pinned: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          icon: 'edit',
          tooltip: 'Edit',
          type: 'icon',
          click: record => this.edit(record),
        },
        {
          icon: 'delete',
          tooltip: 'Delete',
          color: 'warn',
          type: 'icon',
          pop: true,
          popTitle: 'Confirm delete?',
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
    private kitchenSrv: TablesKitchenSinkService,
    private dataSrv: TablesDataService,
    private cdr: ChangeDetectorRef,
    public dialog: MtxDialog
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
}
