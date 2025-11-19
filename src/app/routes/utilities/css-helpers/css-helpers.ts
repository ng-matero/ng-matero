import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';

import { PageHeader } from '@shared';

@Component({
  selector: 'app-utilities-css-helpers',
  templateUrl: './css-helpers.html',
  styleUrl: './css-helpers.scss',
  imports: [MatCardModule, MatListModule, MatTabsModule, PageHeader],
})
export class UtilitiesCssHelpers {
  items: {
    name: string;
    children: {
      name: string;
      value: string[];
      class?: string;
    }[];
  }[] = [
    {
      name: 'Colors',
      children: [
        {
          name: 'Background/Border/Text Color',
          value: [
            ...[
              'red',
              'pink',
              'purple',
              'deep-purple',
              'indigo',
              'blue',
              'light-blue',
              'cyan',
              'teal',
              'green',
              'light-green',
              'lime',
              'yellow',
              'amber',
              'orange',
              'deep-orange',
              'brown',
              'gray',
              'grey',
              'blue-gray',
              'blue-grey',
            ].map(v => `[bg|border|text]-${v}-[10|20|25|30|35|40|50|60|70|80|90|95|98|99]`),
            ...['white', 'black', 'light', 'dark'].map(v => `[bg|border|text]-${v}`),
          ],
          class: 'col-sm-12 col-md-12',
        },
      ],
    },
    {
      name: 'Layout',
      children: [
        {
          name: 'Position',
          value: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
        },
        {
          name: 'Display',
          value: ['d-block', 'd-inline-block', 'd-inline', 'd-flex', 'd-inline-flex', 'd-none'],
        },
        {
          name: 'Flexbox (Direction)',
          value: ['flex-row', 'flex-row-reverse', 'flex-col', 'flex-col-reverse'],
        },
        {
          name: 'Flexbox (Fill & Grow & shrink)',
          value: ['flex-fill', 'flex-grow-0', 'flex-grow-1', 'flex-shrink-0', 'flex-shrink-1'],
        },
        {
          name: 'Flexbox (Wrap)',
          value: ['flex-wrap', 'flex-nowrap', 'flex-wrap-reverse'],
        },
        {
          name: 'Flexbox (Justify content)',
          value: [
            'justify-content-start',
            'justify-content-end',
            'justify-content-center',
            'justify-content-between',
            'justify-content-around',
          ],
        },
        {
          name: 'Flexbox (Align content)',
          value: [
            'align-content-start',
            'align-content-end',
            'align-content-center',
            'align-content-between',
            'align-content-around',
            'align-content-stretch',
          ],
        },
        {
          name: 'Flexbox (Align items)',
          value: [
            'align-items-start',
            'align-items-end',
            'align-items-center',
            'align-items-baseline',
            'align-items-stretch',
          ],
        },
        {
          name: 'Flexbox (Align self)',
          value: [
            'align-self-auto',
            'align-self-start',
            'align-self-end',
            'align-self-center',
            'align-self-baseline',
            'align-self-stretch',
          ],
        },
      ],
    },
    {
      name: 'Spacings',
      children: [
        {
          name: 'Margin',
          value: [0, 4, 8, 16, 24, 32, 48, 'auto'].map(v => `m[-[t|b|r|l|x|y]]-${v}`),
        },
        {
          name: 'Negative Margin',
          value: [4, 8, 16, 24, 32, 48].map(v => `m[-[t|b|r|l|x|y]]--${v}`),
        },
        {
          name: 'Padding',
          value: [0, 4, 8, 16, 24, 32, 48].map(v => `p[-[t|b|r|l|x|y]]-${v}`),
        },
        {
          name: 'Gap',
          value: [0, 4, 8, 16, 24, 32, 48].map(v => `gap[-[t|b|r|l|x|y]]-${v}`),
        },
      ],
    },
    {
      name: 'Border',
      children: [
        {
          name: 'Border',
          value: [0, 1, 2, 3, 4, 5].map(v => `b[-[t|b|r|l|x|y]]-${v}`),
        },
        {
          name: 'Border Width',
          value: [0, 1, 2, 3, 4, 5].map(v => `border[-[t|b|r|l|x|y]]-${v}`),
        },
        {
          name: 'Border Style',
          value: ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none'].map(
            v => `border[-[t|b|r|l|x|y]]-${v}`
          ),
          class: 'col-sm-12 col-md-6',
        },
        {
          name: 'Border Radius',
          value: [0, 4, 8, 16, 24, 32, 'full'].map(v => `r[-[t|b]-[r|l]]-${v}, r[-[t|b|l|r]]-${v}`),
          class: 'col-sm-12 col-md-6',
        },
      ],
    },
    {
      name: 'Size',
      children: [
        {
          name: 'Width (%)',
          value: [20, 25, 40, 50, 60, 75, 80, 'full', 'auto'].map(v => `w-${v}`),
        },
        {
          name: 'Height (%)',
          value: [20, 25, 40, 50, 60, 75, 80, 'full', 'auto'].map(v => `h-${v}`),
        },
      ],
    },
    {
      name: 'Text',
      children: [
        {
          name: 'Font Weight',
          value: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(v => `f-w-${v}00`),
        },
        {
          name: 'Font Size',
          value: [0, 10, 12, 14, 16, 18, 20].map(v => `f-s-${v}`),
        },
        {
          name: 'Font Style',
          value: ['font-italic', 'font-normal'],
        },
        {
          name: 'Text Align',
          value: ['text-center', 'text-right', 'text-left'],
        },
        {
          name: 'Text Decoration',
          value: ['text-none', 'text-underline', 'text-line-through'],
        },
        {
          name: 'Text Transform',
          value: ['text-capitalize', 'text-uppercase', 'text-lowercase'],
        },
        {
          name: 'White Space',
          value: ['text-normal', 'text-nowrap'],
        },
        {
          name: 'Word Wrap',
          value: ['text-break'],
        },
        {
          name: 'Text Overflow',
          value: ['text-ellipsis'],
        },
        {
          name: 'Text Color',
          value: ['text-reset', 'text-current'],
        },
      ],
    },
    {
      name: 'Misc',
      children: [
        {
          name: 'Vertical Align',
          value: ['align-top', 'align-middle', 'align-bottom'],
        },
        {
          name: 'Cursor',
          value: [
            'cursor-default',
            'cursor-pointer',
            'cursor-text',
            'cursor-move',
            'cursor-copy',
            'cursor-not-allowed',
          ],
        },
        {
          name: 'User Select',
          value: ['select-all', 'select-auto', 'select-none'],
        },
        {
          name: 'Pointer Events',
          value: ['pointer-events-none', 'pointer-events-auto'],
        },
        {
          name: 'Overflow',
          value: ['auto', 'hidden', 'visible', 'scroll'].map(v => `overflow[-[x|y]]-${v}`),
        },
        {
          name: 'Object Fit',
          value: [
            'object-cover',
            'object-contain',
            'object-fill',
            'object-none',
            'object-scale-down',
          ],
        },
        {
          name: 'Object Position',
          value: [
            'object-top',
            'object-bottom',
            'object-center',
            'object-left',
            'object-left-top',
            'object-left-right',
            'object-right',
            'object-right-top',
            'object-right-bottom',
          ],
        },
      ],
    },
  ];
}
