import {
  Component,
  OnInit,
  Injectable,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as G2 from '@antv/g2';
import * as DataSet from '@antv/data-set';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private settings: SettingsService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // TODO:
    const chart1 = this.genChart1();
    const chart2 = this.genChart2();

    // NOTICE:
    this.settings.notice.subscribe(res => {
      chart1.forceFit();
      chart2.forceFit();
    });
  }

  genChart1() {
    const data = [
      { month: 'Jan', city: 'Tokyo', temperature: 7 },
      { month: 'Jan', city: 'London', temperature: 3.9 },
      { month: 'Feb', city: 'Tokyo', temperature: 6.9 },
      { month: 'Feb', city: 'London', temperature: 4.2 },
      { month: 'Mar', city: 'Tokyo', temperature: 9.5 },
      { month: 'Mar', city: 'London', temperature: 5.7 },
      { month: 'Apr', city: 'Tokyo', temperature: 14.5 },
      { month: 'Apr', city: 'London', temperature: 8.5 },
      { month: 'May', city: 'Tokyo', temperature: 18.4 },
      { month: 'May', city: 'London', temperature: 11.9 },
      { month: 'Jun', city: 'Tokyo', temperature: 21.5 },
      { month: 'Jun', city: 'London', temperature: 15.2 },
      { month: 'Jul', city: 'Tokyo', temperature: 25.2 },
      { month: 'Jul', city: 'London', temperature: 17 },
      { month: 'Aug', city: 'Tokyo', temperature: 26.5 },
      { month: 'Aug', city: 'London', temperature: 16.6 },
      { month: 'Sep', city: 'Tokyo', temperature: 23.3 },
      { month: 'Sep', city: 'London', temperature: 14.2 },
      { month: 'Oct', city: 'Tokyo', temperature: 18.3 },
      { month: 'Oct', city: 'London', temperature: 10.3 },
      { month: 'Nov', city: 'Tokyo', temperature: 13.9 },
      { month: 'Nov', city: 'London', temperature: 6.6 },
      { month: 'Dec', city: 'Tokyo', temperature: 9.6 },
      { month: 'Dec', city: 'London', temperature: 4.8 },
    ];

    const chart = new G2.Chart({
      container: 'chart1',
      forceFit: true,
      height: 300,
      padding: [20, 20, 80, 50],
    });
    chart.source(data, {
      month: {
        range: [0, 1],
      },
    });
    chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });
    chart.axis('temperature', {
      label: {
        formatter: function formatter(val) {
          return val + '°C';
        },
      },
    });
    chart
      .line()
      .position('month*temperature')
      .color('city');
    chart
      .point()
      .position('month*temperature')
      .color('city')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });
    chart.render();

    return chart;
  }

  genChart2() {
    const text = [
      'MIDNIGHT',
      '3 AM',
      '6 AM',
      '9 AM',
      'NOON',
      '3 PM',
      '6 PM',
      '9 PM',
    ];
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
      { type: '睡眠', value: 70 },
      { type: '淡茶 & 烟斗 & 冥想', value: 10 },
      { type: '写作', value: 10 },
      { type: '教课', value: 40 },
      { type: '酒吧吃肉配白酒', value: 40 },
      { type: '散步', value: 10 },
      { type: '拜访马大大', value: 30 },
      { type: '阅读', value: 30 },
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
