import { Injectable } from '@angular/core';

import { MtxGridColumn } from '@ng-matero/extensions';

@Injectable()
export class TableBasicService {
  columns: MtxGridColumn[] = [
    { header: 'Position', field: 'position', sortable: true },
    { header: 'Name', field: 'name', sortable: true },
    { header: 'Weight', field: 'weight' },
    { header: 'Symbol', field: 'symbol' },
    { header: 'Gender', field: 'gender' },
    { header: 'Mobile', field: 'mobile' },
    { header: 'Tele', field: 'tele' },
    { header: 'City', field: 'city' },
    { header: 'Address', field: 'address', width: '200px' },
    { header: 'Date', field: 'date' },
    { header: 'Website', field: 'website' },
    { header: 'Company', field: 'company' },
    { header: 'Email', field: 'email' },
  ];

  getColumns(fn1: (record: any) => void, fn2: (record: any) => void) {
    this.columns.push({
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
          click: fn1,
        },
        {
          icon: 'delete',
          tooltip: 'Delete',
          color: 'warn',
          type: 'icon',
          pop: true,
          popTitle: 'Confirm delete?',
          click: fn2,
        },
      ],
    });
    return this.columns;
  }

  constructor() {}
}
