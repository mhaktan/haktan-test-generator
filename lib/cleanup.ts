import fs from "fs";
import path from "path";
 
export async function removeBrokenTests(projectPath: string) {
  const jestResultsPath = path.join(projectPath, "jest-results.json");
 
  if (!fs.existsSync(jestResultsPath)) {
    console.error(
      "❌ jest-results.json not found. Please run tests with --json --outputFile=jest-results.json"
    );
    return;
  }
 
  const rawResults = fs.readFileSync(jestResultsPath, "utf-8");
  const parsed = JSON.parse(rawResults);
 
  const failedTestFiles = new Set<string>();
 
  for (const result of parsed.testResults) {
    if (result.status === "failed") {
      failedTestFiles.add(result.name);
    }
  }
 
  if (failedTestFiles.size === 0) {
    console.log("✅ No failed tests found in jest-results.json");
    return;
  }
 
  console.log("🧹 Removing failed test files...");
 
  failedTestFiles.forEach((filePath) => {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🧹 Deleted: ${filePath}`);
    } else {
      console.warn(`⚠️  Skipped (not found): ${filePath}`);
    }
  });
 
  console.log("✅ Cleanup complete.");
}