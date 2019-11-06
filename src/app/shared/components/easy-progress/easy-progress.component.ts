import { Component, OnInit, Input, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
  selector: 'easy-progress',
  host: {
    class: 'matero-easy-progress',
  },
  templateUrl: './easy-progress.component.html',
  styleUrls: ['./easy-progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EasyProgressComponent implements OnInit {
  @Input() value = 0;
  @Input() foreground = 'rgba(255,255,255,1)';

  @HostBinding('style.height')
  @Input()
  height = '2px';

  @HostBinding('style.background-color')
  @Input()
  background = 'rgba(0,0,0,.5)';

  constructor() {}

  ngOnInit() {}
}
