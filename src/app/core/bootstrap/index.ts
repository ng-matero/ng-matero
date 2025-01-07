export * from './menu.service';
export * from './settings.service';
export * from './startup.service';
export * from './preloader.service';
export * from './translate-lang.service';

import { inject, provideAppInitializer } from '@angular/core';
import { TranslateLangService } from './translate-lang.service';
import { StartupService } from './startup.service';

export const appInitializerProviders = [
  provideAppInitializer(() => inject(TranslateLangService).load()),
  provideAppInitializer(() => inject(StartupService).load()),
];
