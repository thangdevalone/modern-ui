"use client";

import * as React from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Button } from "@/components/modern-ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useClickAway } from "@/hooks/use-click-away";

export interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

interface FluidDropdownProps {
  categories: Category[];
  defaultCategoryId?: string;
  className?: string;
}
const IconWrapper = ({
  icon: Icon,
  isHovered,
  color,
}: {
  icon: React.ElementType;
  isHovered: boolean;
  color: string;
}) => (
  <motion.div
    className="w-4 h-4 mr-2 relative"
    initial={false}
    animate={isHovered ? { scale: 1.2 } : { scale: 1 }}
  >
    <Icon className="w-4 h-4" />
    {isHovered && (
      <motion.div
        className="absolute inset-0"
        style={{ color }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Icon className="w-4 h-4" strokeWidth={2} />
      </motion.div>
    )}
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const FluidDropdown = ({
  categories,
  defaultCategoryId,
  className,
}: FluidDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>(
    categories.find((c) => c.id === defaultCategoryId) || categories[0]
  );
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(
    null
  );
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  useClickAway(dropdownRef as React.RefObject<HTMLElement>, () =>
    setIsOpen(false)
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className={cn("relative", className)} ref={dropdownRef}>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full justify-between bg-background text-muted-foreground",
            "hover:bg-accent hover:text-accent-foreground",
            "transition-all duration-200 ease-in-out",
            "border border-input focus:border-ring",
            "h-10",
            isOpen && "bg-accent text-accent-foreground"
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="flex items-center">
            <IconWrapper
              icon={selectedCategory.icon}
              isHovered={false}
              color={selectedCategory.color}
            />
            {selectedCategory.label}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            whileHover={{ rotate: isOpen ? 180 : 180 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "20px",
              height: "20px",
            }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </Button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 1, y: 0, height: 0 }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                },
              }}
              exit={{
                opacity: 0,
                y: 0,
                height: 0,
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  mass: 1,
                },
              }}
              className="absolute left-0 right-0 top-full mt-2 z-50"
              onKeyDown={handleKeyDown}
            >
              <motion.div
                className={cn(
                  "absolute w-full rounded-lg border border-border",
                  "bg-popover p-1 shadow-lg"
                )}
                initial={{ borderRadius: 8 }}
                animate={{
                  borderRadius: 12,
                  transition: { duration: 0.2 },
                }}
                style={{ transformOrigin: "top" }}
              >
                <motion.div
                  className="py-2 relative"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div
                    layoutId="hover-highlight"
                    className="absolute inset-x-1 bg-accent rounded-md"
                    animate={{
                      y:
                        categories.findIndex(
                          (c) =>
                            (hoveredCategory || selectedCategory.id) === c.id
                        ) *
                          40 +
                        (categories.findIndex(
                          (c) =>
                            (hoveredCategory || selectedCategory.id) === c.id
                        ) > 0
                          ? 20
                          : 0),
                      height: 40,
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.15,
                      duration: 0.5,
                    }}
                  />
                  {categories.map((category, index) => (
                    <React.Fragment key={category.id}>
                      {index === 1 && (
                        <motion.div
                          className="mx-4 my-2.5 border-t border-border"
                          variants={itemVariants}
                        />
                      )}
                      <motion.button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsOpen(false);
                        }}
                        onHoverStart={() => setHoveredCategory(category.id)}
                        onHoverEnd={() => setHoveredCategory(null)}
                        className={cn(
                          "relative flex w-full items-center cursor-pointer px-4 py-2.5 text-sm rounded-md",
                          "transition-colors duration-150",
                          "focus:outline-none",
                          selectedCategory.id === category.id ||
                            hoveredCategory === category.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                        whileTap={{ scale: 0.98 }}
                        variants={itemVariants}
                      >
                        <IconWrapper
                          icon={category.icon}
                          isHovered={hoveredCategory === category.id}
                          color={category.color}
                        />
                        {category.label}
                      </motion.button>
                    </React.Fragment>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
};
