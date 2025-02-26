"use client";

import * as React from "react";
import {Book, FileText, Settings} from "lucide-react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 bg-neutral-50 shadow-none rounded-xl w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search documentation...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd
          className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Documentation">
            <CommandItem onSelect={() => runCommand(() => router.push("/docs/getting-started"))}>
              <FileText className="mr-2 h-4 w-4"/>
              Getting Started
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/docs/components"))}>
              <Book className="mr-2 h-4 w-4"/>
              Components
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push("/docs/theming"))}>
              <Settings className="mr-2 h-4 w-4"/>
              Theming
            </CommandItem>
          </CommandGroup>
          <CommandSeparator/>
          <CommandGroup heading="Links">
            <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/your-repo", "_blank"))}>
              GitHub Repository
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

