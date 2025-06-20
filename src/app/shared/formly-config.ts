import { ConfigOption } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';
import { FormlyFieldComboboxComponent } from './formly-templates';
import { FormlyWrapperCardComponent, FormlyWrapperDivComponent } from './formly-wrappers';

export function formlyConfigFactory(translate: TranslateService): ConfigOption {
  return {
    types: [
      {
        name: 'combobox',
        component: FormlyFieldComboboxComponent,
        wrappers: ['form-field'],
      },
    ],
    wrappers: [
      { name: 'card', component: FormlyWrapperCardComponent },
      { name: 'div', component: FormlyWrapperDivComponent },
    ],
    validators: [],
    validationMessages: [
      {
        name: 'required',
        message: (err, field) => translate.stream('validation.required'),
      },
      {
        name: 'min',
        message: (err, field) => translate.stream('validation.min', { number: field.props?.min }),
      },
      {
        name: 'max',
        message: (err, field) => translate.stream('validation.max', { number: field.props?.max }),
      },
      {
        name: 'minLength',
        message: (err, field) =>
          translate.stream('validation.min_length', { number: field.props?.minLength }),
      },
      {
        name: 'maxLength',
        message: (err, field) =>
          translate.stream('validation.max_length', { number: field.props?.maxLength }),
      },
    ],
  };
}
