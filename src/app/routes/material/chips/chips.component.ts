import { Component } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Person {
  name: string;
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent {
  visible = true;
  color = '';
  selectable = true;
  removable = true;
  addOnBlur = true;
  message = '';

  people: Person[] = [
    { name: 'Kara' },
    { name: 'Jeremy' },
    { name: 'Topher' },
    { name: 'Elad' },
    { name: 'Kristiyan' },
    { name: 'Paul' },
  ];

  availableColors = [
    { name: 'none', color: '' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' },
  ];

  constructor(public snackBar: MatSnackBar) {}

  displayMessage(message: string): void {
    this.message = message;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our person
    if ((value || '').trim()) {
      const name = value.trim();
      this.people.push({ name });
      this.snackBar.open(`${name} added`, '', { duration: 2000 });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(person: Person): void {
    const index = this.people.indexOf(person);

    if (index >= 0) {
      this.people.splice(index, 1);
      this.snackBar.open(`${person.name} deleted`, '', { duration: 2000 });
    }
  }

  edit(person: Person, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove person if it no longer has a name
    if (!value) {
      this.remove(person);
      return;
    }

    // Edit existing person
    const index = this.people.indexOf(person);
    if (index > 0) {
      this.people[index].name = value;
    }
  }

  toggleVisible(): void {
    this.visible = false;
  }
}
