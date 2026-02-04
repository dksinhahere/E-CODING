
export const TokenType = Object.freeze({
  // Single-character tokens.
  LEFT_PAREN: "LEFT_PAREN",
  RIGHT_PAREN: "RIGHT_PAREN",
  LEFT_BRACE: "LEFT_BRACE",
  RIGHT_BRACE: "RIGHT_BRACE",
  COMMA: "COMMA",
  DOT: "DOT",
  MINUS: "MINUS",
  PLUS: "PLUS",
  SEMICOLON: "SEMICOLON",
  SLASH: "SLASH",
  STAR: "STAR",

  // One or two character tokens.
  BANG: "BANG",
  BANG_EQUAL: "BANG_EQUAL",
  EQUAL: "EQUAL",
  EQUAL_EQUAL: "EQUAL_EQUAL",
  GREATER: "GREATER",
  GREATER_EQUAL: "GREATER_EQUAL",
  LESS: "LESS",
  LESS_EQUAL: "LESS_EQUAL",

  // Literals.
  IDENTIFIER: "IDENTIFIER",
  STRING: "STRING",
  NUMBER: "NUMBER",

  CLASS: "CLASS",
  IMPL : "IMPL",
  SELF : "SELF",
  NEW : "NEW",
  IMPORT : "IMPORT",
  TRUE: "True",
  FALSE : "False",
  NONE: "None",

  ERROR: "ERROR",
  EOF: "EOF",
});
