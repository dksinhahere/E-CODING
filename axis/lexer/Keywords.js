import { TokenType } from "./TokenTypes.js";

export const KEYWORDS = new Map([
  
  ["class", TokenType.CLASS],
  ["new", TokenType.NEW],
  ["impl", TokenType.IMPL],
  ["self", TokenType.SELF],
  ["import", TokenType.IMPORT],
  ["True", TokenType.TRUE],
  ["False", TokenType.FALSE],
  ["None", TokenType.NONE]

]);
