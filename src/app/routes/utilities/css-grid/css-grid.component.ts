import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-utilities-css-grid',
  templateUrl: './css-grid.component.html',
  styleUrls: ['./css-grid.component.scss'],
  standalone: true,
  imports: [RouterLink, MatCardModule, PageHeaderComponent],
})
export class UtilitiesCssGridComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
