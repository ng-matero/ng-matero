import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.scss',
  imports: [BreadcrumbComponent, MatCardModule, MatListModule, MatDividerModule],
})
export class DividerComponent {}
