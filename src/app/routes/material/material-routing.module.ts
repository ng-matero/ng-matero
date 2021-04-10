import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { BadgeComponent } from './badge/badge.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { CardComponent } from './card/card.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChipsComponent } from './chips/chips.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DialogComponent } from './dialog/dialog.component';
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
import { TabComponent } from './tab/tab.component';
import { TABS_DEMO_ROUTES } from './tab/routes';
import { TableComponent } from './table/table.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TreeComponent } from './tree/tree.component';

const routes: Routes = [
  { path: 'autocomplete', component: AutocompleteComponent },
  { path: 'checkbox', component: CheckboxComponent },
  { path: 'datepicker', component: DatepickerComponent },
  { path: 'form-field', component: FormFieldComponent },
  { path: 'input', component: InputComponent },
  { path: 'radio', component: RadioButtonComponent },
  { path: 'select', component: SelectComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'slide-toggle', component: SlideToggleComponent },
  // layout
  { path: 'card', component: CardComponent },
  { path: 'divider', component: DividerComponent },
  { path: 'expansion', component: ExpansionPanelComponent },
  { path: 'grid-list', component: GridListComponent },
  { path: 'list', component: ListComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'tab', component: TabComponent, children: TABS_DEMO_ROUTES },
  { path: 'tree', component: TreeComponent },
  // navigation
  { path: 'menu', component: MenuComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'sidenav/basic', component: SidenavBasicComponent },
  { path: 'sidenav/dual', component: SidenavDualComponent },
  { path: 'sidenav/mobile', component: SidenavMobileComponent },
  { path: 'toolbar', component: ToolbarComponent },
  // buttons-indicators
  { path: 'button', component: ButtonComponent },
  { path: 'button-toggle', component: ButtonToggleComponent },
  { path: 'badge', component: BadgeComponent },
  { path: 'chips', component: ChipsComponent },
  { path: 'icon', component: IconComponent },
  {
    path: 'progress-spinner',
    component: ProgressSpinnerComponent,
    data: { title: 'Progress Spinner' },
  },
  { path: 'progress-bar', component: ProgressBarComponent },
  { path: 'ripple', component: RippleComponent },
  // popups-modals
  { path: 'bottom-sheet', component: BottomSheetComponent },
  { path: 'dialog', component: DialogComponent },
  { path: 'snack-bar', component: SnackBarComponent },
  { path: 'tooltip', component: TooltipComponent },
  // Data table
  { path: 'data-table/paginator', component: PaginatorComponent },
  { path: 'data-table/sort', component: SortComponent },
  { path: 'data-table/table', component: TableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
