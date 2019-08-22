import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '@core';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomizerComponent implements OnInit {
  options = this.settings.getOptions();
  opened = false;

  @Output() optionsEvent = new EventEmitter<object>();

  constructor(private settings: SettingsService) {}

  ngOnInit() {}

  togglePanel() {
    this.opened = !this.opened;
  }

  openPanel() {
    this.opened = true;
  }

  closePanel() {
    this.opened = false;
  }

  sendOptions() {
    this.optionsEvent.emit(this.options);
  }
}
