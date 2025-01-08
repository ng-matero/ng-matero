import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export function noopInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  return next(req);
}
