export interface User {
  [propName: string]: any;

  id: number | string | null;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface Token {
  access_token?: string;
  token?: string;
  token_type?: string;
}

export const guest: User = {
  id: null,
  name: 'unknown',
  email: 'unknown',
  avatar: './assets/images/avatar-default.jpg',
};
