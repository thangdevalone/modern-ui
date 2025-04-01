import React, {ComponentPropsWithoutRef} from 'react';
import {cn, generateId} from '@/lib/utils';
import {CodeBlock} from '@/components/code-block';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type TableProps = ComponentPropsWithoutRef<'table'>;
type TheadProps = ComponentPropsWithoutRef<'thead'>;
type TbodyProps = ComponentPropsWithoutRef<'tbody'>;
type TrProps = ComponentPropsWithoutRef<'tr'>;
type ThProps = ComponentPropsWithoutRef<'th'>;
type TdProps = ComponentPropsWithoutRef<'td'>;
type HrProps = ComponentPropsWithoutRef<'hr'>;
type ImgProps = ComponentPropsWithoutRef<'img'>;
type OlProps = ComponentPropsWithoutRef<'ol'>;
const components = {
  h1: ({className, children, ...props}: HeadingProps) => {
    const id = generateId(children as string);
    return (
      <h1
        id={id}
        className={cn("lg:text-4xl sm:text-3xl text-2xl font-bold mb-4 scroll-mt-16", className)}
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({className, children, ...props}: HeadingProps) => {
    const id = generateId(children as string);
    return (
      <h2
        id={id}
        className={cn("text-2xl font-semibold mb-4 mt-4 scroll-mt-16", className)}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({className, children, ...props}: HeadingProps) => {
    const id = generateId(children as string);
    return (
      <h3
        id={id}
        className={cn("text-xl font-medium mb-3 mt-4 scroll-mt-16", className)}
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({className, children, ...props}: HeadingProps) => {
    const id = generateId(children as string);
    return (
      <h4
        id={id}
        className={cn("text-lg font-medium mb-2 mt-4 scroll-mt-16", className)}
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: ({className, children, ...props}: ParagraphProps) => (
    <p
      className={cn("mb-4 mt-0 text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  ),
  a: ({className, href, children, ...props}: AnchorProps) => (
    <a
      className={cn("text-primary hover:underline", className)}
      href={href}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({className, children, ...props}: ListProps) => (
    <ul
      className={cn("list-disc pl-6 mb-4", className)}
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({className, children, ...props}: OlProps) => (
    <ol
      className={cn("list-decimal pl-6 mb-4", className)}
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({className, children, ...props}: ListItemProps) => (
    <li
      className={cn("mb-1", className)}
      {...props}
    >
      {children}
    </li>
  ),
  blockquote: ({className, children, ...props}: BlockquoteProps) => (
    <blockquote
      className={cn("border-l-4 border-muted pl-4 italic my-4", className)}
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({className, children, inline, ...props}: {
    className?: string;
    children?: React.ReactNode;
    inline?: boolean
  } & React.HTMLAttributes<HTMLElement>) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "";
    if (!language) {
      return (
        <code className={cn("bg-muted px-1 py-0.5 rounded text-sm font-mono", className)} {...props}>
          {children}
        </code>
      );
    }

    return (
      <CodeBlock code={String(children).replace(/\n$/, "")} language={language} maxHeight={300}/>
    );
  },
  table: ({className, children, ...props}: TableProps) => (
    <div
      className="overflow-x-auto my-6"
    >
      <table className={cn("w-full border-collapse", className)} {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({className, children, ...props}: TheadProps) => (
    <thead className={cn("bg-muted", className)} {...props}>
    {children}
    </thead>
  ),
  tbody: ({className, children, ...props}: TbodyProps) => (
    <tbody className={className} {...props}>
    {children}
    </tbody>
  ),
  tr: ({className, children, ...props}: TrProps) => (
    <tr className={cn("border-t border-border", className)} {...props}>
      {children}
    </tr>
  ),
  th: ({className, children, ...props}: ThProps) => (
    <th className={cn("px-4 py-2 text-left font-medium", className)} {...props}>
      {children}
    </th>
  ),
  td: ({className, children, ...props}: TdProps) => (
    <td className={cn("px-4 py-2", className)} {...props}>
      {children}
    </td>
  ),
  hr: ({className, ...props}: HrProps) => (
    <hr
      className={cn("!my-10 border-border", className)}
      {...props}
    />
  ),
  img: ({className, alt, ...props}: ImgProps) => (
    <img
      className={cn("rounded-md my-4", className)}
      alt={alt}
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}