import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
  imports: [
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    Breadcrumb,
  ],
})
export class DatepickerDemo {
  birthday!: Date;
  maxBirthday = new Date();

  paymentDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
  minPaymentDate = new Date(Date.now() + 48 * 60 * 60 * 1000);

  departDate!: Date;
  returnDate!: Date;
  minTripDate = new Date();
  maxTripDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  startTripDate = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000);

  appointmentDate!: Date;
  minAppointmentDate = new Date();
  maxAppointmentDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  weekdaysOnly = (d: Date | null) => {
    if (d === null) {
      return true;
    }
    return d.getDay() !== 0 && d.getDay() !== 6;
  };
}
