"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {CodeBlock} from "./code-block";
import {cn} from "@/lib/utils";
import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({content, className}: MarkdownRendererProps) {
  const generateId = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  return (
    <div className={cn("prose prose-slate dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({className, children, ...props}) => {
            const id = generateId(children as string);
            return (
              <h1
                id={id}
                className={cn("text-4xl font-bold mb-4 scroll-mt-16", className)}
                {...props}
              >
                {children}
              </h1>
            );
          },
          h2: ({className, children, ...props}) => {
            const id = generateId(children as string);
            return (
              <h2
                id={id}
                className={cn("text-2xl font-semibold mb-4 mt-8 scroll-mt-16", className)}
                {...props}
              >
                {children}
              </h2>
            );
          },
          h3: ({className, children, ...props}) => {
            const id = generateId(children as string);
            return (
              <h3
                id={id}
                className={cn("text-xl font-medium mb-3 mt-6 scroll-mt-16", className)}
                {...props}
              >
                {children}
              </h3>
            );
          },
          h4: ({className, children, ...props}) => {
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
          h5: ({className, children, ...props}) => {
            const id = generateId(children as string);
            return (
              <h5
                id={id}
                className={cn("text-base font-medium mb-2 mt-4 scroll-mt-16", className)}
                {...props}
              >
                {children}
              </h5>
            );
          },
          h6: ({className, children, ...props}) => {
            const id = generateId(children as string);
            return (
              <h6
                id={id}
                className={cn("text-sm font-medium mb-2 mt-4 scroll-mt-16", className)}
                {...props}
              >
                {children}
              </h6>
            );
          },
          p: ({className, children, ...props}) => (
            <p
              className={cn("mb-4 text-muted-foreground", className)}
              {...props}
            >
              {children}
            </p>
          ),
          a: ({className, href, children, ...props}) => (
            <a
              className={cn("text-primary hover:underline", className)}
              href={href}
              {...props}
            >
              {children}
            </a>
          ),
          ul: ({className, children, ...props}) => (
            <ul
              className={cn("list-disc pl-6 mb-4", className)}
              {...props}
            >
              {children}
            </ul>
          ),
          ol: ({className, children, ...props}) => (
            <ol
              className={cn("list-decimal pl-6 mb-4", className)}
              {...props}
            >
              {children}
            </ol>
          ),
          li: ({className, children, ...props}) => (
            <li
              className={cn("mb-1", className)}
              {...props}
            >
              {children}
            </li>
          ),
          blockquote: ({className, children, ...props}) => (
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

            if (inline) {
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
          table: ({className, children, ...props}) => (
            <div
              className="overflow-x-auto my-6"
            >
              <table className={cn("w-full border-collapse", className)} {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({className, children, ...props}) => (
            <thead className={cn("bg-muted", className)} {...props}>
            {children}
            </thead>
          ),
          tbody: ({className, children, ...props}) => (
            <tbody className={className} {...props}>
            {children}
            </tbody>
          ),
          tr: ({className, children, ...props}) => (
            <tr className={cn("border-t border-border", className)} {...props}>
              {children}
            </tr>
          ),
          th: ({className, children, ...props}) => (
            <th className={cn("px-4 py-2 text-left font-medium", className)} {...props}>
              {children}
            </th>
          ),
          td: ({className, children, ...props}) => (
            <td className={cn("px-4 py-2", className)} {...props}>
              {children}
            </td>
          ),
          hr: ({className, ...props}) => (
            <hr
              className={cn("my-8 border-border", className)}
              {...props}
            />
          ),
          img: ({className, alt, ...props}) => (
            <img
              className={cn("rounded-md my-4", className)}
              alt={alt}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

