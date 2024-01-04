import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-sidebar-notice',
  templateUrl: './sidebar-notice.component.html',
  styleUrls: ['./sidebar-notice.component.scss'],
  standalone: true,
  imports: [MatTabsModule],
})
export class SidebarNoticeComponent {}
