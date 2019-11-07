import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './easy-dialog.config';

@Component({
  selector: 'easy-dialog',
  templateUrl: './easy-dialog.component.html',
  styleUrls: ['./easy-dialog.component.scss'],
})
export class EasyDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EasyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  onOk() {
    this.data.onOk();
    this.onCancel();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
