export interface TOCItem {
  id: string;
  text: string;
  level: number;
  children?: TOCItem[];
}

export function extractTOC(markdown: string): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const matches = [...markdown.matchAll(headingRegex)];

  const headings: TOCItem[] = matches.map((match) => {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    return {id, text, level};
  });

  return buildTOCTree(headings);
}

function buildTOCTree(headings: TOCItem[]): TOCItem[] {
  if (!headings.length) return [];

  const result: TOCItem[] = [];
  const stack: TOCItem[] = [];

  for (const heading of headings) {
    const newItem: TOCItem = {...heading, children: []};

    if (stack.length === 0 || heading.level === stack[0].level) {
      result.push(newItem);
      stack.length = 0;
    } else {
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop();
      }

      const parent = stack[stack.length - 1];
      parent.children?.push(newItem);
    }

    stack.push(newItem);
  }

  return result;
}

