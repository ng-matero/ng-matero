import { MatDialogConfig } from '@angular/material';

export interface DialogData extends MatDialogConfig {
  title: string;
  description?: string;
  buttons: DialogBtns[];
}

export interface DialogBtns {
  type?: '' | 'primary' | 'accent' | 'warn';
  text: string;
  onClick: () => void;
}
