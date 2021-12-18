import { ViewChild, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldType } from '@ngx-formly/material/form-field';
import { MtxSelectComponent } from '@ng-matero/extensions/select';

/**
 * This is just an example.
 */
@Component({
  selector: 'formly-field-combobox',
  template: `<mtx-select
    #select
    [formControl]="formControl"
    [items]="to.options | toObservable | async"
    [bindLabel]="to.labelProp"
    [bindValue]="bindValue!"
    [multiple]="to.multiple"
    [placeholder]="to.placeholder!"
    [required]="to.required!"
    [closeOnSelect]="!to.multiple"
    [compareWith]="to.compareWith"
  >
  </mtx-select>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldComboboxComponent extends FieldType {
  @ViewChild('select', { static: true }) select!: MtxSelectComponent;

  public formControl!: FormControl;

  get bindValue() {
    return typeof this.to.valueProp === 'string' ? this.to.valueProp : undefined;
  }

  // The original `onContainerClick` has been covered up in FieldType, so we should redefine it.
  onContainerClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (/mat-form-field|mtx-select/g.test(target.parentElement?.classList[0] || '')) {
      this.select.focus();
      this.select.open();
    }
  }
}
