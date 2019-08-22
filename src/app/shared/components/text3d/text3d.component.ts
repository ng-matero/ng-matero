import { Component, OnInit, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'text3d',
  templateUrl: './text3d.component.html',
  styleUrls: ['./text3d.component.scss'],
})
export class Text3dComponent implements OnInit {
  @ContentChild(TemplateRef, { static: false }) template: TemplateRef<any>;

  @Input() text = '';
  @Input() num = 20;

  arr = [];

  constructor() {
    for (let i = 1; i <= this.num; i++) {
      this.arr.push(i);
    }
  }

  ngOnInit() {}
}
