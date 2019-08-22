import { Component, OnInit, Input, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
  selector: 'mini-progress',
  host: {
    class: 'matero-progress',
  },
  templateUrl: './mini-progress.component.html',
  styleUrls: ['./mini-progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MiniProgressComponent implements OnInit {
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
