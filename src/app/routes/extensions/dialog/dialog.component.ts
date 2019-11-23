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
    this.easyDialog.alert(`My name is Zongbin!`, () => {
      this.easyDialog.alert(`Glad to meet you!`);
    });
  }

  confirm() {
    this.easyDialog.confirm(
      `What's your name?`,
      () => {
        this.easyDialog.alert(`Hi, Zongbin!`);
      },
      () => {
        this.easyDialog.alert(`I don't know.`);
      }
    );
  }

  open() {
    this.easyDialog.open({
      title: 'This is the title',
      description: 'You can write some messages here.',
      buttons: [
        {
          type: '',
          text: 'Close',
          onClick: () => {
            this.easyDialog.alert(`You click Close button.`);
          },
        },
        {
          type: 'primary',
          text: 'View',
          onClick: () => {
            this.easyDialog.alert(`You click View button.`);
          },
        },
        {
          type: 'warn',
          text: 'Ok',
          onClick: () => {
            this.easyDialog.alert(`You click Ok button.`);
          },
        },
      ],
    });
  }
}
