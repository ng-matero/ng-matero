import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
    );
  }
}

@NgModule({
  imports: [CommonModule],
})
export class CoreModule {
  private readonly parentModule = inject(CoreModule, { optional: true, skipSelf: true });

  constructor() {
    throwIfAlreadyLoaded(this.parentModule, 'CoreModule');
  }
}
