import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="matero-branding" href="/">
      <img src="./assets/images/matero.png" class="matero-branding-logo-expanded" alt="logo" />
      <span class="matero-branding-name">MATERO</span>
    </a>
  `,
  styles: [
    `
      .matero-branding {
        display: inline-block;
        font-size: 16px;
        white-space: nowrap;
        border-radius: 50rem;
      }

      .matero-branding-logo-expanded {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        vertical-align: middle;

        [dir='rtl'] & {
          margin-right: auto;
          margin-left: 10px;
        }
      }

      .matero-branding-name {
        font-weight: normal;
        vertical-align: middle;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class BrandingComponent {}
