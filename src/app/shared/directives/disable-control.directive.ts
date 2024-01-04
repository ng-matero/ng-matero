import { Directive, Input, OnChanges, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[disableControl]',
  standalone: true,
})
export class DisableControlDirective implements OnChanges {
  @Input() disableControl = false;

  constructor(@Optional() private ngControl: NgControl) {}

  ngOnChanges(): void {
    if (this.disableControl) {
      this.ngControl?.control?.disable();
    } else {
      this.ngControl?.control?.enable();
    }
  }
}
