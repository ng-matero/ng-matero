import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private _selector = 'globalLoader';

  constructor() {}

  private _getElement() {
    return document.getElementById(this._selector);
  }

  hide() {
    const el = this._getElement();
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.className.includes('global-loader-hidden')) {
        el.className += ' global-loader-fade-in';
      }
    }
  }
}
