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
    this.formlyConfig.addValidatorMessage('minLength', (err, field) =>
      this.minLengthValidationMessage(err, field, this.translate)
    );
    this.formlyConfig.addValidatorMessage('maxLength', (err, field) =>
      this.maxLengthValidationMessage(err, field, this.translate)
    );
    this.formlyConfig.addValidatorMessage('min', (err, field) =>
      this.minValidationMessage(err, field, this.translate)
    );
    this.formlyConfig.addValidatorMessage('max', (err, field) =>
      this.maxValidationMessage(err, field, this.translate)
    );
  }

  private minLengthValidationMessage(
    err: any,
    field: FormlyFieldConfig,
    translate: TranslateService
  ) {
    return translate.stream('validations.minlength', { number: field.props?.minLength });
  }

  private maxLengthValidationMessage(
    err: any,
    field: FormlyFieldConfig,
    translate: TranslateService
  ) {
    return translate.stream('validations.maxlength', { number: field.props?.maxLength });
  }

  private minValidationMessage(err: any, field: FormlyFieldConfig, translate: TranslateService) {
    return translate.stream('validations.min', { number: field.props?.min });
  }

  private maxValidationMessage(err: any, field: FormlyFieldConfig, translate: TranslateService) {
    return translate.stream('validations.max', { number: field.props?.max });
  }
}
