import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MtxSelectModule } from '@ng-matero/extensions/select';

@Component({
  selector: 'app-forms-select-edit',
  templateUrl: './edit.html',
  styleUrl: './edit.scss',
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MtxSelectModule],
})
export class FormsSelectEdit {
  defaultBindingsList = [
    { value: 1, label: 'Vilnius' },
    { value: 2, label: 'Kaunas' },
    { value: 3, label: 'Pavilnys', disabled: true },
  ];

  selectedCity = null;
}
