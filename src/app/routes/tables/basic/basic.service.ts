import { Injectable } from '@angular/core';

import { MtxGridColumn } from '@ng-matero/extensions';

@Injectable()
export class TableBasicService {
  columns: MtxGridColumn[] = [
    {
      title: 'Select',
      index: 'select',
      type: 'checkbox',
      fixed: 'left',
      width: '30px',
      checked: true,
    },
    {
      title: 'Position',
      index: 'position',
      width: 'auto',
      sort: true,
      checked: true,
    },
    {
      title: 'Name',
      index: 'name',
      width: 'auto',
      sort: true,
      checked: true,
    },
    {
      title: 'Weight',
      index: 'weight',
      width: 'auto',
      checked: true,
    },
    {
      title: 'Symbol',
      index: 'symbol',
      width: 'auto',
      checked: true,
    },
    {
      title: 'Gender',
      index: 'gender',
      width: 'auto',
      checked: true,
    },
    {
      title: 'Mobile',
      index: 'mobile',
      width: 'auto',
      checked: false,
    },
    {
      title: 'Tele',
      index: 'tele',
      width: 'auto',
      checked: true,
    },
    {
      title: 'City',
      index: 'city',
      width: 'auto',
      checked: true,
    },
    {
      title: 'Address',
      index: 'address',
      width: '200px',
      checked: true,
    },
    {
      title: 'Date',
      index: 'date',
      width: 'auto',
      checked: true,
    },
    {
      title: 'Website',
      index: 'website',
      width: 'auto',
      checked: true,
    },
    {
      title: 'Company',
      index: 'company',
      width: 'auto',
      checked: true,
    },
    {
      title: 'Email',
      index: 'email',
      width: 'auto',
      checked: true,
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
      checked: true,
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
