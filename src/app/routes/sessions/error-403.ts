import { Component } from '@angular/core';
import { ErrorCode } from '@shared/components/error-code/error-code';

@Component({
  selector: 'app-error-403',
  template: `
    <error-code
      code="403"
      title="Permission denied!"
      message="You do not have permission to access the requested data."
    />
  `,
  imports: [ErrorCode],
})
export class Error403 {}
