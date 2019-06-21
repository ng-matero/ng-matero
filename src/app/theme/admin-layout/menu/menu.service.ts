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
        state: 'layout',
        name: 'Layout',
        type: 'sub',
        children: [
          { state: 'card', name: 'Card', type: 'link' },
          { state: 'divider', name: 'Divider', type: 'link' },
          { state: 'expansion-panel', name: 'Expansion Panel', type: 'link' },
          { state: 'grid-list', name: 'Grid List', type: 'link' },
          { state: 'list', name: 'List', type: 'link' },
          { state: 'stepper', name: 'Stepper', type: 'link' },
          { state: 'tab', name: 'Tab', type: 'link' },
          { state: 'tree', name: 'Tree', type: 'link' },
        ],
      },
      {
        state: 'navigation',
        name: 'Navigation',
        type: 'sub',
        children: [
          { state: 'menu', name: 'Menu', type: 'link' },
          { state: 'sidenav', name: 'Sidenav', type: 'link' },
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
