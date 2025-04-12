import fs from "fs";
 
import path from "path";
 
import { parseComponentName, createSnapshotTestContent } from "../src/utils";
 
export async function generateSnapshotTest(componentPath: string) {
  const componentName = parseComponentName(componentPath);
 
  const dirName = path.dirname(componentPath);
 
  // Eğer bu dosya zaten bir test dosyasıysa veya test dosyası varsa, atla
 
  if (componentPath.endsWith(".test.tsx")) {
    console.log(`ℹ️  Skipped (already a test file): ${componentPath}`);
 
    return;
  }
 
  const testFilePath = path.join(dirName, `${componentName}.test.tsx`);
 
  if (fs.existsSync(testFilePath)) {
    console.log(`ℹ️  Skipped (already exists): ${testFilePath}`);
 
    return;
  }
 
  // Doğru import için sadece dosya adını al, uzantı olmadan
 
  const importPath = "./" + path.basename(componentPath, ".tsx");
 
  const content = createSnapshotTestContent(componentName, importPath);
 
  try {
    fs.writeFileSync(testFilePath, content);
 
    console.log(`✅ Created: ${testFilePath}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EEXIST") {
      console.warn(`⚠️ File already exists: ${testFilePath}`);
    } else {
      console.error(`❌ Failed to write ${testFilePath}:`, error);
    }
  }
}