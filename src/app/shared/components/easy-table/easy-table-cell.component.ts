import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EasyColumn, Cell } from './easy-table.interface';
import { EasyDialog } from '../easy-dialog/easy-dialog';
import PhotoViewer from 'photoviewer';

@Component({
  selector: 'easy-table-cell',
  templateUrl: './easy-table-cell.component.html',
})
export class EasyTableCellComponent implements OnInit {
  @Input() data = {}; // 表格数据
  @Input() cell: EasyColumn; // td

  constructor(private easyDialog: EasyDialog) {}

  private str2arr(str: string) {
    return str.replace(/[\r\n\s]/g, '').split(',');
  }

  ngOnInit() {}

  fnCall(fn?: (p: any) => void, data?: any) {
    return fn(data);
  }

  // 确认操作
  confirm(title: string, fn?: (p: any) => void, data?: any) {
    this.easyDialog.confirm(title, () => {
      fn(data);
    });
  }

  // 预览表格内图片
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
