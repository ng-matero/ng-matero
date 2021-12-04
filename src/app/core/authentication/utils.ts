import { fromByteArray, toByteArray } from 'base64-js';

export class Base64 {
  static encode(plainText: string): string {
    return fromByteArray(pack(plainText)).replace(
      /[+/=]/g,
      m => ({ '+': '-', '/': '_', '=': '' }[m] as string)
    );
  }

  static decode(b64: string): string {
    b64 = b64.replace(/[-_]/g, m => ({ '-': '+', '_': '/' }[m] as string));

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

export function filterObject<T>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined && value !== null)
  );
}

function isObject(obj: any) {
  return obj && typeof obj === 'object';
}

function deepMergeInner(target: any, source: any) {
  Object.keys(source).forEach((key: string) => {
    const targetValue = target[key];
    const sourceValue = source[key];

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue);
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = deepMergeInner(Object.assign({}, targetValue), sourceValue);
    } else {
      target[key] = sourceValue;
    }
  });

  return target;
}

export function mergeDeep<T>(target: any, ...sources: any[]): T {
  return sources.reduce((result, source) => {
    return deepMergeInner(result, source);
  }, target);
}
