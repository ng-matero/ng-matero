import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../material-module';
import { MaterialExtensionsModule } from '../material-extensions-module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { NgProgressbar } from 'ngx-progressbar';
import { NgProgressRouter } from 'ngx-progressbar/router';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { PageHeader } from './components/page-header/page-header';
import { ErrorCode } from './components/error-code/error-code';
import { DisableControl } from './directives/disable-control';
import { SafeUrlPipe } from './pipes/safe-url-pipe';

const MODULES: any[] = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  MaterialModule,
  MaterialExtensionsModule,
  FormlyModule,
  FormlyMaterialModule,
  NgxPermissionsModule,
  ToastrModule,
  TranslateModule,
  NgProgressbar,
  NgProgressRouter,
];
const COMPONENTS: any[] = [Breadcrumb, PageHeader, ErrorCode];
const DIRECTIVES: any[] = [DisableControl];
const PIPES: any[] = [SafeUrlPipe];

@NgModule({
  imports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
  exports: [...MODULES, ...COMPONENTS, ...DIRECTIVES, ...PIPES],
})
export class SharedModule {}
