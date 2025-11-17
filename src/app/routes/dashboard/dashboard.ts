import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { SettingsService } from '@core';
import { MtxAlertModule } from '@ng-matero/extensions/alert';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { Subscription } from 'rxjs';
import { CHARTS, ELEMENT_DATA, MESSAGES, STATS } from './data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MatIconModule,
    MtxProgressModule,
    MtxAlertModule,
  ],
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly settings = inject(SettingsService);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  messages = MESSAGES;

  charts = CHARTS;
  chart1?: ApexCharts;
  chart2?: ApexCharts;

  stats = STATS;

  notifySubscription = Subscription.EMPTY;

  isShowAlert = true;

  introducingItems = [
    {
      name: 'Acrodata GUI',
      description: 'A JSON powered GUI for configurable panels.',
      link: 'https://github.com/acrodata/gui',
    },
    {
      name: 'Code Editor',
      description: 'The CodeMirror 6 wrapper for Angular.',
      link: 'https://github.com/acrodata/code-editor',
    },
    {
      name: 'Watermark',
      description: 'A watermark component that can prevent deletion.',
      link: 'https://github.com/acrodata/watermark',
    },
    {
      name: 'RnD Dialog',
      description: 'Resizable and draggable dialog based on CDK dialog.',
      link: 'https://github.com/acrodata/rnd-dialog',
    },
    {
      name: 'Gradient Picker',
      description: 'A powerful and beautiful gradient picker.',
      link: 'https://github.com/acrodata/gradient-picker',
    },
    {
      name: 'NG DnD',
      description: 'A toolkit for building complex drag and drop and very similar to react-dnd.',
      link: 'https://github.com/ng-dnd/ng-dnd',
    },
  ];

  introducingItem = this.introducingItems[this.getRandom(0, 4)];

  get isDark() {
    return this.settings.getThemeColor() == 'dark';
  }

  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(opts => {
      console.log(opts);

      this.updateCharts();
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initCharts());
  }

  ngOnDestroy() {
    this.chart1?.destroy();
    this.chart2?.destroy();

    this.notifySubscription.unsubscribe();
  }

  initCharts() {
    this.chart1 = new ApexCharts(document.querySelector('#chart1'), this.charts[0]);
    this.chart1?.render();
    this.chart2 = new ApexCharts(document.querySelector('#chart2'), this.charts[1]);
    this.chart2?.render();

    this.updateCharts();
  }

  updateCharts() {
    this.chart1?.updateOptions({
      chart: {
        foreColor: this.isDark ? '#ccc' : '#333',
        background: 'transparent',
      },
      tooltip: {
        theme: this.isDark ? 'dark' : 'light',
      },
      grid: {
        borderColor: this.isDark ? '#5a5a5a' : '#e1e1e1',
      },
      theme: {
        mode: this.isDark ? 'dark' : 'light',
      },
    });

    this.chart2?.updateOptions({
      chart: {
        foreColor: this.isDark ? '#ccc' : '#333',
        background: 'transparent',
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: this.isDark ? '#5a5a5a' : '#e1e1e1',
            connectorColors: this.isDark ? '#5a5a5a' : '#e1e1e1',
            fill: {
              colors: this.isDark ? ['#2c2c2c', '#222'] : ['#f2f2f2', '#fff'],
            },
          },
        },
      },
      tooltip: {
        theme: this.isDark ? 'dark' : 'light',
      },
      theme: {
        mode: this.isDark ? 'dark' : 'light',
      },
    });
  }

  onAlertDismiss() {
    this.isShowAlert = false;
  }

  getRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
