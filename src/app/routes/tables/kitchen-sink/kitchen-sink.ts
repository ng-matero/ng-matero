import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';

import { PageHeader } from '@shared';
import { TablesService } from '../tables.service';
import { TablesKitchenSinkEdit } from './edit/edit';

@Component({
  selector: 'app-table-kitchen-sink',
  templateUrl: './kitchen-sink.html',
  styleUrl: './kitchen-sink.scss',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeader,
  ],
})
export class TablesKitchenSink implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly tablesSrv = inject(TablesService);
  private readonly dialog = inject(MtxDialog);

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('position'),
      field: 'position',
      sortable: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('name'),
      field: 'name',
      sortable: true,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: this.translate.stream('weight'),
      field: 'weight',
      minWidth: 100,
    },
    {
      header: this.translate.stream('symbol'),
      field: 'symbol',
      minWidth: 100,
    },
    {
      header: this.translate.stream('gender'),
      field: 'gender',
      minWidth: 100,
    },
    {
      header: this.translate.stream('mobile'),
      field: 'mobile',
      hide: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('tele'),
      field: 'tele',
      minWidth: 120,
      width: '120px',
    },
    {
      header: this.translate.stream('birthday'),
      field: 'birthday',
      minWidth: 180,
    },
    {
      header: this.translate.stream('city'),
      field: 'city',
      minWidth: 120,
    },
    {
      header: this.translate.stream('address'),
      field: 'address',
      minWidth: 180,
      width: '200px',
    },
    {
      header: this.translate.stream('company'),
      field: 'company',
      minWidth: 120,
    },
    {
      header: this.translate.stream('website'),
      field: 'website',
      minWidth: 180,
    },
    {
      header: this.translate.stream('email'),
      field: 'email',
      minWidth: 180,
    },
    {
      header: this.translate.stream('operation'),
      field: 'operation',
      minWidth: 140,
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('edit'),
          click: record => this.edit(record),
        },
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('close'),
            okText: this.translate.stream('ok'),
          },
          click: record => this.delete(record),
        },
      ],
    },
  ];
  list: any[] = [];
  isLoading = true;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  ngOnInit() {
    this.list = this.tablesSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TablesKitchenSinkEdit, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(() => console.log('The dialog was closed'));
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
