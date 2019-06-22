import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { MaterialRoutingModule } from './material-routing.module';

import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabComponent } from './tab/tab.component';
import { TreeComponent } from './tree/tree.component';
import { MenuComponent } from './menu/menu.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  imports: [CommonModule, SharedModule, MaterialRoutingModule],
  declarations: [GridListComponent, CardComponent, DividerComponent, ExpansionPanelComponent, ListComponent, StepperComponent, TabComponent, TreeComponent, MenuComponent, SidenavComponent, ToolbarComponent],
})
export class MaterialModule {}
