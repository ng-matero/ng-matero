import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

export interface MenuTag {
  color: string; // Background Color
  value: string;
}

export interface MenuChildrenItem {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: MenuChildrenItem[];
}

export interface Menu {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  label?: MenuTag;
  badge?: MenuTag;
  children?: MenuChildrenItem[];
}

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menu: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>([]);

  getAll(): Observable<Menu[]> {
    return this.menu.asObservable();
  }

  set(menu: Menu[]): Observable<Menu[]> {
    this.menu.next(menu);
    return this.menu.asObservable();
  }

  add(menu: Menu) {
    const tmpMenu = this.menu.value;
    tmpMenu.push(menu);
    this.menu.next(tmpMenu);
  }

  reset() {
    this.menu.next([]);
  }

  getMenuItemName(routeArr: string[]): string {
    return this.getMenuLevel(routeArr)[routeArr.length - 1];
  }

  // TODO:
  getMenuLevel(routeArr: string[]): string[] {
    const tmpArr = [];
    this.menu.value.forEach(item => {
      if (item.route === routeArr[0]) {
        tmpArr.push(item.name);
        // Level1
        if (item.children && item.children.length) {
          item.children.forEach(itemlvl1 => {
            if (routeArr[1] && itemlvl1.route === routeArr[1]) {
              tmpArr.push(itemlvl1.name);
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (routeArr[2] && itemlvl2.route === routeArr[2]) {
                    tmpArr.push(itemlvl2.name);
                  }
                });
              }
            } else if (routeArr[1]) {
              // Level2
              if (itemlvl1.children && itemlvl1.children.length) {
                itemlvl1.children.forEach(itemlvl2 => {
                  if (itemlvl2.route === routeArr[1]) {
                    tmpArr.push(itemlvl1.name, itemlvl2.name);
                  }
                });
              }
            }
          });
        }
      }
    });
    return tmpArr;
  }

  recursMenuForTranslation(menu: Menu[] | MenuChildrenItem[], namespace: string) {
    menu.forEach(menuItem => {
      menuItem.name = `${namespace}.${menuItem.name}`;
      if (menuItem.children && menuItem.children.length > 0) {
        this.recursMenuForTranslation(menuItem.children, menuItem.name);
      }
    });
  }
}
