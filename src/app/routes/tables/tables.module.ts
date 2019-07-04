import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableRoutingModule } from './tables-routing.module';

import { BasicComponent } from './basic/basic.component';

@NgModule({
  declarations: [BasicComponent],
  imports: [CommonModule, SharedModule, TableRoutingModule],
})
export class TablesModule {}
