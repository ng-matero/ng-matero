import { Component } from '@angular/core';

import { MtxDialog } from '@ng-matero/extensions/dialog';

@Component({
  selector: 'app-extensions-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ExtensionsDialogComponent {
  constructor(private dialog: MtxDialog) {}

  alert() {
    this.dialog.alert(`My name is Zongbin!`, () => {
      this.dialog.alert(`Glad to meet you!`);
    });
  }

  confirm() {
    this.dialog.confirm(
      `What's your name?`,
      () => {
        this.dialog.alert(`Hi, Zongbin!`);
      },
      () => {
        this.dialog.alert(`I don't know.`);
      }
    );
  }

  open() {
    this.dialog.open({
      title: 'This is the title',
      description: 'You can write some messages here.',
      buttons: [
        {
          type: '',
          text: 'Close',
          onClick: () => {
            this.dialog.alert(`You click Close button.`);
          },
        },
        {
          type: 'primary',
          text: 'View',
          onClick: () => {
            this.dialog.alert(`You click View button.`);
          },
        },
        {
          type: 'warn',
          text: 'Ok',
          onClick: () => {
            this.dialog.alert(`You click Ok button.`);
          },
        },
      ],
    });
  }
}
