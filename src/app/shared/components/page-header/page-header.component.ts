import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent implements OnInit {
  @HostBinding('class.matero-page-header') show = true;

  @Input() title = '';
  @Input() subtitle = '';
  @Input() showBreadCrumb = true;

  constructor() {}

  ngOnInit() {}
}
