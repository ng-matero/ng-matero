export interface User {
  id: number;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface TokenModel {
  access_token?: string;
  token_type?: string;
}
