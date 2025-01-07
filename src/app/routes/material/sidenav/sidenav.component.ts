import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  imports: [BreadcrumbComponent, MatButtonModule, MatCardModule, RouterLink],
})
export class SidenavComponent {}
