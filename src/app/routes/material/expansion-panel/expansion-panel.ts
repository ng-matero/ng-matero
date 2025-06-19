import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.html',
  styleUrl: './expansion-panel.scss',
  imports: [Breadcrumb, MatExpansionModule, MatButtonModule],
})
export class ExpansionPanelDemo {
  panelOpenState = false;
}
