import { Component } from '@angular/core';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
})
export class HelpersComponent {
  colorArr = 'red|pink|purple|deep-purple|indigo|blue|light-blue|cyan|teal|green|ligh-green|lime|yellow|amber|orange|deep-orange|brown|gray|grey|blue-gray|blue-grey'.split(
    '|'
  );
}
