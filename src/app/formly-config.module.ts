import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyFieldComboboxComponent } from './formly-templates';
import { FormlyWrapperCardComponent } from './formly-wrappers';
import { FormlyValidations } from './formly-validations';

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
  ],
  validationMessages: [],
}).providers as Provider[];

@NgModule({
  imports: [SharedModule],
  declarations: [FormlyFieldComboboxComponent, FormlyWrapperCardComponent],
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
