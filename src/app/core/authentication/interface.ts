export interface User {
  [propName: string]: any;

  id: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface TokenResponse {
  access_token?: string;
  token?: string;
  token_type?: string;
  expires_in?: number;
}

export interface TokenAttribute {
  accessToken: string;
  tokenType: string;
  exp: number;
}

export interface Token {
  accessToken: () => string;
  tokenType: () => string;
  exp: () => number;
  valid: () => boolean;
  refreshTime: () => number;
  headerValue: () => string;
}
