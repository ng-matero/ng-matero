import { Injectable } from '@angular/core';

export interface Tag {
  color: string; // Background Color
  value: string;
}

export interface ChildrenItem {
  state: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: ChildrenItem[];
}

export interface Menu {
  state: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  label?: Tag;
  badge?: Tag;
  children?: ChildrenItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu: Menu[] = [];

  getAll(): Menu[] {
    return this.menu;
  }

  set(menu: Menu[]): Menu[] {
    this.menu = this.menu.concat(menu);
    return this.menu;
  }

  add(menu: Menu) {
    this.menu.push(menu);
  }

  getMenuItemName(stateArr: string[]): string {
    return this.getMenuLevel(stateArr)[stateArr.length - 1];
  }

  // TODO:
  getMenuLevel(stateArr: string[]): string[] {
    const tempArr = [];
    this.menu.map(item => {
      if (item.state === stateArr[0]) {
        tempArr.push(item.name);
        // Level1
        if (item.children && item.children.length) {
          item.children.forEach(itemlvl1 => {
            if (stateArr[1] && itemlvl1.state === stateArr[1]) {
              tempArr.push(itemlvl1.name);
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (stateArr[2] && itemlvl2.state === stateArr[2]) {
                    tempArr.push(itemlvl2.name);
                  }
                });
              }
            } else if (stateArr[1]) {
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (itemlvl2.state === stateArr[1]) {
                    tempArr.push(itemlvl1.name, itemlvl2.name);
                  }
                });
              }
            }
          });
        }
      }
    });
    return tempArr;
  }
}
