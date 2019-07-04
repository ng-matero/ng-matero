import {
  Component,
  OnInit,
  Injectable,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
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

  // Line Chart
  genChart1() {
    const data = [
      { time: '00:00', day: 'Today', total: 5.9 },
      { time: '00:00', day: 'Yesterday', total: 3.2 },
      { time: '01:00', day: 'Today', total: 1.3 },
      { time: '01:00', day: 'Yesterday', total: 0.8 },
      { time: '02:00', day: 'Today', total: 1.5 },
      { time: '02:00', day: 'Yesterday', total: 4.2 },
      { time: '03:00', day: 'Today', total: 0.2 },
      { time: '03:00', day: 'Yesterday', total: 0.4 },
      { time: '04:00', day: 'Today', total: 0.3 },
      { time: '04:00', day: 'Yesterday', total: 0.2 },
      { time: '05:00', day: 'Today', total: 1.0 },
      { time: '05:00', day: 'Yesterday', total: 1.3 },
      { time: '06:00', day: 'Today', total: 2.5 },
      { time: '06:00', day: 'Yesterday', total: 3.1 },
      { time: '07:00', day: 'Today', total: 5.2 },
      { time: '07:00', day: 'Yesterday', total: 6.5 },
      { time: '08:00', day: 'Today', total: 10.5 },
      { time: '08:00', day: 'Yesterday', total: 8.1 },
      { time: '09:00', day: 'Today', total: 8.2 },
      { time: '09:00', day: 'Yesterday', total: 9.7 },
      { time: '10:00', day: 'Today', total: 12.1 },
      { time: '10:00', day: 'Yesterday', total: 14.7 },
      { time: '11:00', day: 'Today', total: 13.9 },
      { time: '11:00', day: 'Yesterday', total: 17.2 },
      { time: '12:00', day: 'Today', total: 11.7 },
      { time: '12:00', day: 'Yesterday', total: 16.8 },
      { time: '13:00', day: 'Today', total: 13.2 },
      { time: '13:00', day: 'Yesterday', total: 9.3 },
      { time: '14:00', day: 'Today', total: 18.6 },
      { time: '14:00', day: 'Yesterday', total: 19.9 },
      { time: '15:00', day: 'Today', total: 26.1 },
      { time: '15:00', day: 'Yesterday', total: 23.2 },
      { time: '16:00', day: 'Today', total: 21.3 },
      { time: '16:00', day: 'Yesterday', total: 23.9 },
      { time: '17:00', day: 'Today', total: 25.2 },
      { time: '17:00', day: 'Yesterday', total: 18.1 },
      { time: '18:00', day: 'Today', total: 19.2 },
      { time: '18:00', day: 'Yesterday', total: 17.6 },
      { time: '19:00', day: 'Today', total: 14.8 },
      { time: '19:00', day: 'Yesterday', total: 13.1 },
      { time: '20:00', day: 'Today', total: 10.1 },
      { time: '20:00', day: 'Yesterday', total: 11.2 },
      { time: '21:00', day: 'Today', total: 6.9 },
      { time: '21:00', day: 'Yesterday', total: 8.4 },
      { time: '22:00', day: 'Today', total: 5.2 },
      { time: '22:00', day: 'Yesterday', total: 7.5 },
      { time: '23:00', day: 'Today', total: 3.8 },
      { time: '23:00', day: 'Yesterday', total: 6.7 },
    ];

    const chart = new G2.Chart({
      container: 'chart1',
      forceFit: true,
      height: 300,
      padding: [20, 20, 80, 50],
    });
    chart.source(data, {
      time: {
        range: [0, 1],
      },
    });
    chart.tooltip({
      crosshairs: {
        type: 'line',
      },
    });
    chart.axis('total', {
      label: {
        formatter: function formatter(val) {
          return val + 'K';
        },
      },
    });
    chart
      .line()
      .position('time*total')
      .color('day');
    chart
      .point()
      .position('time*total')
      .color('day')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1,
      });
    chart.render();

    return chart;
  }
  // Pie Chart
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
