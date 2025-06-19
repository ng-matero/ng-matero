import { Routes } from '@angular/router';

import { AutocompleteDemo } from './autocomplete/autocomplete';
import { BadgeDemo } from './badge/badge';
import { BottomSheetDemo } from './bottom-sheet/bottom-sheet';
import { ButtonToggleDemo } from './button-toggle/button-toggle';
import { ButtonDemo } from './button/button';
import { CardDemo } from './card/card';
import { CheckboxDemo } from './checkbox/checkbox';
import { ChipsDemo } from './chips/chips';
import { DatepickerDemo } from './datepicker/datepicker';
import { DialogDemo } from './dialog/dialog';
import { DividerDemo } from './divider/divider';
import { ExpansionPanelDemo } from './expansion-panel/expansion-panel';
import { FormFieldDemo } from './form-field/form-field';
import { GridListDemo } from './grid-list/grid-list';
import { IconDemo } from './icon/icon';
import { InputDemo } from './input/input';
import { ListDemo } from './list/list';
import { MenuDemo } from './menu/menu';
import { PaginatorDemo } from './paginator/paginator';
import { ProgressBarDemo } from './progress-bar/progress-bar';
import { ProgressSpinnerDemo } from './progress-spinner/progress-spinner';
import { RadioButtonDemo } from './radio-button/radio-button';
import { RippleDemo } from './ripple/ripple';
import { SelectDemo } from './select/select';
import { SidenavBasic } from './sidenav/basic-sidenav';
import { SidenavDual } from './sidenav/dual-sidenav';
import { SidenavMobile } from './sidenav/mobile-sidenav';
import { SidenavDemo } from './sidenav/sidenav';
import { SlideToggleDemo } from './slide-toggle/slide-toggle';
import { SliderDemo } from './slider/slider';
import { SnackBarDemo } from './snack-bar/snack-bar';
import { SortDemo } from './sort/sort';
import { StepperDemo } from './stepper/stepper';
import { TABS_DEMO_ROUTES } from './tab/routes';
import { TabDemo } from './tab/tab';
import { TableDemo } from './table/table';
import { ToolbarDemo } from './toolbar/toolbar';
import { TooltipDemo } from './tooltip/tooltip';
import { TreeDemo } from './tree/tree';

export const routes: Routes = [
  { path: 'autocomplete', component: AutocompleteDemo },
  { path: 'checkbox', component: CheckboxDemo },
  { path: 'datepicker', component: DatepickerDemo },
  { path: 'form-field', component: FormFieldDemo },
  { path: 'input', component: InputDemo },
  { path: 'radio', component: RadioButtonDemo },
  { path: 'select', component: SelectDemo },
  { path: 'slider', component: SliderDemo },
  { path: 'slide-toggle', component: SlideToggleDemo },
  // layout
  { path: 'card', component: CardDemo },
  { path: 'divider', component: DividerDemo },
  { path: 'expansion', component: ExpansionPanelDemo },
  { path: 'grid-list', component: GridListDemo },
  { path: 'list', component: ListDemo },
  { path: 'stepper', component: StepperDemo },
  { path: 'tab', component: TabDemo, children: TABS_DEMO_ROUTES },
  { path: 'tree', component: TreeDemo },
  // navigation
  { path: 'menu', component: MenuDemo },
  { path: 'sidenav', component: SidenavDemo },
  { path: 'sidenav/basic', component: SidenavBasic },
  { path: 'sidenav/dual', component: SidenavDual },
  { path: 'sidenav/mobile', component: SidenavMobile },
  { path: 'toolbar', component: ToolbarDemo },
  // buttons-indicators
  { path: 'button', component: ButtonDemo },
  { path: 'button-toggle', component: ButtonToggleDemo },
  { path: 'badge', component: BadgeDemo },
  { path: 'chips', component: ChipsDemo },
  { path: 'icon', component: IconDemo },
  { path: 'progress-spinner', component: ProgressSpinnerDemo },
  { path: 'progress-bar', component: ProgressBarDemo },
  { path: 'ripple', component: RippleDemo },
  // popups-modals
  { path: 'bottom-sheet', component: BottomSheetDemo },
  { path: 'dialog', component: DialogDemo },
  { path: 'snack-bar', component: SnackBarDemo },
  { path: 'tooltip', component: TooltipDemo },
  // Data table
  { path: 'data-table/paginator', component: PaginatorDemo },
  { path: 'data-table/sort', component: SortDemo },
  { path: 'data-table/table', component: TableDemo },
];
