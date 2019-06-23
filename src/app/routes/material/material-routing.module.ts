import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabComponent } from './tab/tab.component';
import { TreeComponent } from './tree/tree.component';
import { MenuComponent } from './menu/menu.component';
import { SidenavComponent } from './sidenav/sidenav.component';
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

const routes: Routes = [
  {
    path: 'form-controls/autocomplete',
    component: AutocompleteComponent,
    data: { title: 'Autocomplete' },
  },
  {
    path: 'form-controls/checkbox',
    component: CheckboxComponent,
    data: { title: 'Checkbox' },
  },
  {
    path: 'form-controls/datepicker',
    component: DatepickerComponent,
    data: { title: 'Datepicker' },
  },
  {
    path: 'form-controls/form-field',
    component: FormFieldComponent,
    data: { title: 'Form Field' },
  },
  {
    path: 'form-controls/input',
    component: InputComponent,
    data: { title: 'Input' },
  },
  {
    path: 'form-controls/radio',
    component: RadioButtonComponent,
    data: { title: 'Radio' },
  },
  {
    path: 'form-controls/select',
    component: SelectComponent,
    data: { title: 'Select' },
  },
  {
    path: 'form-controls/slider',
    component: SliderComponent,
    data: { title: 'Slider' },
  },
  {
    path: 'form-controls/slide-toggle',
    component: SlideToggleComponent,
    data: { title: 'Slide Toggle' },
  },
  // layout
  {
    path: 'layout/card',
    component: CardComponent,
    data: { title: 'Card' },
  },
  {
    path: 'layout/divider',
    component: DividerComponent,
    data: { title: 'Divider' },
  },
  {
    path: 'layout/expansion',
    component: ExpansionPanelComponent,
    data: { title: 'Expansion Panel' },
  },
  {
    path: 'layout/grid-list',
    component: GridListComponent,
    data: { title: 'Grid' },
  },
  {
    path: 'layout/list',
    component: ListComponent,
    data: { title: 'List' },
  },
  {
    path: 'layout/stepper',
    component: StepperComponent,
    data: { title: 'Stepper' },
  },
  {
    path: 'layout/tab',
    component: TabComponent,
    data: { title: 'Tab' },
  },
  {
    path: 'layout/tree',
    component: TreeComponent,
    data: { title: 'Tree' },
  },
  // navigation
  {
    path: 'navigation/menu',
    component: MenuComponent,
    data: { title: 'Menu' },
  },
  {
    path: 'navigation/sidenav',
    component: SidenavComponent,
    data: { title: 'Sidenav' },
  },
  {
    path: 'navigation/toolbar',
    component: ToolbarComponent,
    data: { title: 'Toolbar' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
