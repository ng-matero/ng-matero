import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, isObservable } from 'rxjs';

@Pipe({ name: 'toObservable' })
export class ToObservablePipe implements PipeTransform {
  transform(value: string | Observable<any>): Observable<string> {
    return isObservable(value) ? value : of(value);
  }
}
