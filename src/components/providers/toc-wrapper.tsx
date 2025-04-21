import path from 'node:path';
import fs from 'node:fs';
import React from 'react';
import matter from 'gray-matter';
import TableOfContents from '@/components/shared/table-of-content';

export default function TocWrapper({file}: { file: string }) {
  const fullPath = path.join(process.cwd(), 'src', 'mdx', `${file}.mdx`);
  console.log(fullPath);
  if (!fs.existsSync(fullPath)) {
    return <div>Document not found.</div>;
  }

  const fileContent = fs.readFileSync(fullPath, 'utf8');

  const {content} = matter(fileContent);

  return <TableOfContents content={content}/>;
}