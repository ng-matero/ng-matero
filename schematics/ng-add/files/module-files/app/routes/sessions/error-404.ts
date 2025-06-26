/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-404',
  template: `
    <error-code
      code="404"
      title="Page not found!"
      message="This is not the web page you are looking for."
    />
  `,
  standalone: false,
})
export class Error404 {}
