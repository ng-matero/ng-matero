import { Component } from '@angular/core';
import { ErrorCodeComponent } from '@shared/components/error-code/error-code.component';

@Component({
  selector: 'app-error-404',
  template: `
    <error-code
      code="404"
      title="Page not found!"
      message="This is not the web page you are looking for."
    />
  `,
  standalone: true,
  imports: [ErrorCodeComponent],
})
export class Error404Component {}
