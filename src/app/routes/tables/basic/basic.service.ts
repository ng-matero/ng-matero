import { Injectable } from '@angular/core';

@Injectable()
export class TableBasicService {
  columns: any = [
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
    {
      title: 'Options',
      index: 'options',
      width: 'auto',
      type: 'button',
      fixed: 'right',
    },
  ];
}
