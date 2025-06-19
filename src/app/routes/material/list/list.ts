import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.scss',
  imports: [MatCardModule, MatDividerModule, MatIconModule, MatListModule, Breadcrumb],
})
export class ListDemo {
  items: string[] = ['Pepper', 'Salt', 'Paprika'];

  messages = [
    {
      from: 'John',
      subject: 'Brunch?',
      message: 'Did you want to go on Sunday? I was thinking that might work.',
      image: 'https://angular.io/generated/images/bios/devversion.jpg',
    },
    {
      from: 'Mary',
      subject: 'Summer BBQ',
      message: 'Wish I could come, but I have some prior obligations.',
      image: 'https://angular.io/generated/images/bios/twerske.jpg',
    },
    {
      from: 'Bobby',
      subject: 'Oui oui',
      message: 'Do you have Paris reservations for the 15th? I just booked!',
      image: 'https://angular.io/generated/images/bios/jelbourn.jpg',
    },
  ];

  links = [{ name: 'Inbox' }, { name: 'Outbox' }, { name: 'Spam' }, { name: 'Trash' }];

  folders = [
    { name: 'Imported', updated: 'Miles' },
    { name: 'Important', updated: 'Tina' },
    { name: 'Unread', updated: 'Jeremy' },
  ];

  notes = [
    { name: 'Update screenshots', updated: 'Kara' },
    { name: 'Install new application', updated: 'Andrew' },
  ];
}
