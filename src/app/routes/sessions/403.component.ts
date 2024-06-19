import { Component } from '@angular/core';
import { ErrorCodeComponent } from '@shared/components/error-code/error-code.component';

@Component({
  selector: 'app-error-403',
  template: `
    <error-code
      code="403"
      title="Permission denied!"
      message="You do not have permission to access the requested data."
    />
  `,
  standalone: true,
  imports: [ErrorCodeComponent],
})
export class Error403Component {}
