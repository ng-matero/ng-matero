import { fromByteArray, toByteArray } from 'base64-js';

export class Base64 {
  static encode(plainText: string): string {
    return fromByteArray(pack(plainText)).replace(/[+/=]/g, m => {
      return { '+': '-', '/': '_', '=': '' }[m] as string;
    });
  }

  static decode(b64: string): string {
    b64 = b64.replace(/[-_]/g, m => {
      return { '-': '+', '_': '/' }[m] as string;
    });
    while (b64.length % 4) {
      b64 += '=';
    }

    return unpack(toByteArray(b64));
  }
}

export function pack(str: string) {
  const bytes: any = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(...[str.charCodeAt(i)]);
  }

  return bytes;
}

export function unpack(byteArray: any) {
  return String.fromCharCode(...byteArray);
}

export const base64 = { encode: Base64.encode, decode: Base64.decode };

export function capitalize(text: string): string {
  return text.substring(0, 1).toUpperCase() + text.substring(1, text.length).toLowerCase();
}

export function currentTimestamp(): number {
  return Math.ceil(new Date().getTime() / 1000);
}

export function timeLeft(expiredAt: number): number {
  return Math.max(0, expiredAt - currentTimestamp());
}

export function filterObject<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined && value !== null)
  );
}

export function isEmptyObject(obj: Record<string, any>) {
  return Object.keys(obj).length === 0;
}
