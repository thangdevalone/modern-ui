"use client";

import {useState} from "react";
import {Check, Copy} from "lucide-react";
import {cn} from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({value, className}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={cn("rounded-md p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors", className)}
    >
      {hasCopied ? <Check className="h-4 w-4"/> : <Copy className="h-4 w-4"/>}
    </button>
  );
}

