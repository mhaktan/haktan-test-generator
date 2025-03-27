import fs from "fs";

import path from "path";

import { parseComponentName, createSnapshotTestContent } from "../src/utils";

export async function generateSnapshotTest(componentPath: string) {
  // ❗️test dosyasıysa hiç işleme alma

  if (componentPath.endsWith(".test.tsx")) {
    console.log(`⚠️  Skipped (file is already a test): ${componentPath}`);

    return;
  }

  const componentName = parseComponentName(componentPath);

  const dirName = path.dirname(componentPath);

  const testFilePath = path.join(dirName, `${componentName}.test.tsx`);

  // Zaten test dosyası varsa geç

  if (fs.existsSync(testFilePath)) {
    console.log(`ℹ️  Skipped (already exists): ${testFilePath}`);

    return;
  }

  const relativeImport = "./" + path.basename(componentPath);

  const content = createSnapshotTestContent(componentName, relativeImport);

  try {
    fs.writeFileSync(testFilePath, content);

    console.log(`✅ Success Created: ${testFilePath}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      console.warn(`⚠️ File already exists: ${testFilePath}`);
    } else {
      console.error(`❌ Failed to write ${testFilePath}:`, error);
    }
  }
}
