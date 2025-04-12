import fs from "fs/promises";
import path from "path";
 
export async function scanComponents(
  dir: string,
  ignoredPaths: string[]
): Promise<string[]> {
  const results: string[] = [];
 
  async function walk(currentPath: string) {
    const entries = await fs.readdir(currentPath, { withFileTypes: true });
 
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(dir, fullPath).replace(/\\/g, "/");
 
      // Test dosyalarını ve ignore edilmiş yolları es geç
      const isIgnored =
        ignoredPaths.some((ignore) => relativePath.startsWith(ignore)) ||
        entry.name.endsWith(".test.tsx") ||
        relativePath.includes(".test.tsx");
 
      if (isIgnored) continue;
 
      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".tsx")) {
        const fileContent = await fs.readFile(fullPath, "utf-8");
 
        if (
          fileContent.includes("export default") ||
          fileContent.includes("React.FC") ||
          fileContent.includes("FC<")
        ) {
          results.push(fullPath);
        }
      }
    }
  }
 
  await walk(dir);
 
  return results;
}