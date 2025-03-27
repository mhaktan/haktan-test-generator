import path from "path";
import fs from "fs";

export function loadJestIgnorePatterns(): string[] {
  const configPath = path.resolve("jest.config.js");
  if (!fs.existsSync(configPath)) return [];

  const config = require(configPath);
  return config.testPathIgnorePatterns || [];
}
