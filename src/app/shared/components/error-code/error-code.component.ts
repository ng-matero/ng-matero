import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'error-code',
  templateUrl: './error-code.component.html',
  styleUrl: './error-code.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterLink, MatButtonModule],
})
export class ErrorCodeComponent {
  @Input() code = '';
  @Input() title = '';
  @Input() message = '';
}
