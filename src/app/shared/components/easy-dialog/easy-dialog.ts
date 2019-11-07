import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EasyDialogComponent } from './easy-dialog.component';
import { DialogData } from './easy-dialog.config';

const defaults: DialogData = {
  width: '300px',
  title: '',
  description: '',
  disableClose: true,
  onOk: () => {},
  onCancel: () => {},
};

@Injectable({
  providedIn: 'root',
})
export class EasyDialog {
  constructor(public dialog: MatDialog) {}

  open(config: DialogData) {
    const data = Object.assign(defaults, config);

    this.dialog.open(EasyDialogComponent, {
      width: data.width,
      data,
    });
  }

  alert() {}

  confirm() {}
}
