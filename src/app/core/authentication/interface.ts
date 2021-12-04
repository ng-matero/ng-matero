export interface User {
  [prop: string]: any;

  id?: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
  roles?: any[];
  permissions?: any[];
}

export interface Token {
  [prop: string]: any;

  access_token: string;
  token_type?: string;
  expires_in?: number;
  exp?: number;
  refresh_token?: string;
}

export interface RefreshToken {
  [k: string]: any;

  refresh_token?: string;
}

export interface Config {
  store_key: string;
  login_url: string;
  refresh_url: string;
  logout_url: string;
  profile_url: string;
  menu_url: string;
  user_defaults: User;
}
