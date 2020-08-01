import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyValidation } from './formly-validation';
import { FormlyWrapperPanelComponent } from './formly-wrapper';

/**
 * Formly global configuration
 */
const formlyModuleProviders = FormlyModule.forRoot({
  wrappers: [{ name: 'panel', component: FormlyWrapperPanelComponent }],
  validationMessages: [],
}).providers;

@NgModule({
  declarations: [FormlyWrapperPanelComponent],
  providers: [FormlyValidation],
})
export class FormlyConfigModule {
  constructor(formlyValidation: FormlyValidation) {
    formlyValidation.init();
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormlyConfigModule,
      providers: [formlyModuleProviders],
    };
  }
}
