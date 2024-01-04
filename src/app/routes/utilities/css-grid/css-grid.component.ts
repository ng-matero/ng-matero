import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-utilities-css-grid',
  templateUrl: './css-grid.component.html',
  styleUrls: ['./css-grid.component.scss'],
  standalone: true,
  imports: [PageHeaderComponent, RouterLink, MatCardModule],
})
export class UtilitiesCssGridComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
