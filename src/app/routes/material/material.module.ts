import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialRoutingModule } from './material-routing.module';

import { GridComponent } from './grid/grid.component';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialRoutingModule],
  declarations: [GridComponent, CardComponent],
})
export class MaterialModule {}
