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
    state: 'apps',
    name: 'APPS',
    type: 'sub',
    icon: 'apps',
    badge: [{ type: 'red', value: '5' }],
    children: [
      { state: 'media', name: 'MEDIA', type: 'link' },
      { state: 'calendar', name: 'CALENDAR', type: 'link' },
      { state: 'messages', name: 'MESSAGES', type: 'link' },
      { state: 'social', name: 'SOCIAL', type: 'link' },
      { state: 'chat', name: 'CHAT', type: 'link' },
    ],
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
          { state: 'grid', name: 'Grid', type: 'link' },
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
