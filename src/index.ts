#!/usr/bin/env node

import { Command } from "commander";
import { count } from "./commands/count";
import { version } from "../package.json";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const program = new Command()
    .name("line-counter")
    .description("count how many line there are in a project directory")
    .version(version, "-v, --version", "display the version number");

  program.addCommand(count);

  program.parse();
}

main();
