"use client";

import { Badge } from "@/components/modern-ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0 },
};

const badgeStyles: Record<string, string> = {
  new: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100 hover:bg-teal-200 dark:hover:bg-teal-800",
  pro: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-100 hover:bg-fuchsia-200 dark:hover:bg-fuchsia-800",
};

const links: {
  category: string;
  items: {
    href: string;
    label: string;
    badge?: string;
    disabled?: boolean;
  }[];
}[] = [
  {
    category: "Getting Started",
    items: [
      { href: "/docs/introduction", label: "Introduction" },
      { href: "/docs/installation", label: "Installation" },
      { href: "/docs/cli", label: "CLI", disabled: true },
    ],
  },
  {
    category: "Templates",
    items: [
      { href: "#dev-tool", label: "Dev Tool", badge: "pro", disabled: true },
      { href: "#saas", label: "SaaS", badge: "pro", disabled: true },
    ],
  },
  {
    category: "Base Components",
    items: [
      { href: "/docs/components/accordion", label: "Accordion" },
      { href: "/docs/components/alert", label: "Alert" },
      {
        href: "/docs/components/animated-gradient-text",
        label: "Animated Gradient Text",
      },
      { href: "/docs/components/avatar", label: "Avatar" },
      {
        href: "/docs/components/avatar-group",
        label: "Avatar Group",
      },
      { href: "/docs/components/badge", label: "Badge" },
      {
        href: "/docs/components/breadcrumb",
        label: "Breadcrumb",
      },
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/calendar", label: "Calendar", badge: "new" },
      { href: "/docs/components/card", label: "Card" },
      { href: "/docs/components/command", label: "Command" },
      {
        href: "/docs/components/copy-button",
        label: "Copy Button",
      },
      {
        href: "/docs/components/date-picker",
        label: "Date Picker",
      },
      { href: "/docs/components/dialog", label: "Dialog" },
      { href: "/docs/components/drawer", label: "Drawer", badge: "new" },
      { href: "/docs/components/fancy-tabs", label: "Fancy tab" },
      {
        href: "/docs/components/fluid-dropdown",
        label: "Fluid Dropdown",
      },
      { href: "/docs/components/input", label: "Input" },
      { href: "/docs/components/label", label: "Label" },
      { href: "/docs/components/popover", label: "Popover" },
      { href: "/docs/components/radio", label: "Radio", badge: "new" },
      {
        href: "/docs/components/rainbow-button",
        label: "Rainbow Button",
      },
      { href: "/docs/components/sheet", label: "Sheet", badge: "new" },
      { href: "/docs/components/sonner", label: "Sonner" },
      { href: "/docs/components/stepper", label: "Stepper" },
      { href: "/docs/components/switch", label: "Switch" },
      { href: "/docs/components/table", label: "Table" },
      { href: "/docs/components/textarea", label: "TextArea" },
      { href: "/docs/components/tooltip", label: "Tooltip" },
      { href: "/docs/components/underline-tabs", label: "Underline tab" },
      {
        href: "/docs/components/visually-hidden",
        label: "VisuallyHidden",
      },
    ],
  },
  {
    category: "React Hooks",
    items: [
      { href: "/docs/hooks/use-click-away", label: "useClickAway" },
      { href: "/docs/hooks/use-debounce", label: "useDebounce" },
      { href: "/docs/hooks/use-local-storage", label: "useLocalStorage" },
      { href: "/docs/hooks/use-media-query", label: "useMediaQuery" },
    ],
  },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="md:space-y-8 space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {links.map(({ category, items }) => (
        <div key={category}>
          <motion.h2 className="font-semibold mb-2" variants={itemVariants}>
            {category}
          </motion.h2>
          <motion.ul
            className="space-y-2"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {items.map(({ href, label, badge, disabled }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <motion.li
                  key={href}
                  className="flex items-center gap-2"
                  variants={itemVariants}
                >
                  <Link
                    href={disabled ? "#" : href}
                    className={cn(
                      "text-muted-foreground hover:text-foreground relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-width after:duration-300 hover:after:w-full transition-colors block",
                      {
                        "text-foreground! after:w-full": isActive,
                        "opacity-50 pointer-events-none cursor-not-allowed":
                          disabled,
                      }
                    )}
                  >
                    {label}
                  </Link>
                  {badge && (
                    <Badge variant="secondary" className={badgeStyles[badge]}>
                      {badge.charAt(0).toUpperCase() + badge.slice(1)}
                    </Badge>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      ))}
    </motion.nav>
  );
}
