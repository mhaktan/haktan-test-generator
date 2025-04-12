#!/usr/bin/env node
 
import { Command } from "commander";
 
import path from "path";
 
import { run } from "../src/index";
 
import { removeBrokenTests } from "../lib/cleanup";
 
const program = new Command();
 
program
 
  .name("haktan-test-generator")
 
  .description("React-admin component test generator CLI")
 
  .version("1.0.0");
 
program
 
  .command("generate")
 
  .requiredOption("--projectPath <path>", "Path to project")
 
  .action(async (options) => {
    const targetPath = path.resolve(process.cwd(), options.projectPath);
 
    console.log("[haktan-test-generator] Generating tests for:", targetPath);
 
    await run(targetPath); // <-- run() fonksiyonu çağrılıyor
  });
 
program
 
  .command("clean-broken")
 
  .requiredOption("--projectPath <path>", "Path to project")
 
  .description("Remove broken test files using jest-results.json")
 
  .action(async (options) => {
    const targetPath = path.resolve(process.cwd(), options.projectPath);
 
    await removeBrokenTests(targetPath);
  });
 
program.parse(process.argv);
 