import { TokenType } from "./TokenTypes.js";
import { Token } from "./Token.js";
import { KEYWORDS } from "./Keywords.js";
import { isDigit, isAlpha, isAlphaNumeric } from "./Chars.js";

class Lexer {
  
  constructor(source, onError = null) {
    this.source = source;
    this.onError = onError;

    this.start = 0;
    this.current = 0;
    this.line = 1;
  }

  isAtEnd() {
    return this.current >= this.source.length;
  }

  advance() {
    return this.source[this.current++];
  }

  peek() {
    if (this.isAtEnd()) return "\0";
    return this.source[this.current];
  }

  peekNext() {
    if (this.current + 1 >= this.source.length) return "\0";
    return this.source[this.current + 1];
  }

  match(expected) {
    if (this.isAtEnd()) return false;
    if (this.source[this.current] !== expected) return false;
    this.current++;
    return true;
  }

  makeToken(type) {
    return new Token({
      type,
      source: this.source,
      start: this.start,
      length: this.current - this.start,
      line: this.line,
    });
  }

  errorToken(message) {
    if (this.onError) this.onError(this.line, message);
    return new Token({
      type: TokenType.ERROR,
      source: this.source,
      start: this.start,
      length: 0,
      line: this.line,
      message,
    });
  }

  skipWhitespaceAndComments() {
    for (;;) {
      const c = this.peek();
      switch (c) {
        case " ":
        case "\r":
        case "\t":
          this.advance();
          break;

        case "\n":
          this.line++;
          this.advance();
          break;

        case "/":
          // // comment: consume until newline or end.
          if (this.peekNext() === "/") {
            while (this.peek() !== "\n" && !this.isAtEnd()) this.advance();
          } else {
            return;
          }
          break;

        default:
          return;
      }
    }
  }

  string() {
    while (this.peek() !== '"' && !this.isAtEnd()) {
      if (this.peek() === "\n") this.line++;
      this.advance();
    }

    if (this.isAtEnd()) return this.errorToken("Unterminated string.");

    // closing quote
    this.advance();
    return this.makeToken(TokenType.STRING);
  }

  number() {
    while (isDigit(this.peek())) this.advance();

    if (this.peek() === "." && isDigit(this.peekNext())) {
      this.advance(); // consume '.'
      while (isDigit(this.peek())) this.advance();
    }

    return this.makeToken(TokenType.NUMBER);
  }

  identifier() {
    while (isAlphaNumeric(this.peek())) this.advance();

    const text = this.source.slice(this.start, this.current);
    const type = KEYWORDS.get(text) ?? TokenType.IDENTIFIER;
    return this.makeToken(type);
  }

  scanToken() {
    this.skipWhitespaceAndComments();
    this.start = this.current;

    if (this.isAtEnd()) return this.makeToken(TokenType.EOF);

    const c = this.advance();

    if (isAlpha(c)) return this.identifier();
    if (isDigit(c)) return this.number();

    switch (c) {
      // Single-char tokens
      case "(": return this.makeToken(TokenType.LEFT_PAREN);
      case ")": return this.makeToken(TokenType.RIGHT_PAREN);
      case "{": return this.makeToken(TokenType.LEFT_BRACE);
      case "}": return this.makeToken(TokenType.RIGHT_BRACE);
      case ",": return this.makeToken(TokenType.COMMA);
      case ".": return this.makeToken(TokenType.DOT);
      case "-": return this.makeToken(TokenType.MINUS);
      case "+": return this.makeToken(TokenType.PLUS);
      case ";": return this.makeToken(TokenType.SEMICOLON);
      case "*": return this.makeToken(TokenType.STAR);

      // One or two char operators using match().
      case "!":
        return this.makeToken(this.match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
      case "=":
        return this.makeToken(this.match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
      case "<":
        return this.makeToken(this.match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
      case ">":
        return this.makeToken(this.match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER);

      case "/":
        // If we got here, it wasn't a // comment (handled in skipWhitespaceAndComments).
        return this.makeToken(TokenType.SLASH);

      case '"':
        return this.string();
    }

    return this.errorToken(`Unexpected character: '${c}'`);
  }

  *tokens() {
    for (;;) {
      const t = this.scanToken();
      yield t;
      if (t.type === TokenType.EOF || t.type === TokenType.ERROR) return;
    }
  }
}

export {Lexer}