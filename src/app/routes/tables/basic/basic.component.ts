import { Component, OnInit } from '@angular/core';

import { MtxDialog } from '@ng-matero/extensions/dialog';

import { TableBasicService } from './basic.service';
import { TableDataService } from '../data.service';
import { TableBasicEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-table-basic',
  templateUrl: './basic.component.html',
  providers: [TableBasicService, TableDataService],
})
export class TableBasicComponent implements OnInit {
  columns = [];
  list = [];
  isLoading = true;

  constructor(
    private basicSrv: TableBasicService,
    private dataSrv: TableDataService,
    public dialog: MtxDialog
  ) {}

  ngOnInit() {
    this.columns = this.basicSrv.getColumns(
      record => this.edit(record),
      record => this.delete(record)
    );
    this.list = this.dataSrv.getData();
    this.isLoading = false;
  }

  edit(value: any) {
    const dialogRef = this.dialog.originalOpen(TableBasicEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
}
