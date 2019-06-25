import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [
  {
    state: 'dashboard',
    name: 'Dashboard',
    type: 'link',
    icon: 'explore',
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
    ],
  },
  {
    state: 'apps',
    name: 'APPS',
    type: 'sub',
    icon: 'apps',
    badge: [{ type: 'red', value: '5' }],
    children: [{ state: 'media', name: 'MEDIA', type: 'link' }],
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
    icon: 'view_carousel',
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
