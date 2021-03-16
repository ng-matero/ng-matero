export interface User {
  [propName: string]: any;
  id: number;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface Token {
  access_token?: string;
  token?: string;
  token_type?: string;
}
