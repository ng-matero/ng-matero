import { Component } from '@angular/core';
import { ErrorCodeComponent } from '@shared/components/error-code/error-code.component';

@Component({
  selector: 'app-error-500',
  template: `
    <error-code
      code="500"
      title="Server went wrong!"
      message="Just kidding, looks like we have an internal issue, please try refreshing."
    />
  `,
  standalone: true,
  imports: [ErrorCodeComponent],
})
export class Error500Component {}
