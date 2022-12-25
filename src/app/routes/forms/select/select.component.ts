import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Person, DataService } from '../data.service';
import { FormsSelectEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-forms-selects',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [DataService],
})
export class FormsSelectComponent implements OnInit {
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

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit() {
    this.people$ = this.dataService.getPeople();
    this.dataService.getPeople().subscribe(items => (this.people = items));
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
    this.dialog.open(FormsSelectEditComponent, {
      autoFocus: false,
    });
  }
}
