"use client";

import { Button } from "@/components/modern-ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/modern-ui/command";
import { Book, Circle, FileText, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

const components = [
  { name: "Accordion", path: "/docs/components/accordion" },
  { name: "Alert", path: "/docs/components/alert" },
  { name: "Avatar", path: "/docs/components/avatar" },
  { name: "Badge", path: "/docs/components/badge" },
  { name: "Breadcrumb", path: "/docs/components/breadcrumb" },
  { name: "Button", path: "/docs/components/button" },
  { name: "Calendar", path: "/docs/components/calendar" },
  { name: "Card", path: "/docs/components/card" },
  { name: "Checkbox", path: "/docs/components/checkbox" },
  { name: "Command", path: "/docs/components/command" },
  { name: "Dialog", path: "/docs/components/dialog" },
  { name: "Drawer", path: "/docs/components/drawer" },
  { name: "Dropdown Menu", path: "/docs/components/dropdown-menu" },
  { name: "Form", path: "/docs/components/form" },
  { name: "Input", path: "/docs/components/input" },
  { name: "Label", path: "/docs/components/label" },
  { name: "Popover", path: "/docs/components/popover" },
  { name: "Radio", path: "/docs/components/radio" },
  { name: "Select", path: "/docs/components/select" },
  { name: "Sheet", path: "/docs/components/sheet" },
  { name: "Slider", path: "/docs/components/slider" },
  { name: "Switch", path: "/docs/components/switch" },
  { name: "Table", path: "/docs/components/table" },
  { name: "Tabs", path: "/docs/components/tabs" },
  { name: "Textarea", path: "/docs/components/textarea" },
  { name: "Tooltip", path: "/docs/components/tooltip" },
  // Special components
  {
    name: "Animated Gradient Text",
    path: "/docs/components/animated-gradient-text",
  },
  { name: "Avatar Group", path: "/docs/components/avatar-group" },
  { name: "Copy Button", path: "/docs/components/copy-button" },
  { name: "Date Picker", path: "/docs/components/date-picker" },
  { name: "Fluid Dropdown", path: "/docs/components/fluid-dropdown" },
  { name: "Number Counter", path: "/docs/components/number-counter" },
  { name: "Rainbow Button", path: "/docs/components/rainbow-button" },
  { name: "Sparkles Text", path: "/docs/components/sparkles-text" },
  { name: "Stepper", path: "/docs/components/stepper" },
  { name: "Terminal Block", path: "/docs/components/terminal-block" },
  { name: "Typewriter Effect", path: "/docs/components/typewriter-effect" },
  { name: "Underline Tabs", path: "/docs/components/underline-tabs" },
];

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
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
        className="relative h-9 shadow-none rounded-lg md:rounded-xl w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 min-w-[200px]"
        onClick={() => setOpen(true)}
      >
        <span className="hidden lg:inline-flex">Search components...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Type to search..."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            {components?.map((component) => (
              <CommandItem
                className="rounded-md"
                key={component.name}
                onSelect={() => runCommand(() => router.push(component.path))}
              >
                <Circle className="h-4 w-4" />
                {component.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Documentation">
            <CommandItem
              className="rounded-md"
              onSelect={() =>
                runCommand(() => router.push("/docs/installation"))
              }
            >
              <FileText className="mr-2 h-4 w-4" />
              Getting Started
            </CommandItem>
            <CommandItem
              className="rounded-md"
              onSelect={() => runCommand(() => router.push("/docs/components"))}
            >
              <Book className="mr-2 h-4 w-4" />
              Components
            </CommandItem>
            <CommandItem
              className="rounded-md"
              onSelect={() => runCommand(() => router.push("/docs/theming"))}
            >
              <Settings className="mr-2 h-4 w-4" />
              Theming
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Links">
            <CommandItem
              className="rounded-md"
              onSelect={() =>
                runCommand(() =>
                  window.open(
                    "https://github.com/thangdevalone/modern-ui",
                    "_blank"
                  )
                )
              }
            >
              GitHub Repository
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
