import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignRoutingModule } from './design-routing.module';

import { ColorsComponent } from './colors/colors.component';
import { IconsComponent } from './icons/icons.component';

@NgModule({
  declarations: [ColorsComponent, IconsComponent],
  imports: [CommonModule, DesignRoutingModule],
})
export class DesignModule {}
