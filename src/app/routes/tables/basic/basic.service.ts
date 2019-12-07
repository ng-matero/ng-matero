import { Injectable } from '@angular/core';

import { GridColumn } from '@ng-matero/extensions';

@Injectable()
export class TableBasicService {
  columns: GridColumn[] = [
    {
      title: 'Select',
      index: 'select',
      type: 'checkbox',
      fixed: 'left',
      width: '30px',
    },
    {
      title: 'Position',
      index: 'position',
      width: 'auto',
      sort: true,
    },
    {
      title: 'Name',
      index: 'name',
      width: 'auto',
      sort: true,
    },
    {
      title: 'Weight',
      index: 'weight',
      width: 'auto',
    },
    {
      title: 'Symbol',
      index: 'symbol',
      width: 'auto',
    },
    {
      title: 'Gender',
      index: 'gender',
      width: 'auto',
    },
    {
      title: 'Mobile',
      index: 'mobile',
      width: 'auto',
    },
    {
      title: 'Tele',
      index: 'tele',
      width: 'auto',
    },
    {
      title: 'City',
      index: 'city',
      width: 'auto',
    },
    {
      title: 'Address',
      index: 'address',
      width: '200px',
    },
    {
      title: 'Date',
      index: 'date',
      width: 'auto',
    },
    {
      title: 'Website',
      index: 'website',
      width: 'auto',
    },
    {
      title: 'Company',
      index: 'company',
      width: 'auto',
    },
    {
      title: 'Email',
      index: 'email',
      width: 'auto',
    },
  ];

  getColumns(fn1: (record: any) => void, fn2: (record: any) => void) {
    this.columns.push({
      title: 'Option',
      index: 'option',
      width: '80px',
      fixed: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          icon: 'edit',
          tooltip: 'Edit',
          type: 'link',
          click: fn1,
        },
        {
          icon: 'delete',
          tooltip: 'Delete',
          color: 'warn',
          type: 'link',
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
