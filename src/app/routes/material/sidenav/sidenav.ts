import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Breadcrumb } from '@shared';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.html',
  imports: [Breadcrumb, MatButtonModule, MatCardModule, RouterLink],
})
export class SidenavDemo {}
