import fs from "fs/promises";
 
import path from "path";
 
export async function loadJestIgnorePaths(): Promise<string[]> {
  try {
    const configPath = path.join(process.cwd(), "jest.config.js");
 
    const configModule = require(configPath);
 
    return configModule.testPathIgnorePatterns || [];
  } catch (error) {
    console.warn(
      "[haktan-test-generator] jest.config.js not found or invalid."
    );
 
    return [];
  }
}