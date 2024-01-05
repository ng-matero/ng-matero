import { ModuleWithProviders, NgModule, Provider } from '@angular/core';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldComboboxComponent } from './formly-templates';
import { FormlyValidations } from './formly-validations';
import { FormlyWrapperCardComponent, FormlyWrapperDivComponent } from './formly-wrappers';
import { FormlyMaterialModule } from '@ngx-formly/material';

/**
 * Formly global configuration
 */
const formlyModuleProviders = FormlyModule.forRoot({
  types: [
    {
      name: 'combobox',
      component: FormlyFieldComboboxComponent,
      wrappers: ['form-field'],
    },
  ],
  wrappers: [
    {
      name: 'card',
      component: FormlyWrapperCardComponent,
    },
    {
      name: 'div',
      component: FormlyWrapperDivComponent,
    },
  ],
  validationMessages: [],
}).providers as Provider[];

@NgModule({
  imports: [
    FormlyMaterialModule,
    FormlyFieldComboboxComponent,
    FormlyWrapperCardComponent,
    FormlyWrapperDivComponent,
  ],
  providers: [FormlyValidations],
})
export class FormlyConfigModule {
  constructor(formlyValidations: FormlyValidations) {
    formlyValidations.init();
  }

  static forRoot(): ModuleWithProviders<FormlyConfigModule> {
    return {
      ngModule: FormlyConfigModule,
      providers: [formlyModuleProviders],
    };
  }
}
