export function capitalize(text: string) {
  return text.substring(0, 1).toUpperCase() + text.substring(1, text.length).toLowerCase();
}

export function now() {
  return new Date().getTime();
}

export function timeLeft(expiredAt: number) {
  return Math.max(0, expiredAt - now());
}
