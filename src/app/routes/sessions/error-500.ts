import { Component } from '@angular/core';
import { ErrorCode } from '@shared';

@Component({
  selector: 'app-error-500',
  template: `
    <error-code
      code="500"
      title="Server went wrong!"
      message="Just kidding, looks like we have an internal issue, please try refreshing."
    />
  `,
  imports: [ErrorCode],
})
export class Error500 {}
