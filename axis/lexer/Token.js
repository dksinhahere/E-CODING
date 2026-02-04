export class Token {
  
  constructor({ type, source, start, length, line, message = null }) {
    this.type = type;
    this.source = source;
    this.start = start;
    this.length = length;
    this.line = line;
    this.message = message; // only meaningful when type === ERROR
  }

  get lexeme() {
    return this.source.slice(this.start, this.start + this.length);
  }

  toString() {
    if (this.message) return `${this.type} (line ${this.line}): ${this.message}`;
    return `${this.type} '${this.lexeme}' (line ${this.line})`;
  }
}
