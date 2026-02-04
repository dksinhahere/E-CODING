import { Lexer } from "./lexer/Lexer.js";
import { Parser } from "./parser/Parser.js";
import fs from "node:fs";

const args = process.argv.slice(2);

function compile_file(file) {
  let source;
  try {
    source = fs.readFileSync(file, "utf8");
  } catch (err) {
    console.log("Error while opening file " + file);
    console.error(err.message);
    return;
  }

  const lexer = new Lexer(source, (line, msg) => {
    console.error(`[line ${line}] Error: ${msg}`);
  });

  const parser = new Parser(lexer, (line, msg) => {
    console.error(`[line ${line}] Parser Error: ${msg}`);
  });

  const program = parser.parseProgram();

  console.log(program.debug())

  if (parser.hadError) {
    process.exitCode = 1;
  }
}

switch (args[0]) {
  case "compile": {
    const file = args[1];
    if (!file) {
      console.log("Use 'compile <file>'");
      break;
    }
    compile_file(file);
    break;
  }
  default:
    console.log("Use 'compile <file>'");
    console.log(args);
    break;
}
