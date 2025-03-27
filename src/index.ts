// src/index.ts

import path from "path";
import fs from "fs";
import { parseComponentName, createSnapshotTestContent } from "./utils";
import { loadJestIgnorePatterns } from "./jestUtils";
import { scanComponents } from "../lib/scanner";

export async function run(projectPath: string) {
  const absoluteTarget = path.resolve(projectPath);
  const ignorePatterns = loadJestIgnorePatterns();

  const entries = await scanComponents(absoluteTarget, ignorePatterns);

  for (const file of entries) {
    const componentName = parseComponentName(file);
    const testFile = file.replace(/\.tsx$/, ".test.tsx");

    if (!fs.existsSync(testFile)) {
      const snapshotContent = createSnapshotTestContent(
        componentName,
        "./" + path.basename(file)
      );
      fs.writeFileSync(testFile, snapshotContent);
      console.log(`✅ Created: ${testFile}`);
    } else {
      console.log(`ℹ️  Skipped (already exists): ${testFile}`);
    }
  }
}
