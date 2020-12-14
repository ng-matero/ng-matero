import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig } from '@angular/material/dialog';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MomentDatetimeAdapter } from '@mat-datetimepicker/moment';
import { DatetimeAdapter, MAT_DATETIME_FORMATS } from '@mat-datetimepicker/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorI18nService } from '@shared/services/paginator-i18n.service';

export const materialProviders = [
  {
    provide: MatPaginatorIntl,
    deps: [PaginatorI18nService],
    useFactory: (paginatorI18nSrv: PaginatorI18nService) => paginatorI18nSrv.getPaginatorIntl(),
  },
  {
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: {
      ...new MatDialogConfig(),
    },
  },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  },
  // This will be overrided by runtime setting
  { provide: MAT_DATE_LOCALE, useFactory: () => navigator.language },
  {
    provide: MAT_DATE_FORMATS,
    useValue: {
      parse: {
        dateInput: 'YYYY-MM-DD',
      },
      display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY MMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY MMM',
      },
    },
  },
  MomentDatetimeAdapter,
  {
    provide: DatetimeAdapter,
    useClass: MomentDatetimeAdapter,
  },
  {
    provide: MAT_DATETIME_FORMATS,
    useValue: {
      parse: {
        dateInput: 'YYYY-MM-DD HH:mm',
        monthInput: 'MMMM',
        timeInput: 'HH:mm',
        datetimeInput: 'YYYY-MM-DD HH:mm',
      },
      display: {
        dateInput: 'YYYY-MM-DD HH:mm',
        monthInput: 'MMMM',
        datetimeInput: 'YYYY-MM-DD HH:mm',
        timeInput: 'HH:mm',
        monthYearLabel: 'YYYY MMM',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
        popupHeaderDateLabel: 'MMMM DD, ddd',
      },
    },
  },
];
