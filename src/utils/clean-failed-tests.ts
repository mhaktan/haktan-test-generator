// src/utils/clean-failed-tests.ts
 
import fs from "fs";
import path from "path";
 
export const cleanFailedTests = (reportPath: string = "jest-report.json") => {
  if (!fs.existsSync(reportPath)) {
    console.error(`❌ Report file not found: ${reportPath}`);
    return;
  }
 
  const data = JSON.parse(fs.readFileSync(reportPath, "utf-8"));
  const failedTests = data.testResults
    .filter((test: any) => test.status === "failed")
    .map((test: any) => test.name);
 
  if (failedTests.length === 0) {
    console.log("✅ No failed tests found.");
    return;
  }
 
  failedTests.forEach((testPath: string) => {
    if (fs.existsSync(testPath)) {
      fs.unlinkSync(testPath);
      console.log(`🗑️ Deleted failed test file: ${testPath}`);
    }
  });
 
  console.log(`🔍 Total failed test files deleted: ${failedTests.length}`);
};