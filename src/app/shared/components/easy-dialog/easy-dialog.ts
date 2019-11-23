import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EasyDialogComponent } from './easy-dialog.component';
import { DialogData } from './easy-dialog.config';

const defaults: DialogData = {
  title: '',
  description: '',
  buttons: [
    {
      type: '',
      text: 'Close',
      onClick: () => {},
    },
    {
      type: 'warn',
      text: 'Ok',
      onClick: () => {},
    },
  ],
  disableClose: true,
  width: '300px',
};

@Injectable({
  providedIn: 'root',
})
export class EasyDialog {
  constructor(public dialog: MatDialog) {}

  open(config: DialogData) {
    const data = Object.assign({}, defaults, config);

    this.dialog.open(EasyDialogComponent, {
      ...data,
      data,
    });
  }

  alert(title: string, onOk = () => {}) {
    this.open({
      title,
      buttons: [
        {
          type: 'warn',
          text: 'Ok',
          onClick: () => {
            onOk();
          },
        },
      ],
    });
  }

  confirm(title: string, onOk = () => {}, onClose = () => {}) {
    this.open({
      title,
      buttons: [
        {
          type: '',
          text: 'Close',
          onClick: () => {
            onClose();
          },
        },
        {
          type: 'warn',
          text: 'Ok',
          onClick: () => {
            onOk();
          },
        },
      ],
    });
  }
}
