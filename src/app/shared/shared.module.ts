import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

const THIRDMODULES = [];
const COMPONENTS = [];
const DIRECTIVES = [];

@NgModule({
  declarations: [
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    // third libs
    ...THIRDMODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule, // third libs
    MaterialModule,
    FlexLayoutModule,
    ...THIRDMODULES,
    // your components
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {}
