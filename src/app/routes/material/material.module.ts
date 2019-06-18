import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialRoutingModule } from './material-routing.module';

import { GridComponent } from './grid/grid.component';

@NgModule({
  declarations: [GridComponent],
  imports: [CommonModule, SharedModule, MaterialRoutingModule],
})
export class MaterialModule {}
