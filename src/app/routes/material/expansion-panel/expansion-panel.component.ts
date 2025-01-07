import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrl: './expansion-panel.component.scss',
  imports: [BreadcrumbComponent, MatExpansionModule, MatButtonModule],
})
export class ExpansionPanelComponent {
  panelOpenState = false;
}
