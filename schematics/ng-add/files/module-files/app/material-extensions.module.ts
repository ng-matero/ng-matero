import { NgModule } from '@angular/core';

import { MtxAlertModule } from '@ng-matero/extensions/alert';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { MtxCheckboxGroupModule } from '@ng-matero/extensions/checkbox-group';
import { MtxColorpickerModule } from '@ng-matero/extensions/colorpicker';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { MtxDialogModule } from '@ng-matero/extensions/dialog';
import { MtxDrawerModule } from '@ng-matero/extensions/drawer';
import { MtxGridModule } from '@ng-matero/extensions/grid';
import { MtxLoaderModule } from '@ng-matero/extensions/loader';
import { MtxPhotoviewerModule } from '@ng-matero/extensions/photoviewer';
import { MtxPopoverModule } from '@ng-matero/extensions/popover';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { MtxSplitModule } from '@ng-matero/extensions/split';
import { MtxTooltipModule } from '@ng-matero/extensions/tooltip';
import { MTX_DATETIME_FORMATS } from '@ng-matero/extensions/core';
import { MtxMomentDatetimeModule } from '@ng-matero/extensions-moment-adapter';

@NgModule({
  exports: [
    MtxAlertModule,
    MtxButtonModule,
    MtxCheckboxGroupModule,
    MtxColorpickerModule,
    MtxDatetimepickerModule,
    MtxDialogModule,
    MtxDrawerModule,
    MtxGridModule,
    MtxLoaderModule,
    MtxPhotoviewerModule,
    MtxPopoverModule,
    MtxProgressModule,
    MtxSelectModule,
    MtxSplitModule,
    MtxTooltipModule,
    MtxMomentDatetimeModule, // <= You can also import the other adapter you need (e.g. luxon, date-fns)
  ],
  providers: [
    {
      provide: MTX_DATETIME_FORMATS,
      useValue: {
        parse: {
          dateInput: 'YYYY-MM-DD',
          yearInput: 'YYYY',
          monthInput: 'MMMM',
          datetimeInput: 'YYYY-MM-DD HH:mm',
          timeInput: 'HH:mm',
        },
        display: {
          dateInput: 'YYYY-MM-DD',
          yearInput: 'YYYY',
          monthInput: 'MMMM',
          datetimeInput: 'YYYY-MM-DD HH:mm',
          timeInput: 'HH:mm',
          monthYearLabel: 'YYYY MMMM',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
          popupHeaderDateLabel: 'MMM DD, ddd',
        },
      },
    },
  ],
})
export class MaterialExtensionsModule {}
