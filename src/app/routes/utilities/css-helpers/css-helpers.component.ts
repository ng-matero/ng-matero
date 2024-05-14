import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { PageHeaderComponent } from '@shared';

@Component({
  selector: 'app-utilities-css-helpers',
  templateUrl: './css-helpers.component.html',
  styleUrl: './css-helpers.component.scss',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatTabsModule, PageHeaderComponent],
})
export class UtilitiesCssHelpersComponent {
  colorNames =
    'red|pink|purple|deep-purple|indigo|blue|light-blue|cyan|teal|green|light-green|lime|yellow|amber|orange|deep-orange|brown|gray|grey|blue-gray|blue-grey'.split(
      '|'
    );
  colorHues = '50|100|200|300|400|500|600|700|800|900|A100|A200|A400|A700';
}
