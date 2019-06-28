import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

const THIRDMODULES = [
  MaterialModule,
  FlexLayoutModule,
  NgProgressModule,
  NgProgressRouterModule,
];
const COMPONENTS = [BreadcrumbComponent, PageHeaderComponent];
const DIRECTIVES = [];
const PIPES = [];

@NgModule({
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    PageHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    // third libs
    ...THIRDMODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    // third libs
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
})
export class SharedModule {}
