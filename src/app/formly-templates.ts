import { ViewChild, ChangeDetectionStrategy, Component } from '@angular/core';
import { FieldType } from '@ngx-formly/material/form-field';
import { MtxSelect } from '@ng-matero/extensions/select';
import { FieldTypeConfig } from '@ngx-formly/core';

/**
 * This is just an example.
 */
@Component({
  selector: 'formly-field-combobox',
  template: `<mtx-select
    #select
    [formControl]="formControl"
    [items]="props.options | toObservable | async"
    [bindLabel]="bindLabel"
    [bindValue]="bindValue!"
    [multiple]="props.multiple"
    [placeholder]="props.placeholder!"
    [required]="props.required!"
    [closeOnSelect]="!props.multiple"
    [compareWith]="props.compareWith"
  >
  </mtx-select>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldComboboxComponent extends FieldType<FieldTypeConfig> {
  @ViewChild('select', { static: true }) select!: MtxSelect;

  get bindLabel() {
    return typeof this.props.labelProp === 'string' ? this.props.labelProp : '';
  }

  get bindValue() {
    return typeof this.props.valueProp === 'string' ? this.props.valueProp : undefined;
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
