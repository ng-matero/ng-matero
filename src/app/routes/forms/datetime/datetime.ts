import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MtxDatetimepickerFilterType,
  MtxDatetimepickerModule,
} from '@ng-matero/extensions/datetimepicker';
import { TranslateService } from '@ngx-translate/core';
import { PageHeader } from '@shared';
import { addDays, set } from 'date-fns';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forms-datetime',
  templateUrl: './datetime.html',
  styleUrl: './datetime.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MtxDatetimepickerModule,
    PageHeader,
  ],
})
export class FormsDatetime implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly dateAdapter = inject(DateAdapter);
  private readonly translate = inject(TranslateService);

  type = 'date-fns';

  group: FormGroup;
  today: Date;
  tomorrow: Date;
  min: Date;
  max: Date;
  start: Date;
  filter: (date: Date | null, type: MtxDatetimepickerFilterType) => boolean;

  private translateSubscription = Subscription.EMPTY;

  constructor() {
    this.today = new Date(); // moment.utc();
    this.tomorrow = addDays(this.today, 1); // moment.utc().date(moment.utc().date() + 1);
    this.min = new Date(2018, 10, 3, 11, 10);
    this.max = new Date(2018, 10, 4, 11, 45);
    this.start = set(this.today, {
      year: 1930,
      month: 9,
      date: 28,
    });
    this.filter = (date: Date | null, type: MtxDatetimepickerFilterType) => {
      if (date === null) {
        return true;
      }
      switch (type) {
        case MtxDatetimepickerFilterType.DATE:
          return (
            date.getFullYear() % 2 === 0 && date.getMonth() % 2 === 0 && date.getDate() % 2 === 0
          );
        case MtxDatetimepickerFilterType.HOUR:
          return date.getHours() % 2 === 0;
        case MtxDatetimepickerFilterType.MINUTE:
          return date.getMinutes() % 2 === 0;
      }
    };

    this.group = this.fb.group({
      dateTime: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      dateTimeManual: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      dateTimeYear: [new Date('2017-11-09T12:10:00.000Z'), Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      timeAMPM: [null, Validators.required],
      timeAMPMManual: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
      mintest: [this.today, Validators.required],
      filtertest: [this.today, Validators.required],
      touch: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: string }) => {
      this.dateAdapter.setLocale(res.lang);
    });
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }
}
