"use client";

import { Badge } from "@/components/modern-ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
    category: "Components",
    items: [
      { href: "/docs/components/accordion", label: "Accordion", badge: "new" },
      { href: "/docs/components/alert", label: "Alert", badge: "new" },
      {
        href: "/docs/components/animated-gradient-text",
        label: "Animated Gradient Text",
        badge: "new",
      },
      { href: "/docs/components/avatar", label: "Avatar", badge: "new" },
      {
        href: "/docs/components/avatar-group",
        label: "Avatar Group",
        badge: "new",
      },
      { href: "/docs/components/badge", label: "Badge", badge: "new" },
      {
        href: "/docs/components/breadcrumb",
        label: "Breadcrumb",
        badge: "new",
      },
      { href: "/docs/components/button", label: "Button" },
      { href: "/docs/components/card", label: "Card", badge: "new" },
      { href: "/docs/components/command", label: "Command", badge: "new" },
      {
        href: "/docs/components/copy-button",
        label: "Copy Button",
        badge: "new",
      },
      {
        href: "/docs/components/date-picker",
        label: "Date Picker",
        badge: "new",
      },
      { href: "/docs/components/dialog", label: "Dialog", badge: "new" },
      { href: "/docs/components/fancy-tabs", label: "Fancy tab" },
      {
        href: "/docs/components/fluid-dropdown",
        label: "Fluid Dropdown",
        badge: "new",
      },
      { href: "/docs/components/input", label: "Input", badge: "new" },
      { href: "/docs/components/label", label: "Label", badge: "new" },
      { href: "/docs/components/popover", label: "Popover", badge: "new" },
      {
        href: "/docs/components/rainbow-button",
        label: "Rainbow Button",
        badge: "new",
      },
      { href: "/docs/components/sonner", label: "Sonner", badge: "new" },
      { href: "/docs/components/stepper", label: "Stepper", badge: "new" },
      { href: "/docs/components/switch", label: "Switch", badge: "new" },
      { href: "/docs/components/table", label: "Table", badge: "new" },
      { href: "/docs/components/textarea", label: "TextArea", badge: "new" },
      { href: "/docs/components/tooltip", label: "Tooltip", badge: "new" },
      { href: "/docs/components/underline-tabs", label: "Underline tab" },
      {
        href: "/docs/components/visually-hidden",
        label: "VisuallyHidden",
        badge: "new",
      },
    ],
  },
  {
    category: "React Hooks",
    items: [{ href: "/docs/hooks/use-click-away", label: "useClickAway" }],
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
