import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabComponent } from './tab/tab.component';
import { TABS_DEMO_ROUTES } from './tab/routes';
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
import { DialogComponent } from './dialog/dialog.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SortComponent } from './sort/sort.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'autocomplete', component: AutocompleteComponent, data: { title: 'Autocomplete' } },
  { path: 'checkbox', component: CheckboxComponent, data: { title: 'Checkbox' } },
  { path: 'datepicker', component: DatepickerComponent, data: { title: 'Datepicker' } },
  { path: 'form-field', component: FormFieldComponent, data: { title: 'Form Field' } },
  { path: 'input', component: InputComponent, data: { title: 'Input' } },
  { path: 'radio', component: RadioButtonComponent, data: { title: 'Radio' } },
  { path: 'select', component: SelectComponent, data: { title: 'Select' } },
  { path: 'slider', component: SliderComponent, data: { title: 'Slider' } },
  { path: 'slide-toggle', component: SlideToggleComponent, data: { title: 'Slide Toggle' } },
  // layout
  { path: 'card', component: CardComponent, data: { title: 'Card' } },
  { path: 'divider', component: DividerComponent, data: { title: 'Divider' } },
  { path: 'expansion', component: ExpansionPanelComponent, data: { title: 'Expansion Panel' } },
  { path: 'grid-list', component: GridListComponent, data: { title: 'Grid' } },
  { path: 'list', component: ListComponent, data: { title: 'List' } },
  { path: 'stepper', component: StepperComponent, data: { title: 'Stepper' } },
  { path: 'tab', component: TabComponent, children: TABS_DEMO_ROUTES, data: { title: 'Tab' } },
  { path: 'tree', component: TreeComponent, data: { title: 'Tree' } },
  // navigation
  { path: 'menu', component: MenuComponent, data: { title: 'Menu' } },
  { path: 'sidenav', component: SidenavComponent, data: { title: 'Sidenav' } },
  { path: 'sidenav/basic', component: SidenavBasicComponent, data: { fullscreen: true } },
  { path: 'sidenav/dual', component: SidenavDualComponent, data: { fullscreen: true } },
  { path: 'sidenav/mobile', component: SidenavMobileComponent, data: { fullscreen: true } },
  { path: 'toolbar', component: ToolbarComponent, data: { title: 'Toolbar' } },
  // buttons-indicators
  { path: 'button', component: ButtonComponent, data: { title: 'Button' } },
  { path: 'button-toggle', component: ButtonToggleComponent, data: { title: 'Button Toggle' } },
  { path: 'badge', component: BadgeComponent, data: { title: 'Badge' } },
  { path: 'chips', component: ChipsComponent, data: { title: 'Chips' } },
  { path: 'icon', component: IconComponent, data: { title: 'Icon' } },
  {
    path: 'progress-spinner',
    component: ProgressSpinnerComponent,
    data: { title: 'Progress Spinner' },
  },
  { path: 'progress-bar', component: ProgressBarComponent, data: { title: 'Progress Bar' } },
  { path: 'ripple', component: RippleComponent, data: { title: 'Ripple' } },
  // popups-modals
  { path: 'bottom-sheet', component: BottomSheetComponent, data: { title: 'Button Sheet' } },
  { path: 'dialog', component: DialogComponent, data: { title: 'Dialog' } },
  { path: 'snack-bar', component: SnackBarComponent, data: { title: 'Snack Bar' } },
  { path: 'tooltip', component: TooltipComponent, data: { title: 'Tooltip' } },
  // Data table
  { path: 'data-table/paginator', component: PaginatorComponent, data: { title: 'Paginator' } },
  { path: 'data-table/sort', component: SortComponent, data: { title: 'Sort' } },
  { path: 'data-table/table', component: TableComponent, data: { title: 'Table' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
