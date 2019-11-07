import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgxPopperModule } from 'ngx-popper';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ErrorCodeComponent } from './components/error-code/error-code.component';
import { Text3dComponent } from './components/text3d/text3d.component';
import { EasyProgressComponent } from './components/easy-progress/easy-progress.component';
import { EasyDialogComponent } from './components/easy-dialog/easy-dialog.component';

const THIRD_MODULES = [
  MaterialModule,
  FlexLayoutModule,
  NgProgressModule,
  NgProgressRouterModule,
  NgSelectModule,
  FormlyModule,
  FormlyMaterialModule,
  NgxPopperModule,
];
const COMPONENTS = [
  BreadcrumbComponent,
  PageHeaderComponent,
  ErrorCodeComponent,
  Text3dComponent,
  EasyProgressComponent,
  EasyDialogComponent,
];
const COMPONENTS_DYNAMIC = [EasyDialogComponent];
const DIRECTIVES = [];
const PIPES = [];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES, ...COMPONENTS_DYNAMIC],
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...THIRD_MODULES],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...THIRD_MODULES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class SharedModule {}
