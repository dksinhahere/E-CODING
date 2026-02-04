export function isDigit(c) {
  return c >= "0" && c <= "9";
}

export function isAlpha(c) {
  return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || c === "_";
}

export function isAlphaNumeric(c) {
  return isAlpha(c) || isDigit(c);
}
