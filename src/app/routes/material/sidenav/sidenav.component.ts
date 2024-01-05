import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { BreadcrumbComponent } from '@shared';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  standalone: true,
  imports: [BreadcrumbComponent, MatButtonModule, RouterLink],
})
export class SidenavComponent {}
