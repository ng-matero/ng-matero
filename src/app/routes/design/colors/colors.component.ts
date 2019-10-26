import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';

import { DesignColorsService } from './colors.service';
import { MAT_COLORS } from '@shared';

@Component({
  selector: 'app-design-colors',
  templateUrl: './colors.component.html',
  providers: [DesignColorsService],
})
export class DesignColorsComponent implements OnInit {
  colorsArr = [];

  valueAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    console.log(a.value);
    return a.value.localeCompare(b.value);
  }

  keyAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return a.key - b.key;
  }

  constructor(private colorsService: DesignColorsService) {}

  ngOnInit() {
    const colors = MAT_COLORS;
    for (const key of Object.keys(colors)) {
      this.colorsArr.push({
        key,
        value: colors[key],
      });
    }
  }
}
