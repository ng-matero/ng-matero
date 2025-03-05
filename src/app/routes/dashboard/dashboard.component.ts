import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { SettingsService } from '@core';
import { MtxAlertModule } from '@ng-matero/extensions/alert';
import { MtxProgressModule } from '@ng-matero/extensions/progress';
import { Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatTabsModule,
    MtxProgressModule,
    MtxAlertModule,
  ],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly ngZone = inject(NgZone);
  private readonly settings = inject(SettingsService);
  private readonly dashboardSrv = inject(DashboardService);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.dashboardSrv.getData();

  messages = this.dashboardSrv.getMessages();

  charts = this.dashboardSrv.getCharts();
  chart1?: ApexCharts;
  chart2?: ApexCharts;

  stats = this.dashboardSrv.getStats();

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
  ];

  introducingItem = this.introducingItems[this.getRandom(0, 3)];

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
    const isDark = this.settings.getThemeColor() == 'dark';

    this.chart1?.updateOptions({
      chart: {
        foreColor: isDark ? '#ccc' : '#333',
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
      },
      grid: {
        borderColor: isDark ? '#5a5a5a' : '#e1e1e1',
      },
    });

    this.chart2?.updateOptions({
      chart: {
        foreColor: isDark ? '#ccc' : '#333',
      },
      plotOptions: {
        radar: {
          polygons: {
            strokeColors: isDark ? '#5a5a5a' : '#e1e1e1',
            connectorColors: isDark ? '#5a5a5a' : '#e1e1e1',
            fill: {
              colors: isDark ? ['#2c2c2c', '#222'] : ['#f2f2f2', '#fff'],
            },
          },
        },
      },
      tooltip: {
        theme: isDark ? 'dark' : 'light',
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
