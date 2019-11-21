import { Component } from '@angular/core';

import { EasyDialog } from '@shared';

@Component({
  selector: 'app-extensions-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ExtensionsDialogComponent {
  constructor(private easyDialog: EasyDialog) {}

  alert() {
    this.easyDialog.alert(`My name is Zongbin!`);
  }

  confirm() {
    this.easyDialog.confirm(`What's your name?`);
  }

  open() {
    this.easyDialog.open({
      width: '100vw',
      title: 'This is the title',
      description: 'You can write some messages here.',
      disableClose: false,
      buttons: [
        {
          type: '',
          text: '关闭',
          onClick: () => {},
        },
        {
          type: 'warn',
          text: '确定',
          onClick: () => {},
        },
      ],
    });
  }
}
