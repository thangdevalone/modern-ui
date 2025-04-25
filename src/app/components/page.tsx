"use client"
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/modern-ui/button";
import { motion } from "motion/react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// Component list with categories
const components = [
  // Inputs
  {
    name: "Button",
    description: "Interactive button with multiple variants and sizes",
    category: "Inputs",
    path: "button",
    gradient: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
  },
  {
    name: "Input",
    description: "Form control for collecting user input data",
    category: "Inputs",
    path: "input",
    gradient: "from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20",
  },
  {
    name: "Checkbox",
    description: "Control for selecting multiple options from a set",
    category: "Inputs",
    path: "checkbox",
    gradient: "from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
  },
  {
    name: "Radio",
    description: "Control for selecting a single option from a set",
    category: "Inputs",
    path: "radio",
    gradient: "from-sky-50 to-cyan-50 dark:from-sky-950/20 dark:to-cyan-950/20",
  },
  {
    name: "Select",
    description: "Displays a list of options for the user to pick from",
    category: "Inputs",
    path: "select",
    gradient: "from-teal-50 to-green-50 dark:from-teal-950/20 dark:to-green-950/20",
  },
  {
    name: "Slider",
    description: "Control for selecting a value from a range",
    category: "Inputs",
    path: "slider",
    gradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
  },
  {
    name: "Switch",
    description: "Control for toggling between two states",
    category: "Inputs",
    path: "switch",
    gradient: "from-green-50 to-lime-50 dark:from-green-950/20 dark:to-lime-950/20",
  },
  {
    name: "Textarea",
    description: "Multi-line text input control",
    category: "Inputs",
    path: "textarea",
    gradient: "from-lime-50 to-yellow-50 dark:from-lime-950/20 dark:to-yellow-950/20",
  },
  
  // Display
  {
    name: "Accordion",
    description: "Vertically stacked interactive headings",
    category: "Display",
    path: "accordion",
    gradient: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
  },
  {
    name: "Alert",
    description: "Displays important messages to the user",
    category: "Display",
    path: "alert",
    gradient: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
  },
  {
    name: "Avatar",
    description: "Image element with fallback for user profiles",
    category: "Display",
    path: "avatar",
    gradient: "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
  },
  {
    name: "Badge",
    description: "Small visual indicator for labeling or status",
    category: "Display",
    path: "badge",
    gradient: "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
  },
  {
    name: "Card",
    description: "Container for grouping related content",
    category: "Display",
    path: "card",
    gradient: "from-rose-50 to-purple-50 dark:from-rose-950/20 dark:to-purple-950/20",
  },
  {
    name: "Calendar",
    description: "Date picker interface for selecting dates",
    category: "Display",
    path: "calendar",
    gradient: "from-fuchsia-50 to-violet-50 dark:from-fuchsia-950/20 dark:to-violet-950/20",
  },
  
  // Overlay
  {
    name: "Dialog",
    description: "Modal window overlaid on the UI",
    category: "Overlay",
    path: "dialog",
    gradient: "from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20",
  },
  {
    name: "Drawer",
    description: "Side-anchored panel that slides in from the edge",
    category: "Overlay",
    path: "drawer",
    gradient: "from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20",
  },
  {
    name: "Popover",
    description: "Floating content overlay triggered by a button",
    category: "Overlay",
    path: "popover",
    gradient: "from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20",
  },
  {
    name: "Sheet",
    description: "Side-anchored dialog with flexible width options",
    category: "Overlay",
    path: "sheet",
    gradient: "from-sky-50 to-cyan-50 dark:from-sky-950/20 dark:to-cyan-950/20",
  },
  {
    name: "Tooltip",
    description: "Floating label appearing on hover or focus",
    category: "Overlay",
    path: "tooltip",
    gradient: "from-cyan-50 to-teal-50 dark:from-cyan-950/20 dark:to-teal-950/20",
  },
  
  // Navigation
  {
    name: "Breadcrumb",
    description: "Navigation aid showing the current location hierarchy",
    category: "Navigation",
    path: "breadcrumb",
    gradient: "from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20",
  },
  {
    name: "Dropdown Menu",
    description: "Displays a menu when triggered by a button",
    category: "Navigation",
    path: "dropdown-menu",
    gradient: "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20",
  },
  {
    name: "Command",
    description: "Command palette for keyboard-first UI interactions",
    category: "Navigation",
    path: "command",
    gradient: "from-green-50 to-lime-50 dark:from-green-950/20 dark:to-lime-950/20",
  },
  {
    name: "Tabs",
    description: "Organize content into separate views",
    category: "Navigation",
    path: "tabs",
    gradient: "from-lime-50 to-yellow-50 dark:from-lime-950/20 dark:to-yellow-950/20",
  },
  {
    name: "Underline Tabs",
    description: "Stylized tabs with animated underline effect",
    category: "Navigation",
    path: "underline-tabs",
    gradient: "from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
  },
  
  // Special
  {
    name: "Animated Gradient Text",
    description: "Text with animated gradient effect",
    category: "Special",
    path: "animated-gradient-text",
    gradient: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
  },
  {
    name: "Rainbow Button",
    description: "Button with rainbow gradient effect",
    category: "Special",
    path: "rainbow-button",
    gradient: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20",
  },
  {
    name: "Number Counter",
    description: "Animated number counter with increment/decrement",
    category: "Special",
    path: "number-counter",
    gradient: "from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20",
  },
  {
    name: "Sparkles Text",
    description: "Text with animated sparkle effects",
    category: "Special",
    path: "sparkles-text",
    gradient: "from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20",
  },
  {
    name: "Typewriter Effect",
    description: "Text with typewriter animation effect",
    category: "Special",
    path: "typewriter-effect",
    gradient: "from-rose-50 to-purple-50 dark:from-rose-950/20 dark:to-purple-950/20",
  },
];

// Group components by category
const groupedComponents = components.reduce((acc, component) => {
  if (!acc[component.category]) {
    acc[component.category] = [];
  }
  acc[component.category].push(component);
  return acc;
}, {} as Record<string, typeof components>);

// Categories in the order we want to display them
const categoryOrder = ["Inputs", "Display", "Overlay", "Navigation", "Special"];

export default function ComponentsPage() {
  return (
    <main className="container mx-auto py-10 px-4 space-y-12 min-h-screen">
      <div className="flex flex-col gap-2">
        <Button variant="ghost" className="self-start flex items-center gap-2 mb-2" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-4xl font-bold tracking-tight">Component Showcase</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Explore all the beautiful components available in Modern UI. Each component is highly customizable and built with accessibility in mind.
        </p>
      </div>

      {categoryOrder.map((category) => (
        <section key={category} className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tight" id={category.toLowerCase()}>
            {category}
          </h2>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {groupedComponents[category]?.map((component) => (
              <ComponentCard 
                key={component.name}
                name={component.name}
                description={component.description}
                path={component.path}
                gradient={component.gradient}
              />
            ))}
          </motion.div>
        </section>
      ))}
    </main>
  );
}

function ComponentCard({
  name,
  description,
  path,
  gradient,
}: {
  name: string;
  description: string;
  path: string;
  gradient: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group relative overflow-hidden rounded-xl border bg-background shadow-md transition-all hover:shadow-lg flex flex-col h-full"
    >
      <div
        className={`flex h-[180px] items-center justify-center rounded-t-lg bg-gradient-to-br ${gradient} p-6`}
      >
        <ComponentPreview name={name} />
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="mt-4">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href={`/docs/components/${path}`}>
              View Documentation
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Component preview renderer based on component name
function ComponentPreview({ name }: { name: string }) {
  switch (name) {
    case "Button":
      return (
        <div className="flex gap-2">
          <div className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Button
          </div>
          <div className="rounded-md border bg-background px-4 py-2">
            Button
          </div>
        </div>
      );
    case "Input":
      return (
        <div className="w-full max-w-xs">
          <div className="text-sm font-medium mb-1.5">Email</div>
          <div className="h-10 w-full rounded-md border bg-background px-3 py-2 shadow-sm">
            example@email.com
          </div>
        </div>
      );
    case "Checkbox":
      return (
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded border flex items-center justify-center bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div className="text-sm">Remember me</div>
        </div>
      );
    case "Radio":
      return (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full border flex items-center justify-center p-[2px]">
              <div className="h-full w-full rounded-full bg-primary"></div>
            </div>
            <div className="text-sm">Option 1</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full border"></div>
            <div className="text-sm">Option 2</div>
          </div>
        </div>
      );
    case "Select":
      return (
        <div className="w-full max-w-xs">
          <div className="text-sm font-medium mb-1.5">Country</div>
          <div className="flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 shadow-sm">
            <span>United States</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      );
    case "Slider":
      return (
        <div className="w-full max-w-xs">
          <div className="h-2 w-full rounded-full bg-muted">
            <div className="h-full w-1/2 rounded-full bg-primary"></div>
            <div className="relative">
              <div className="absolute h-4 w-4 rounded-full border-2 border-primary bg-background" style={{ top: -12, left: "calc(50% - 8px)" }}></div>
            </div>
          </div>
        </div>
      );
    case "Switch":
      return (
        <div className="flex items-center gap-2">
          <div className="h-6 w-11 rounded-full bg-primary p-1">
            <div className="h-4 w-4 translate-x-5 rounded-full bg-background"></div>
          </div>
          <div className="text-sm">Enabled</div>
        </div>
      );
    case "Textarea":
      return (
        <div className="w-full max-w-xs">
          <div className="text-sm font-medium mb-1.5">Message</div>
          <div className="h-24 w-full rounded-md border bg-background p-3 shadow-sm">
            <div className="h-2 w-16 rounded bg-muted"></div>
          </div>
        </div>
      );
    case "Accordion":
      return (
        <div className="w-full max-w-xs space-y-1">
          <div className="flex items-center justify-between rounded-md bg-background p-3 border">
            <div className="h-4 w-24 rounded bg-muted"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="rounded-md bg-background p-3 border">
            <div className="h-2 w-full rounded bg-muted"></div>
            <div className="mt-2 h-2 w-4/5 rounded bg-muted"></div>
          </div>
        </div>
      );
    case "Alert":
      return (
        <div className="w-full max-w-xs rounded-md border bg-background p-3 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div className="font-medium">Note</div>
          </div>
          <div className="h-2 w-full rounded bg-muted"></div>
          <div className="mt-1 h-2 w-4/5 rounded bg-muted"></div>
        </div>
      );
    case "Avatar":
      return (
        <div className="flex -space-x-2">
          <div className="h-10 w-10 rounded-full border-2 border-background bg-muted shadow-sm">
            <div className="flex h-full w-full items-center justify-center text-xs font-medium">AB</div>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-background bg-purple-500 shadow-sm text-white">
            <div className="flex h-full w-full items-center justify-center text-xs font-medium">CD</div>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-background bg-green-500 shadow-sm text-white">
            <div className="flex h-full w-full items-center justify-center text-xs font-medium">EF</div>
          </div>
        </div>
      );
    case "Badge":
      return (
        <div className="flex gap-2">
          <div className="rounded-full bg-primary px-2.5 py-0.5 text-xs text-primary-foreground">
            New
          </div>
          <div className="rounded-full bg-muted px-2.5 py-0.5 text-xs">
            Tag
          </div>
        </div>
      );
    case "Card":
      return (
        <div className="w-full max-w-xs rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-2 h-4 w-20 rounded bg-muted"></div>
          <div className="h-2 w-full rounded bg-muted"></div>
          <div className="mt-1 h-2 w-4/5 rounded bg-muted"></div>
          <div className="mt-4 flex gap-2">
            <div className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground">
              Button
            </div>
            <div className="rounded border bg-background px-2 py-1 text-xs">
              Cancel
            </div>
          </div>
        </div>
      );
    case "Calendar":
      return (
        <div className="w-full max-w-xs rounded-lg border bg-background p-2 shadow-sm">
          <div className="mb-2 flex items-center justify-between px-2">
            <div className="h-4 w-24 rounded bg-muted"></div>
            <div className="flex gap-1">
              <div className="h-6 w-6 rounded-md bg-muted"></div>
              <div className="h-6 w-6 rounded-md bg-muted"></div>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="h-4 w-4 rounded bg-muted mx-auto"></div>
            ))}
            {Array.from({ length: 28 }).map((_, i) => (
              <div key={i + 7} className={`h-7 w-7 rounded-full flex items-center justify-center text-xs ${i === 14 ? 'bg-primary text-primary-foreground' : ''}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      );
    case "Dialog":
      return (
        <div className="w-full max-w-xs rounded-lg border bg-background p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="h-5 w-24 rounded bg-muted"></div>
            <div className="h-5 w-5 rounded-full bg-muted"></div>
          </div>
          <div className="mb-4">
            <div className="h-2 w-full rounded bg-muted"></div>
            <div className="mt-1 h-2 w-4/5 rounded bg-muted"></div>
          </div>
          <div className="flex justify-end gap-2">
            <div className="rounded border bg-background px-3 py-1 text-xs">
              Cancel
            </div>
            <div className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground">
              Confirm
            </div>
          </div>
        </div>
      );
    case "Sheet":
      return (
        <div className="relative h-28 w-full max-w-xs overflow-hidden rounded-lg border bg-background">
          <div className="absolute inset-y-0 right-0 w-32 border-l bg-background p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-4 w-16 rounded bg-muted"></div>
              <div className="h-4 w-4 rounded-full bg-muted"></div>
            </div>
            <div className="h-2 w-full rounded bg-muted"></div>
            <div className="mt-1 h-2 w-4/5 rounded bg-muted"></div>
          </div>
        </div>
      );
    case "Drawer":
      return (
        <div className="relative h-28 w-full max-w-xs overflow-hidden rounded-lg border bg-background">
          <div className="absolute bottom-0 left-0 right-0 h-20 border-t bg-background p-4 shadow-lg">
            <div className="mb-3 flex items-center justify-between">
              <div className="h-4 w-16 rounded bg-muted"></div>
              <div className="h-4 w-4 rounded-full bg-muted"></div>
            </div>
            <div className="h-2 w-full rounded bg-muted"></div>
            <div className="mt-1 h-2 w-4/5 rounded bg-muted"></div>
          </div>
        </div>
      );
    case "Popover":
    case "Tooltip":
      return (
        <div className="relative">
          <div className="rounded border bg-background px-3 py-1">
            Hover me
          </div>
          <div className="absolute mt-1 rounded border bg-background p-2 shadow-md">
            <div className="h-2 w-24 rounded bg-muted"></div>
            <div className="mt-1 h-2 w-16 rounded bg-muted"></div>
          </div>
        </div>
      );
    case "Breadcrumb":
      return (
        <div className="flex items-center gap-1 text-sm">
          <div>Home</div>
          <div>/</div>
          <div>Category</div>
          <div>/</div>
          <div className="font-medium">Product</div>
        </div>
      );
    case "Dropdown Menu":
      return (
        <div className="w-full max-w-xs">
          <div className="rounded border bg-background px-3 py-2 flex items-center justify-between">
            <div>Options</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <div className="mt-1 rounded border bg-background p-1 shadow-md">
            <div className="rounded px-2 py-1.5 hover:bg-muted">Option 1</div>
            <div className="rounded px-2 py-1.5 hover:bg-muted">Option 2</div>
          </div>
        </div>
      );
    case "Command":
      return (
        <div className="w-full max-w-xs rounded-lg border bg-background p-2 shadow-sm">
          <div className="flex items-center gap-2 border-b pb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <div className="h-4 w-full rounded bg-muted"></div>
          </div>
          <div className="pt-2">
            <div className="rounded px-2 py-1 bg-muted">Option 1</div>
            <div className="rounded px-2 py-1">Option 2</div>
          </div>
        </div>
      );
    case "Tabs":
    case "Underline Tabs":
      return (
        <div className="w-full max-w-xs">
          <div className="flex gap-2 border-b">
            <div className="border-b-2 border-primary px-3 py-2 text-sm font-medium">
              Tab 1
            </div>
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Tab 2
            </div>
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Tab 3
            </div>
          </div>
          <div className="p-3">
            <div className="h-2 w-full rounded bg-muted"></div>
            <div className="mt-1 h-2 w-4/5 rounded bg-muted"></div>
          </div>
        </div>
      );
    case "Animated Gradient Text":
      return (
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          Gradient Text
        </div>
      );
    case "Rainbow Button":
      return (
        <div className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px]">
          <div className="rounded-full bg-background px-4 py-1">
            Rainbow Button
          </div>
        </div>
      );
    case "Number Counter":
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border">-</div>
          <div className="text-xl font-medium">42</div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full border">+</div>
        </div>
      );
    case "Sparkles Text":
      return (
        <div className="relative text-lg font-bold">
          <span>✨</span> Sparkles Text <span>✨</span>
        </div>
      );
    case "Typewriter Effect":
      return (
        <div className="flex items-center text-lg font-bold">
          Type<span className="ml-1 h-5 w-0.5 animate-blink bg-current"></span>
        </div>
      );
    default:
      return (
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <span className="text-xs font-mono">UI</span>
        </div>
      );
  }
} 