export interface User {
  [key: string]: any;

  id: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface Token {
  [key: string]: any;

  access_token: string;
  token_type: string;
  expires_in?: number;
  exp?: number;
  refresh_token?: string;
}
