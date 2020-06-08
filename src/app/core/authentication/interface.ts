export interface TokenModel {
  [key: string]: any;
  token: string | null | undefined;
}

export interface AuthReferrer {
  url?: string | null | undefined;
}
