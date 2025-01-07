import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  imports: [BreadcrumbComponent, MatButtonModule, MatCardModule],
})
export class DialogComponent {
  dialog = inject(MatDialog);

  fruitSelectedOption = '';

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
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogFruitComponent {}

@Component({
  selector: 'dialog-welcome',
  templateUrl: 'dialog-welcome.html',
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogWelcomeComponent {}

@Component({
  selector: 'dialog-neptune-dialog',
  templateUrl: './dialog-neptune.html',
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogNeptuneComponent {
  dialog = inject(MatDialog);

  showInStackedDialog() {
    this.dialog.open(DialogNeptuneIFrameComponent);
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
export class DialogNeptuneIFrameComponent {}

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
export class DialogAddressFormComponent {}
