import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  imports: [Breadcrumb, MatButtonModule, MatCardModule],
})
export class DialogDemo {
  dialog = inject(MatDialog);

  fruitSelectedOption = '';

  openFruitDialog() {
    const dialogRef = this.dialog.open(DialogFruit);
    dialogRef.afterClosed().subscribe(result => (this.fruitSelectedOption = result));
  }

  openWelcomeDialog() {
    this.dialog.open(DialogWelcome);
  }

  openNeptuneDialog() {
    this.dialog.open(DialogNeptune);
  }

  openAddressDialog() {
    this.dialog.open(DialogAddressForm);
  }
}

// Dialog
@Component({
  selector: 'dialog-fruit',
  templateUrl: 'dialog-fruit.html',
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogFruit {}

@Component({
  selector: 'dialog-welcome',
  templateUrl: 'dialog-welcome.html',
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogWelcome {}

@Component({
  selector: 'dialog-neptune-dialog',
  templateUrl: './dialog-neptune.html',
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogNeptune {
  dialog = inject(MatDialog);

  showInStackedDialog() {
    this.dialog.open(DialogNeptuneIFrame);
  }
}

@Component({
  selector: 'dialog-neptune-iframe-dialog',
  styles: `
    iframe {
      width: 800px;
    }
  `,
  templateUrl: './dialog-neptune-iframe.html',
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogNeptuneIFrame {}

@Component({
  selector: 'dialog-address-form',
  styles: `
    .demo-full-width {
      width: 100%;
    }
  `,
  templateUrl: 'dialog-address-form.html',
  imports: [MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class DialogAddressForm {}
