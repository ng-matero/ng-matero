import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { AppSettings, SettingsService } from '@core';
import { CdkDragStart } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomizerComponent implements OnInit {
  @Output() optionsChange = new EventEmitter<AppSettings>();

  options = this.settings.getOptions();
  opened = false;
  dragging = false;

  constructor(private settings: SettingsService) {}

  ngOnInit() {}

  handleDragStart(event: CdkDragStart): void {
    this.dragging = true;
  }

  openPanel(event: MouseEvent) {
    if (this.dragging) {
      this.dragging = false;
      return;
    }
    this.opened = true;
  }

  closePanel() {
    this.opened = false;
  }

  togglePanel() {
    this.opened = !this.opened;
  }

  sendOptions() {
    this.optionsChange.emit(this.options);
  }
}
