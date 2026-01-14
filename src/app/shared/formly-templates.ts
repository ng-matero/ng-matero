import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MtxPipesModule } from '@ng-matero/extensions/core';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { FieldTypeConfig } from '@ngx-formly/core';
import { FieldType } from '@ngx-formly/material/form-field';

/**
 * This is just an example.
 */
@Component({
  selector: 'formly-field-combobox',
  template: `
    <mtx-select
      #select
      [formControl]="formControl"
      [items]="props.options | toObservable | async"
      [bindLabel]="bindLabel"
      [bindValue]="bindValue!"
      [multiple]="props['multiple']"
      [placeholder]="props.placeholder!"
      [required]="props.required!"
      [closeOnSelect]="!props['multiple']"
      [compareWith]="props['compareWith']"
    />
  `,

  imports: [AsyncPipe, ReactiveFormsModule, MtxSelectModule, MtxPipesModule],
})
export class FormlyFieldCombobox extends FieldType<FieldTypeConfig> {
  get bindLabel() {
    return typeof this.props['labelProp'] === 'string' ? this.props['labelProp'] : '';
  }

  get bindValue() {
    return typeof this.props['valueProp'] === 'string' ? this.props['valueProp'] : undefined;
  }
}
