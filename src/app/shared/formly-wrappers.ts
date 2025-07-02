import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

/**
 * This is just an example.
 */
@Component({
  selector: 'formly-wrapper-card',
  template: `
    <div class="card">
      <h3 class="card-header">Its time to party</h3>
      <h3 class="card-header">{{ props.label }}</h3>
      <div class="card-body">
        <ng-container #fieldComponent />
      </div>
    </div>
  `,
})
export class FormlyWrapperCard extends FieldWrapper {}

@Component({
  selector: 'formly-wrapper-div',
  template: `
    <div>
      <ng-container #fieldComponent />
    </div>
  `,
})
export class FormlyWrapperDiv extends FieldWrapper {}
