import { Component } from '@angular/core';

@Component({
  selector: 'app-helpers-css-class',
  templateUrl: './css-class.component.html',
  styleUrls: ['./css-class.component.scss'],
})
export class HelpersCssClassComponent {
  colorArr = 'red|pink|purple|deep-purple|indigo|blue|light-blue|cyan|teal|green|ligh-green|lime|yellow|amber|orange|deep-orange|brown|gray|grey|blue-gray|blue-grey'.split(
    '|'
  );
}
