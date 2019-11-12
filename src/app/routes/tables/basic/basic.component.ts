import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TableBasicService } from './basic.service';
import { TableDataService } from '../data.service';
import { TableBasicEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-table-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  providers: [TableBasicService, TableDataService],
})
export class TableBasicComponent implements OnInit {
  columns = this.basicSrv.columns;
  displayedColumns: string[] = this.basicSrv.columns.map(item => item.index);
  dataSource = this.dataSrv.getData();

  constructor(
    private basicSrv: TableBasicService,
    private dataSrv: TableDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {}

  edit(value: any) {
    const dialogRef = this.dialog.open(TableBasicEditComponent, {
      width: '600px',
      data: { record: value },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
