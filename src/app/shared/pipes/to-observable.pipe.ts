import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, isObservable } from 'rxjs';

@Pipe({
  name: 'toObservable',
  standalone: true,
})
export class ToObservablePipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  transform(value: Observable<any> | unknown): Observable<any> {
    return isObservable(value) ? value : of(value);
  }
}
