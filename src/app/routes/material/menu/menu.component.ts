import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [BreadcrumbComponent, MatMenuModule, MatCardModule, MatButtonModule, MatIconModule],
})
export class MenuComponent {}
