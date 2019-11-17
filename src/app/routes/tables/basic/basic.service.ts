import { Injectable } from '@angular/core';
import { EasyColumn } from '@shared';

const columns: EasyColumn[] = [
  {
    title: 'Position',
    index: 'position',
    width: 'auto',
    fixed: 'left',
  },
  {
    title: 'Name',
    index: 'name',
    width: 'auto',
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

@Injectable()
export class TableBasicService {
  constructor() {}

  getColumns(fn1: (record: any) => void, fn2: (record: any) => void) {
    columns.push({
      title: 'Option',
      index: 'option',
      width: '120px',
      fixed: 'right',
      right: '0px',
      type: 'button',
      buttons: [
        {
          text: 'Edit',
          icon: 'edit',
          type: 'link',
          click: fn1,
        },
        {
          text: 'Delete',
          icon: 'delete',
          type: 'link',
          pop: true,
          popTitle: 'Confirm delete?',
          click: fn2,
        },
      ],
    });
    return columns;
  }
}
