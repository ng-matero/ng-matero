import { Injectable } from '@angular/core';

export interface Badge {
  color: string; // Background Color
  value: string;
}

export interface ChildrenItem {
  state: string;
  name: string;
  type?: string;
  children?: ChildrenItem[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  label?: Badge;
  badge?: Badge;
  children?: ChildrenItem[];
}

const MENUITEMS: Menu[] = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'explore',
    badge: { color: 'red-500', value: '5' },
  },
  {
    state: 'design',
    name: 'Design',
    type: 'sub',
    icon: 'color_lens',
    label: { color: 'indigo-500', value: 'new' },
    children: [
      { state: 'colors', name: 'Color System', type: 'link' },
      { state: 'icons', name: 'Icons', type: 'link' },
    ],
  },
  {
    state: 'material',
    name: 'Material',
    type: 'sub',
    icon: 'favorite',
    children: [
      {
        state: 'form-controls',
        name: 'Form Controls',
        type: 'sub',
        children: [
          { state: 'autocomplete', name: 'Autocomplete', type: 'link' },
          { state: 'checkbox', name: 'Checkbox', type: 'link' },
          { state: 'datepicker', name: 'Datepicker', type: 'link' },
          { state: 'form-field', name: 'Form Field', type: 'link' },
          { state: 'input', name: 'Input', type: 'link' },
          { state: 'radio', name: 'Radio', type: 'link' },
          { state: 'select', name: 'Select', type: 'link' },
          { state: 'slider', name: 'Slider', type: 'link' },
          { state: 'slide-toggle', name: 'Slide Toggle', type: 'link' },
        ],
      },
      {
        state: 'navigation',
        name: 'Navigation',
        type: 'sub',
        children: [
          { state: 'menu', name: 'Menu', type: 'link' },
          { state: 'sidenav', name: 'Sidenav', type: 'link' },
          { state: 'toolbar', name: 'Toolbar', type: 'link' },
        ],
      },
      {
        state: 'layout',
        name: 'Layout',
        type: 'sub',
        children: [
          { state: 'card', name: 'Card', type: 'link' },
          { state: 'divider', name: 'Divider', type: 'link' },
          { state: 'expansion', name: 'Expansion Panel', type: 'link' },
          { state: 'grid-list', name: 'Grid List', type: 'link' },
          { state: 'list', name: 'List', type: 'link' },
          { state: 'stepper', name: 'Stepper', type: 'link' },
          { state: 'tab', name: 'Tab', type: 'link' },
          { state: 'tree', name: 'Tree', type: 'link' },
        ],
      },
      {
        state: 'buttons-indicators',
        name: 'Buttons & Indicators',
        type: 'sub',
        children: [
          { state: 'button', name: 'Button', type: 'link' },
          { state: 'button-toggle', name: 'Button Toggle', type: 'link' },
          { state: 'badge', name: 'Badge', type: 'link' },
          { state: 'chips', name: 'Chips', type: 'link' },
          { state: 'icon', name: 'Icon', type: 'link' },
          { state: 'progress-spinner', name: 'Progress Spinner', type: 'link' },
          { state: 'progress-bar', name: 'Progress Bar', type: 'link' },
          { state: 'ripple', name: 'Ripple', type: 'link' },
        ],
      },
      {
        state: 'popups-modals',
        name: 'Popups & Modals',
        type: 'sub',
        children: [
          { state: 'bottom-sheet', name: 'Bottom Sheet', type: 'link' },
          { state: 'dialog', name: 'Dialog', type: 'link' },
          { state: 'snack-bar', name: 'Snackbar', type: 'link' },
          { state: 'tooltip', name: 'tooltip', type: 'link' },
        ],
      },
      {
        state: 'data-table',
        name: 'Data Table',
        type: 'sub',
        children: [
          { state: 'paginator', name: 'Paginator', type: 'link' },
          { state: 'sort', name: 'Sort', type: 'link' },
          { state: 'table', name: 'Table', type: 'link' },
        ],
      },
    ],
  },
  {
    state: 'gallery',
    name: 'Gallery',
    type: 'sub',
    icon: 'image',
    label: { color: 'indigo-500', value: 'new' },
    children: [{ state: 'media', name: 'Media', type: 'link' }],
  },
  {
    state: 'forms',
    name: 'Forms',
    type: 'sub',
    icon: 'description',
  },
  {
    state: 'tables',
    name: 'Tables',
    type: 'sub',
    icon: 'format_line_spacing',
  },
  {
    state: 'profile',
    name: 'Profile',
    type: 'sub',
    icon: 'person',
  },
  {
    state: 'sessions',
    name: 'Sessions',
    type: 'sub',
    icon: 'question_answer',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
