import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private selector = 'globalLoader';
  protected renderer: Renderer2;
  protected _document: Document;

  constructor(@Inject(DOCUMENT) document: any, rendererFactory: RendererFactory2) {
    this._document = document;
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private getElement() {
    return this._document.querySelector(`#${this.selector}`);
  }

  hide() {
    const el = this.getElement();
    if (el) {
      el.addEventListener('transitionend', () => {
        this.renderer.addClass(el, 'global-loader-hidden');
      });

      if (!el.classList.contains('global-loader-hidden')) {
        this.renderer.addClass(el, 'global-loader-fade-in');
      }
    }
  }
}
