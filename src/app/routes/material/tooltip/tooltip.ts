import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  imports: [Breadcrumb, MatButtonModule, MatTooltipModule, MatCardModule],
})
export class TooltipDemo {}
