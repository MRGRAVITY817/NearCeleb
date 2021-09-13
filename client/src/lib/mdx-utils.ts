import path from "path";
import fs from "fs";
import matter from "gray-matter";

// Read docs directory
export const DOCS_PATH = path.join(process.cwd(), "src/docs");
export const docsFilePaths = fs
  .readdirSync(DOCS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export interface DocsContentProps {
  title: string;
  docsPath: string;
}
