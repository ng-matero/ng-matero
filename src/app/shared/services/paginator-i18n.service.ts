import { Injectable, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class PaginatorI18nService {
  private readonly translate = inject(TranslateService);

  paginatorIntl = new MatPaginatorIntl();

  constructor() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => this.getPaginatorIntl());
  }

  getPaginatorIntl() {
    this.paginatorIntl.itemsPerPageLabel = this.translate.instant('paginator.items_per_page_label');
    this.paginatorIntl.previousPageLabel = this.translate.instant('paginator.previous_page_label');
    this.paginatorIntl.nextPageLabel = this.translate.instant('paginator.next_page_label');
    this.paginatorIntl.firstPageLabel = this.translate.instant('paginator.first_page_label');
    this.paginatorIntl.lastPageLabel = this.translate.instant('paginator.last_page_label');
    this.paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);

    this.paginatorIntl.changes.next();

    return this.paginatorIntl;
  }

  private getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('paginator.range_page_label_1', { length });
    }
    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return this.translate.instant('paginator.range_page_label_2', {
      startIndex: startIndex + 1,
      endIndex,
      length,
    });
  }
}
