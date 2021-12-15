import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MaterialRoutingModule } from './material-routing.module';
import { CdkTableModule } from '@angular/cdk/table';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { BadgeComponent } from './badge/badge.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { BottomSheetOverviewComponent } from './bottom-sheet/bottom-sheet.component';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChipsComponent } from './chips/chips.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import {
  DialogComponent,
  DialogAddressFormComponent,
  DialogFruitComponent,
  DialogNeptuneComponent,
  DialogNeptuneIFrameComponent,
  DialogWelcomeComponent,
} from './dialog/dialog.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { IconComponent } from './icon/icon.component';
import { InputComponent } from './input/input.component';
import { ListComponent } from './list/list.component';
import { MenuComponent } from './menu/menu.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { RippleComponent } from './ripple/ripple.component';
import { SelectComponent } from './select/select.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SidenavBasicComponent } from './sidenav/basic-sidenav';
import { SidenavDualComponent } from './sidenav/dual-sidenav';
import { SidenavMobileComponent } from './sidenav/mobile-sidenav';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { SliderComponent } from './slider/slider.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { SortComponent } from './sort/sort.component';
import { StepperComponent } from './stepper/stepper.component';
import {
  TabComponent,
  FoggyTabContentComponent,
  RainyTabContentComponent,
  SunnyTabContentComponent,
} from './tab/tab.component';
import { TableComponent } from './table/table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TreeComponent } from './tree/tree.component';

const COMPONENTS: any[] = [
  AutocompleteComponent,
  BadgeComponent,
  BottomSheetComponent,
  ButtonComponent,
  ButtonToggleComponent,
  CardComponent,
  CheckboxComponent,
  ChipsComponent,
  DatepickerComponent,
  DialogComponent,
  DividerComponent,
  ExpansionPanelComponent,
  FormFieldComponent,
  GridListComponent,
  IconComponent,
  InputComponent,
  ListComponent,
  MenuComponent,
  PaginatorComponent,
  ProgressBarComponent,
  ProgressSpinnerComponent,
  RadioButtonComponent,
  RippleComponent,
  SelectComponent,
  SidenavComponent,
  SidenavBasicComponent,
  SidenavDualComponent,
  SidenavMobileComponent,
  SliderComponent,
  SlideToggleComponent,
  SnackBarComponent,
  SortComponent,
  StepperComponent,
  TabComponent,
  FoggyTabContentComponent,
  RainyTabContentComponent,
  SunnyTabContentComponent,
  TableComponent,
  ToolbarComponent,
  TooltipComponent,
  TreeComponent,
];
const COMPONENTS_DYNAMIC: any[] = [
  BottomSheetOverviewComponent,
  DialogAddressFormComponent,
  DialogFruitComponent,
  DialogNeptuneComponent,
  DialogNeptuneIFrameComponent,
  DialogWelcomeComponent,
];

@NgModule({
  imports: [SharedModule, CdkTableModule, MaterialRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_DYNAMIC],
})
export class MaterialModule {}
