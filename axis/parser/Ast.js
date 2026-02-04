function tokInfo(t) {
  if (!t) return "";
  // avoid printing whole source
  const lex = t.lexeme ?? "";
  return `${t.type}${lex ? ` '${lex}'` : ""} @${t.line}`;
}

// -------------------
// Expressions
// -------------------
export class Expr {
  constructor(kind) {
    this.kind = kind;
  }
  debug() {
    return `<Expr ${this.kind}>`;
  }
  toString() {
    return this.debug();
  }
}

export class LiteralExpr extends Expr {
  constructor(value, token) {
    super("Literal");
    this.value = value;
    this.token = token;
    Object.freeze(this);
  }
  debug() {
    return JSON.stringify(this.value);
  }
}

export class GroupingExpr extends Expr {
  constructor(expression, token) {
    super("Grouping");
    this.expression = expression;
    this.token = token;
    Object.freeze(this);
  }
  debug() {
    return `(group ${this.expression.debug()})`;
  }
}

export class UnaryExpr extends Expr {
  constructor(operator, right) {
    super("Unary");
    this.operator = operator;
    this.right = right;
    Object.freeze(this);
  }
  debug() {
    return `(${this.operator.lexeme} ${this.right.debug()})`;
  }
}

export class BinaryExpr extends Expr {
  constructor(left, operator, right) {
    super("Binary");
    this.left = left;
    this.operator = operator;
    this.right = right;
    Object.freeze(this);
  }
  debug() {
    return `(${this.operator.lexeme} ${this.left.debug()} ${this.right.debug()})`;
  }
}

export class LogicalExpr extends Expr {
  constructor(left, operator, right) {
    super("Logical");
    this.left = left;
    this.operator = operator;
    this.right = right;
    Object.freeze(this);
  }
  debug() {
    return `(${this.operator.lexeme} ${this.left.debug()} ${this.right.debug()})`;
  }
}

// -------------------
// Statements
// -------------------
export class Stmt {
  constructor(kind) {
    this.kind = kind;
  }
  debug() {
    return `<Stmt ${this.kind}>`;
  }
  toString() {
    return this.debug();
  }
}

export class ExprStmt extends Stmt {
  constructor(expression, token) {
    super("ExprStmt");
    this.expression = expression;
    this.token = token;
    Object.freeze(this);
  }
  debug() {
    return `${this.expression.debug()};`;
  }
}

export class Program {
  constructor(statements) {
    this.kind = "Program";
    this.statements = statements;
    Object.freeze(this);
  }
  debug() {
    return this.statements.map(s => s.debug()).join("\n");
  }
  toString() {
    return this.debug();
  }
}
