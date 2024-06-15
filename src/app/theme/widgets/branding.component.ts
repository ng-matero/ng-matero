import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="branding" href="/">
      <img src="./assets/images/matero.png" class="brand-logo" alt="logo" />
      @if (showBrandText) {
        <span class="brand-text hide-small">MATERO</span>
      }
    </a>
  `,
  styles: `
    .branding {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
      text-decoration: none;
      white-space: nowrap;
      color: inherit;
    }

    .brand-logo {
      width: 2rem;
      height: 2rem;
      border-radius: 50rem;
    }

    .brand-text {
      margin: 0 0.5rem;
      font-size: 1rem;
      font-weight: 500;
    }
  `,
  standalone: true,
})
export class BrandingComponent {
  @Input() showBrandText = true;
}
