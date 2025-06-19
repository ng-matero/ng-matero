import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { PageHeader } from '@shared';

@Component({
  selector: 'app-utilities-css-grid',
  templateUrl: './css-grid.html',
  styleUrl: './css-grid.scss',
  imports: [RouterLink, MatCardModule, PageHeader],
})
export class UtilitiesCssGrid {}
