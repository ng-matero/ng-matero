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

const MENUITEMS = [
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
      { state: 'calendar', name: 'CALENDAR' },
      { state: 'media', name: 'MEDIA' },
      { state: 'messages', name: 'MESSAGES' },
      { state: 'social', name: 'SOCIAL' },
      {
        state: 'chat',
        name: 'CHAT',
        type: 'sub',
        children: [
          { state: 'calendar', name: 'CALENDAR' },
          { state: 'media', name: 'MEDIA' },
          { state: 'messages', name: 'MESSAGES' },
          { state: 'social', name: 'SOCIAL' },
          { state: 'chat', name: 'CHAT' },
        ],
      },
    ],
  },

];

@Injectable()
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
