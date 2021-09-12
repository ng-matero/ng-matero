import { Injectable } from '@angular/core';
import { FormlyFieldConfig, FormlyConfig } from '@ngx-formly/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class FormlyValidations {
  constructor(private translate: TranslateService, private formlyConfig: FormlyConfig) {}

  init(): void {
    // message without params
    this.formlyConfig.addValidatorMessage('required', (_err, _field) =>
      this.translate.stream('validations.required')
    );

    // message with params
    this.formlyConfig.addValidatorMessage('minlength', (err, field) =>
      this.minlengthValidationMessage(err, field, this.translate)
    );
    this.formlyConfig.addValidatorMessage('maxlength', (err, field) =>
      this.maxlengthValidationMessage(err, field, this.translate)
    );
    this.formlyConfig.addValidatorMessage('min', (err, field) =>
      this.minValidationMessage(err, field, this.translate)
    );
    this.formlyConfig.addValidatorMessage('max', (err, field) =>
      this.maxValidationMessage(err, field, this.translate)
    );
  }

  private minlengthValidationMessage(
    err: any,
    field: FormlyFieldConfig,
    translate: TranslateService
  ) {
    return translate.stream('validations.minLength', { number: field.templateOptions?.minLength });
  }

  private maxlengthValidationMessage(
    err: any,
    field: FormlyFieldConfig,
    translate: TranslateService
  ) {
    return translate.stream('validations.maxLength', { number: field.templateOptions?.maxLength });
  }

  private minValidationMessage(err: any, field: FormlyFieldConfig, translate: TranslateService) {
    return translate.stream('validations.min', { number: field.templateOptions?.min });
  }

  private maxValidationMessage(err: any, field: FormlyFieldConfig, translate: TranslateService) {
    return translate.stream('validations.max', { number: field.templateOptions?.max });
  }
}
