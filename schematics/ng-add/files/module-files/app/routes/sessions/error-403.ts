/* eslint-disable @angular-eslint/prefer-standalone */
import { Component } from '@angular/core';

@Component({
  selector: 'app-error-403',
  template: `
    <error-code
      code="403"
      title="Permission denied!"
      message="You do not have permission to access the requested data."
    />
  `,
  standalone: false,
})
export class Error403 {}
