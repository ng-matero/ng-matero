import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { TableRoutingModule } from './tables-routing.module';

import { BasicComponent } from './basic/basic.component';
import { BasicEditComponent } from './basic/edit/edit.component';

@NgModule({
  declarations: [BasicComponent, BasicEditComponent],
  imports: [CommonModule, SharedModule, TableRoutingModule],
  entryComponents: [BasicEditComponent],
})
export class TablesModule {}
