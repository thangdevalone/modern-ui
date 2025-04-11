"use client";

import { CopyButton } from "@/components/modern-ui/copy-button";

export function BasicCopyButtonDemo() {
  return (
    <CopyButton value="Text to be copied" />
  );
}

export function CodeBlockCopyButtonDemo() {
  return (
    <div className="bg-zinc-900 p-4 rounded-md flex items-center justify-between">
      <code className="text-sm text-zinc-400">npm install @thangdevalone/modern-ui</code>
      <CopyButton value="npm install @thangdevalone/modern-ui" />
    </div>
  );
}

export function CustomStyledCopyButtonDemo() {
  return (
    <CopyButton 
      value="Custom styled copy button" 
      className="p-2 bg-blue-500 rounded-full"
    />
  );
} 