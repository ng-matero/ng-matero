import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-utilities-css-grid',
  templateUrl: './css-grid.component.html',
  styleUrl: './css-grid.component.scss',
  imports: [RouterLink, MatCardModule, PageHeaderComponent],
})
export class UtilitiesCssGridComponent {}
