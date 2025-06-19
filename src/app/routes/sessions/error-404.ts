import { Component } from '@angular/core';
import { ErrorCode } from '@shared/components/error-code/error-code';

@Component({
  selector: 'app-error-404',
  template: `
    <error-code
      code="404"
      title="Page not found!"
      message="This is not the web page you are looking for."
    />
  `,
  imports: [ErrorCode],
})
export class Error404 {}
