import { Component, Output, EventEmitter, ViewEncapsulation, TemplateRef } from '@angular/core';
import { AppSettings, SettingsService } from '@core';
import { CdkDragStart } from '@angular/cdk/drag-drop';
import { MtxDrawer, MtxDrawerRef } from '@ng-matero/extensions/drawer';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomizerComponent {
  @Output() optionsChange = new EventEmitter<AppSettings>();

  options = this.settings.getOptions();

  dragging = false;

  drawerRef?: MtxDrawerRef;

  constructor(private settings: SettingsService, private drawer: MtxDrawer) {}

  onDragStart(event: CdkDragStart) {
    this.dragging = true;
  }

  openPanel(templateRef: TemplateRef<any>) {
    if (this.dragging) {
      this.dragging = false;
      return;
    }

    this.drawerRef = this.drawer.open(templateRef, {
      position: this.options.dir === 'rtl' ? 'left' : 'right',
      width: '320px',
    });
  }

  closePanel() {
    this.drawerRef?.dismiss();
  }

  sendOptions() {
    this.optionsChange.emit(this.options);
  }
}
