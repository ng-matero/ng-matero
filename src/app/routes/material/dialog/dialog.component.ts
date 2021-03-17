import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  fruitSelectedOption = '';

  constructor(public dialog: MatDialog) {}

  openFruitDialog() {
    const dialogRef = this.dialog.open(DialogFruitComponent);
    dialogRef.afterClosed().subscribe(result => (this.fruitSelectedOption = result));
  }

  openWelcomeDialog() {
    this.dialog.open(DialogWelcomeComponent);
  }

  openNeptuneDialog() {
    this.dialog.open(DialogNeptuneComponent);
  }

  openAddressDialog() {
    this.dialog.open(DialogAddressFormComponent);
  }
}

// Dialog
@Component({
  selector: 'dialog-fruit',
  templateUrl: 'dialog-fruit.html',
})
export class DialogFruitComponent {}

@Component({
  selector: 'dialog-welcome',
  templateUrl: 'dialog-welcome.html',
})
export class DialogWelcomeComponent {}

@Component({
  selector: 'dialog-neptune-dialog',
  templateUrl: './dialog-neptune.html',
})
export class DialogNeptuneComponent {
  constructor(public dialog: MatDialog) {}

  showInStackedDialog() {
    this.dialog.open(DialogNeptuneIFrameComponent);
  }
}

@Component({
  selector: 'dialog-neptune-iframe-dialog',
  styles: [
    `
      iframe {
        width: 800px;
      }
    `,
  ],
  templateUrl: './dialog-neptune-iframe.html',
})
export class DialogNeptuneIFrameComponent {}

@Component({
  selector: 'dialog-address-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: 'dialog-address-form.html',
})
export class DialogAddressFormComponent {}
