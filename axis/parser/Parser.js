// parser/parser.js
import { TokenType } from "../lexer/TokenTypes.js";
import {
  Program,
  ExprStmt,
  LiteralExpr,
  GroupingExpr,
  UnaryExpr,
  BinaryExpr,
  LogicalExpr,
} from "./Ast.js";

export class ParseError extends Error {
  constructor(message, token) {
    super(message);
    this.name = "ParseError";
    this.token = token;
  }
}

export class Parser {
  /**
   * @param {object} lexer - your Lexer instance (must implement scanToken())
   * @param {(line:number, message:string)=>void} [onError]
   */
  constructor(lexer, onError = null) {
    this.lexer = lexer;
    this.onError = onError;

    this.current = null;
    this.previous = null;

    this.hadError = false;
    this.panicMode = false;

    this.advance(); // prime
  }

  parseProgram() {
    const statements = [];
    while (!this.check(TokenType.EOF)) {
      const stmt = this.declarationOrStatement();
      if (stmt) statements.push(stmt);
    }
    return new Program(statements);
  }

  // -------------------------
  // Statements
  // -------------------------
  declarationOrStatement() {
    // Later you’ll add: var/fun/class etc. For now: statement only.
    try {
      return this.statement();
    } catch (e) {
      if (e instanceof ParseError) {
        this.synchronize();
        return null;
      }
      throw e;
    }
  }

  statement() {
    if (this.match(TokenType.CLASS)) return this.classStatement();
    return this.expressionStatement();
  }

  classStatement()
  {
    return this.expressionStatement()
  }

  expressionStatement() {
    const startTok = this.current ?? this.previous;
    const expr = this.expression();
    this.consume(TokenType.SEMICOLON, "Expect ';' after expression.");
    return new ExprStmt(expr, startTok);
  }

  // -------------------------
  // Expressions (precedence)
  // -------------------------
  expression() {
    return this.or();
  }

  or() {
    let expr = this.and();

    while (this.match(TokenType.OR)) {
      const operator = this.previous;
      const right = this.and();
      expr = new LogicalExpr(expr, operator, right);
    }

    return expr;
  }

  and() {
    let expr = this.equality();

    while (this.match(TokenType.AND)) {
      const operator = this.previous;
      const right = this.equality();
      expr = new LogicalExpr(expr, operator, right);
    }

    return expr;
  }

  equality() {
    let expr = this.comparison();

    while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
      const operator = this.previous;
      const right = this.comparison();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  comparison() {
    let expr = this.term();

    while (
      this.match(
        TokenType.GREATER,
        TokenType.GREATER_EQUAL,
        TokenType.LESS,
        TokenType.LESS_EQUAL
      )
    ) {
      const operator = this.previous;
      const right = this.term();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  term() {
    let expr = this.factor();

    while (this.match(TokenType.MINUS, TokenType.PLUS)) {
      const operator = this.previous;
      const right = this.factor();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  factor() {
    let expr = this.unary();

    while (this.match(TokenType.SLASH, TokenType.STAR)) {
      const operator = this.previous;
      const right = this.unary();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  unary() {
    if (this.match(TokenType.BANG, TokenType.MINUS)) {
      const operator = this.previous;
      const right = this.unary();
      return new UnaryExpr(operator, right);
    }

    return this.primary();
  }

  primary() {
    if (this.match(TokenType.FALSE)) return new LiteralExpr(false, this.previous);
    if (this.match(TokenType.TRUE)) return new LiteralExpr(true, this.previous);
    if (this.match(TokenType.NIL)) return new LiteralExpr(null, this.previous);

    if (this.match(TokenType.NUMBER)) {
      const t = this.previous;
      const n = Number(t.lexeme);
      if (Number.isNaN(n)) this.error(t, `Invalid number literal '${t.lexeme}'.`);
      return new LiteralExpr(n, t);
    }

    if (this.match(TokenType.STRING)) {
      const t = this.previous;
      const raw = t.lexeme;
      const s = raw.length >= 2 ? raw.slice(1, -1) : "";
      return new LiteralExpr(s, t);
    }

    if (this.match(TokenType.LEFT_PAREN)) {
      const lparen = this.previous;
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
      return new GroupingExpr(expr, lparen);
    }

    this.error(this.current, "Expect expression.");
  }

  // -------------------------
  // Token helpers
  // -------------------------
  advance() {
    this.previous = this.current;

    for (;;) {
      this.current = this.lexer.scanToken();

      if (this.current.type !== TokenType.ERROR) break;

      // Scanner-level error token
      this.report(this.current.line, this.current.message ?? "Scanner error.");
      this.hadError = true;
    }
  }

  consume(type, message) {
    if (this.check(type)) {
      this.advance();
      return;
    }
    this.error(this.current, message);
  }

  match(...types) {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  check(type) {
    return this.current?.type === type;
  }

  // -------------------------
  // Error handling (panic-mode sync)
  // -------------------------
  error(token, message) {
    if (!this.panicMode) {
      this.panicMode = true;
      this.report(token?.line ?? 0, message);
    }
    this.hadError = true;
    throw new ParseError(message, token);
  }

  report(line, message) {
    if (this.onError) this.onError(line, message);
    else console.error(`[line ${line}] Error: ${message}`);
  }

  synchronize() {
    this.panicMode = false;

    if (!this.check(TokenType.EOF)) this.advance();

    while (!this.check(TokenType.EOF)) {
      if (this.previous?.type === TokenType.SEMICOLON) return;

      switch (this.current.type) {
        case TokenType.RETURN:
          return;
      }

      this.advance();
    }
  }

}
