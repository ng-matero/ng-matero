import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { TOKEN_BASE_URL } from '@core/authentication';
import { BASE_URL } from '@core/interceptors/base-url-interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [{ provide: TOKEN_BASE_URL, useExisting: BASE_URL }],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
