export interface User {
  [prop: string]: any;

  id: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface Token {
  [prop: string]: any;

  access_token: string;
  token_type: string;
  expires_in?: number;
  exp?: number;
  refresh_token?: string;
}

export interface MenuTag {
  color: string; // background color
  value: string;
}

export interface MenuPermissions {
  only?: string | string[];
  except?: string | string[];
}

export interface MenuChildrenItem {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  children?: MenuChildrenItem[];
  permissions?: MenuPermissions;
}

export interface Menu {
  route: string;
  name: string;
  type: 'link' | 'sub' | 'extLink' | 'extTabLink';
  icon: string;
  label?: MenuTag;
  badge?: MenuTag;
  children?: MenuChildrenItem[];
  permissions?: MenuPermissions;
}
