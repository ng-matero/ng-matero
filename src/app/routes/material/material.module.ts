import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialRoutingModule } from './material-routing.module';

import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import {
  TabComponent,
  FoggyTabContentComponent,
  RainyTabContentComponent,
  SunnyTabContentComponent,
} from './tab/tab.component';
import { TreeComponent } from './tree/tree.component';
import { MenuComponent } from './menu/menu.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavBasicComponent } from './sidenav/basic-sidenav';
import { SidenavDualComponent } from './sidenav/dual-sidenav';
import { SidenavMobileComponent } from './sidenav/mobile-sidenav';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { InputComponent } from './input/input.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SelectComponent } from './select/select.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { BadgeComponent } from './badge/badge.component';
import { ChipsComponent } from './chips/chips.component';
import { IconComponent } from './icon/icon.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RippleComponent } from './ripple/ripple.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import {
  DialogComponent,
  DialogAddressFormComponent,
  DialogFruitComponent,
  DialogNeptuneComponent,
  DialogNeptuneIFrameComponent,
  DialogWelcomeComponent,
} from './dialog/dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SortComponent } from './sort/sort.component';
import { TableComponent } from './table/table.component';

import { BottomSheetOverviewComponent } from './bottom-sheet/bottom-sheet.component';

const COMPONENTS = [
  CardComponent,
  DividerComponent,
  ExpansionPanelComponent,
  GridListComponent,
  ListComponent,
  StepperComponent,
  TabComponent,
  FoggyTabContentComponent,
  RainyTabContentComponent,
  SunnyTabContentComponent,
  TreeComponent,
  MenuComponent,
  SidenavComponent,
  SidenavBasicComponent,
  SidenavDualComponent,
  SidenavMobileComponent,
  ToolbarComponent,
  AutocompleteComponent,
  CheckboxComponent,
  DatepickerComponent,
  FormFieldComponent,
  InputComponent,
  RadioButtonComponent,
  SelectComponent,
  SliderComponent,
  SlideToggleComponent,
  ButtonComponent,
  ButtonToggleComponent,
  BadgeComponent,
  ChipsComponent,
  IconComponent,
  ProgressSpinnerComponent,
  ProgressBarComponent,
  RippleComponent,
  BottomSheetComponent,
  DialogComponent,
  SnackBarComponent,
  TooltipComponent,
  PaginatorComponent,
  SortComponent,
  TableComponent,
];
const COMPONENTS_DYNAMIC = [
  DialogAddressFormComponent,
  DialogFruitComponent,
  DialogNeptuneComponent,
  DialogNeptuneIFrameComponent,
  DialogWelcomeComponent,
  BottomSheetOverviewComponent,
];

@NgModule({
  imports: [SharedModule, MaterialRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
  entryComponents: COMPONENTS_DYNAMIC,
})
export class MaterialModule {}
