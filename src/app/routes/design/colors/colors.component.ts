import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
})
export class ColorsComponent implements OnInit {
  colors = {
    red: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#B71C1C',
      A100: '#FF8A80',
      A200: '#FF5252',
      A400: '#FF1744',
      A700: '#D50000',
      contrast: {
        50: 'dark',
        100: 'dark',
        200: 'dark',
        300: 'dark',
        400: 'light',
        500: 'light',
        600: 'light',
        700: 'light',
        800: 'light',
        900: 'light',
        A100: 'dark',
        A200: 'light',
        A400: 'light',
        A700: 'light',
      },
    },
  };

  valueAscOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return a.value.localeCompare(b.value);
  };

  keyDescOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return a.key > b.key ? -1 : b.key > a.key ? 1 : 0;
  };

  constructor() {}

  ngOnInit() {}
}
