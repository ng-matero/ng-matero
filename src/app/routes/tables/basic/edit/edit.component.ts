import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class BasicEditComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BasicEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  onClose(): void {
    this.dialogRef.close();
  }
}
