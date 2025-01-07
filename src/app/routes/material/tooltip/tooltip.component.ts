import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
  imports: [BreadcrumbComponent, MatButtonModule, MatTooltipModule, MatCardModule],
})
export class TooltipComponent {}
