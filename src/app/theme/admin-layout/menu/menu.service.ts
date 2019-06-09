import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
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
    state: '/',
    name: 'HOME',
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
      { state: 'media', name: 'MEDIA' },
      { state: 'calendar', name: 'CALENDAR' },
      { state: 'messages', name: 'MESSAGES' },
      { state: 'social', name: 'SOCIAL' },
      { state: 'chat', name: 'CHAT', type: 'sub' },
    ],
  },
  {
    state: 'material',
    name: 'Material',
    type: 'sub',
    icon: 'favorite',
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

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
