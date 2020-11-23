import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'formly-field-combobox',
  template: `<div class="formly-field-combobox-container-click-fix" (click)="select.open()">
    <mtx-select
      #select
      [formControl]="formControl"
      [items]="to.options | toObservable | async"
      [bindLabel]="to.labelProp"
      [bindValue]="bindValue"
      [multiple]="to.multiple"
      [placeholder]="to.placeholder"
      [required]="to.required"
      [closeOnSelect]="!to.multiple"
      [compareWith]="to.compareWith"
    >
    </mtx-select>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldComboboxComponent extends FieldType {
  get bindValue() {
    return typeof this.to.valueProp === 'string' ? this.to.valueProp : undefined;
  }
}
