import fs from "fs";
import path from "path";

export async function getMarkdownContent(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), "contents", `${filename}.md`);
  console.log(filePath);
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return "# Error\nCould not load the requested content.";
  }
}
