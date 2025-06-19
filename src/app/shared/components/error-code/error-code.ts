import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'error-code',
  templateUrl: './error-code.html',
  styleUrl: './error-code.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, MatButtonModule],
})
export class ErrorCode {
  @Input() code = '';
  @Input() title = '';
  @Input() message = '';
}
