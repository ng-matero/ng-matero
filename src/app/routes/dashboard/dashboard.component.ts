import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SettingsService } from '@core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

const MESSAGES = [
  {
    img: 'assets/images/avatars/avatar-1.jpg',
    subject: 'Hydrogen',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'assets/images/avatars/avatar-2.jpg',
    subject: 'Helium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'assets/images/avatars/avatar-3.jpg',
    subject: 'Lithium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'assets/images/avatars/avatar-4.jpg',
    subject: 'Beryllium',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
  {
    img: 'assets/images/avatars/avatar-6.jpg',
    subject: 'Boron',
    content: `Cras sit amet nibh libero, in gravida nulla.
     Nulla vel metus scelerisque ante sollicitudin commodo.`,
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
      .mat-raised-button {
        margin-right: 8px;
        margin-top: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  messages = MESSAGES;

  constructor(private settings: SettingsService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // TODO:
    const chart1 = this.genChart1();
    const chart2 = this.genChart2();

    // NOTE:
    this.settings.notice.subscribe(res => {
      chart1.forceFit();
      chart2.forceFit();
    });
  }

  // Line chart
  genChart1() {
    const data = [
      { date: '2019-6-24', indicator: 'UV', count: 7 },
      { date: '2019-6-24', indicator: 'Download', count: 3.9 },
      { date: '2019-6-25', indicator: 'UV', count: 6.9 },
      { date: '2019-6-25', indicator: 'Download', count: 4.2 },
      { date: '2019-6-26', indicator: 'UV', count: 9.5 },
      { date: '2019-6-26', indicator: 'Download', count: 5.7 },
      { date: '2019-6-27', indicator: 'UV', count: 14.5 },
      { date: '2019-6-27', indicator: 'Download', count: 8.5 },
      { date: '2019-6-28', indicator: 'UV', count: 18.4 },
      { date: '2019-6-28', indicator: 'Download', count: 11.9 },
      { date: '2019-6-29', indicator: 'UV', count: 21.5 },
      { date: '2019-6-29', indicator: 'Download', count: 15.2 },
      { date: '2019-6-30', indicator: 'UV', count: 25.2 },
      { date: '2019-6-30', indicator: 'Download', count: 17 },
      { date: '2019-7-1', indicator: 'UV', count: 26.5 },
      { date: '2019-7-1', indicator: 'Download', count: 16.6 },
      { date: '2019-7-2', indicator: 'UV', count: 23.3 },
      { date: '2019-7-2', indicator: 'Download', count: 14.2 },
      { date: '2019-7-3', indicator: 'UV', count: 18.3 },
      { date: '2019-7-3', indicator: 'Download', count: 10.3 },
      { date: '2019-7-4', indicator: 'UV', count: 13.9 },
      { date: '2019-7-4', indicator: 'Download', count: 6.6 },
      { date: '2019-7-5', indicator: 'UV', count: 9.6 },
      { date: '2019-7-5', indicator: 'Download', count: 4.8 },
    ];

    const chart = new G2.Chart({
      container: 'chart1',
      forceFit: true,
      height: 300,
      padding: [20, 20, 80, 50],
    });
    chart.source(data, {
      date: {
        alias: '日期',
        type: 'time',
        mask: 'MM-DD',
      },
    });
    chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });
    chart.axis('count', {
      label: {
        formatter: function formatter(val) {
          return val + 'K';
        },
      },
    });
    chart
      .line()
      .position('date*count')
      .color('indicator');
    chart
      .point()
      .position('date*count')
      .color('indicator')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });
    chart.render();

    return chart;
  }
  // Pie chart
  genChart2() {
    const text = ['MIDNIGHT', '3 AM', '6 AM', '9 AM', 'NOON', '3 PM', '6 PM', '9 PM'];
    const data = [];
    for (let i = 0; i < 24; i++) {
      const item: any = {};
      item.type = i + '';
      item.value = 10;
      data.push(item);
    }

    const DataView = DataSet.DataView;
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });

    const chart = new G2.Chart({
      container: 'chart2',
      forceFit: true,
      height: 300,
      padding: 50,
    });
    chart.legend(false);
    chart.tooltip({
      showTitle: false,
    });

    const bgView: any = chart.view();
    bgView.coord('theta', {
      innerRadius: 0.9,
    });
    bgView.source(dv);
    bgView
      .intervalStack()
      .position('percent')
      .color('type', ['rgba(255, 255, 255, 0)'])
      .style({
        stroke: '#444',
        lineWidth: 1,
      })
      .tooltip(false)
      .select(false);

    bgView.guide().text({
      position: ['50%', '50%'],
      content: '24 hours',
      style: {
        lineHeight: '240px',
        fontSize: '30',
        fill: '#262626',
        textAlign: 'center',
      },
    });

    const intervalView = chart.view();
    intervalView.source(data);
    intervalView.coord('polar', {
      innerRadius: 0.9,
    });
    intervalView.axis(false);
    intervalView
      .interval()
      .position('type*value')
      .size('type', val => {
        if (val % 3 === 0) {
          return 4;
        } else {
          return 0;
        }
      })
      .color('#444')
      .tooltip(false)
      .label('type', val => {
        if (val % 3 === 0) {
          return text[val / 3];
        }
        return '';
      });

    const userData = [
      { type: '社交', value: 60 },
      { type: '健身', value: 10 },
      { type: '购物', value: 10 },
      { type: '视频', value: 40 },
      { type: '其它', value: 20 },
      { type: '学习', value: 10 },
      { type: '音乐', value: 30 },
      { type: '游戏', value: 30 },
    ];
    const userDv = new DataView();
    userDv.source(userData).transform({
      type: 'percent',
      field: 'value',
      dimension: 'type',
      as: 'percent',
    });
    const pieView = chart.view();
    pieView.source(userDv, {
      percent: {
        formatter: function formatter(val) {
          return (val * 100).toFixed(2) + '%';
        },
      },
    });
    pieView.coord('theta', {
      innerRadius: 0.75,
    });
    pieView
      .intervalStack()
      .position('percent')
      .color('type')
      .label('type', {
        offset: 40,
      })
      .select(false);

    chart.render();

    return chart;
  }
}
