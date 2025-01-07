import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-utilities-css-helpers',
  templateUrl: './css-helpers.component.html',
  styleUrl: './css-helpers.component.scss',
  imports: [MatCardModule, MatListModule, MatTabsModule, PageHeaderComponent],
})
export class UtilitiesCssHelpersComponent {
  colorNames =
    'red|pink|purple|deep-purple|indigo|blue|light-blue|cyan|teal|green|light-green|lime|yellow|amber|orange|deep-orange|brown|gray|grey|blue-gray|blue-grey'.split(
      '|'
    );
  colorHues = '10|20|25|30|35|40|50|60|70|80|90|95|98|99';
}
