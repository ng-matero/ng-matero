import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { Observable } from 'rxjs';

import { PageHeader } from '@shared';
import { FormsService, Person } from '../forms.service';
import { FormsSelectEdit } from './edit/edit';

@Component({
  selector: 'app-forms-selects',
  templateUrl: './select.html',
  styleUrl: './select.scss',
  imports: [
    AsyncPipe,
    JsonPipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MtxSelectModule,
    PageHeader,
  ],
})
export class FormsSelect implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly formsSrv = inject(FormsService);

  // Data source
  people$!: Observable<Person[]>;
  people: Person[] = [];
  selectedPersonId = '5a15b13c36e7a7f00cf0d7cb';
  selectedPersonId2 = '5a15b13c36e7a7f00cf0d7cb';

  selectedSimpleItem = 'Two';
  simpleItems: any[] = [];
  disable = true;

  selectedCarId = 3;
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab', disabled: true },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];

  // Tags
  companies: any[] = [];
  loading = false;
  companiesNames = ['Miškas', 'Žalias', 'Flexigen'];
  selectedCompany = null;
  selectedCompanyCustom = null;
  selectedCompanyCustomPromise = null;

  ngOnInit() {
    this.people$ = this.formsSrv.getPeople();
    this.formsSrv.getPeople().subscribe(items => (this.people = items));
    this.simpleItems = [true, 'Two', 3];

    this.companiesNames.forEach((c, i) => {
      this.companies.push({ id: i, name: c });
    });
  }

  toggleDisabled() {
    const car: any = this.cars[1];
    car.disabled = !car.disabled;
  }

  addTag(name: string) {
    return { name, tag: true };
  }

  addTagPromise(name: string) {
    return new Promise(resolve => {
      this.loading = true;
      setTimeout(() => {
        resolve({ id: 5, name, valid: true });
        this.loading = false;
      }, 1000);
    });
  }

  openDialog() {
    this.dialog.open(FormsSelectEdit, {
      autoFocus: false,
    });
  }
}
