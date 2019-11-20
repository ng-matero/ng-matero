import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EasyColumn } from './easy-table.interface';
import { EasyDialog } from '../easy-dialog/easy-dialog';
import PhotoViewer from 'photoviewer';

@Component({
  selector: 'easy-table-cell',
  templateUrl: './easy-table-cell.component.html',
})
export class EasyTableCellComponent implements OnInit {
  @Input() data = {}; // cell data
  @Input() cell: EasyColumn; // td

  cellValue = '';

  constructor(private easyDialog: EasyDialog) {}

  private str2arr(str: string) {
    return str.replace(/[\r\n\s]/g, '').split(',');
  }

  private getObjValue(obj: {}, keyArr: string[]) {
    let tmp = '';
    keyArr.forEach((key, i) => {
      if (i === 0) {
        tmp = obj[key];
      } else {
        tmp = tmp && tmp[key];
      }
    });
    return tmp;
  }

  ngOnInit() {
    this.cellValue = this.getObjValue(this.data, this.cell.index.split('.'));
  }

  fnCall(fn?: (p: any) => void, data?: any) {
    return fn(data);
  }

  confirm(title: string, fn?: (p: any) => void, data?: any) {
    this.easyDialog.confirm(title, () => {
      fn(data);
    });
  }

  // Preview the image
  preview(urlStr: string, multi = false) {
    const imgs = [];

    let options: PhotoViewer.Options = {};

    if (multi) {
      this.str2arr(urlStr).forEach((url, index) => {
        imgs.push({
          title: index + 1,
          src: url,
        });
      });
    } else {
      this.str2arr(urlStr).forEach((url, index) => {
        imgs.push({
          src: url,
        });
      });

      options = {
        title: false,
        footToolbar: ['zoomIn', 'zoomOut', 'rotateRight', 'rotateLeft', 'actualSize'],
      };
    }

    const viewer = new PhotoViewer(imgs, options);
  }
}
