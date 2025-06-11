import { Injectable, inject, DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private readonly document = inject(DOCUMENT);

  private readonly selector = 'globalLoader';

  private getElement() {
    return this.document.getElementById(this.selector);
  }

  hide() {
    const el = this.getElement();
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.classList.contains('global-loader-hidden')) {
        el.className += ' global-loader-fade-out';
      }
    }
  }
}
