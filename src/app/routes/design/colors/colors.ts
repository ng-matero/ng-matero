import { KeyValue, KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { M3_COLORS } from '@shared';

@Component({
  selector: 'app-design-colors',
  templateUrl: './colors.html',
  styleUrl: './colors.scss',
  imports: [KeyValuePipe],
})
export class DesignColors implements OnInit {
  colors: { key: string; value: any }[] = [];

  valueAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return a.value.localeCompare(b.value);
  }

  keyAscOrder(a: KeyValue<number, string>, b: KeyValue<number, string>): number {
    return a.key - b.key;
  }

  ngOnInit() {
    const colors: Record<string, any> = M3_COLORS;
    for (const key of Object.keys(colors)) {
      this.colors.push({
        key,
        value: colors[key],
      });
    }
  }

  trackByColor(index: number, color: { key: string; value: any }): string {
    return color.key;
  }
}
