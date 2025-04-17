"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { motion } from "motion/react";

export function AnimatedContent({
  children,
  customDelay = 0,
}: {
  children: React.ReactNode;
  customDelay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.5,
        delay: customDelay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
