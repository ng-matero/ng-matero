import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.html',
  styleUrl: './divider.scss',
  imports: [Breadcrumb, MatCardModule, MatListModule, MatDividerModule],
})
export class DividerDemo {}
