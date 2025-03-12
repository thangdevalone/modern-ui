import {remark} from 'remark';
import remarkHtml from 'remark-html';
import React from 'react';

export async function extractMarkdownContent(children: React.ReactNode) {
  const markdownContent = await remark()
    .use(remarkHtml)
    .process(children?.toString() || '');
  return markdownContent.toString();
}

