"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {motion} from "framer-motion";
import {Badge} from '@/components/modern-ui/badge';
import clsx from "clsx";

const containerVariants = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {staggerChildren: 0.05},
  },
};

const itemVariants = {
  hidden: {opacity: 0, x: -10},
  show: {opacity: 1, x: 0},
};

const badgeStyles: Record<string, string> = {
  new: "bg-amber-100 text-amber-800 hover:bg-amber-100",
  pro: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
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
      {href: "/docs/introduction", label: "Introduction"},
      {href: "/docs/installation", label: "Installation"},
      {href: "/docs/cli", label: "CLI", disabled: true},
    ],
  },
  {
    category: "Templates",
    items: [
      {href: "#dev-tool", label: "Dev Tool", badge: "pro", disabled: true},
      {href: "#saas", label: "SaaS", badge: "pro", disabled: true},
    ],
  },
  {
    category: "Components",
    items: [
      {href: "/docs/components/button", label: "Button"},
    ],
  },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <motion.nav className="space-y-8" variants={containerVariants} initial="hidden" animate="show">
      {links.map(({category, items}) => (
        <div key={category}>
          <motion.h2 className="font-semibold mb-2" variants={itemVariants}>
            {category}
          </motion.h2>
          <motion.ul className="space-y-2" variants={containerVariants} initial="hidden" animate="show">
            {items.map(({href, label, badge, disabled}) => {
              const isActive = pathname.includes(href);
              return (
                <motion.li key={href} className="flex items-center gap-2" variants={itemVariants}>
                  <Link
                    href={disabled ? "#" : href}
                    className={clsx(
                      "text-muted-foreground hover:text-foreground relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-current after:transition-width after:duration-300 hover:after:w-full transition-colors block",
                      {
                        "text-foreground! after:w-full": isActive,
                        "opacity-50 pointer-events-none cursor-not-allowed": disabled,
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
