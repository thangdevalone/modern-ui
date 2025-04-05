"use client";
import React, { JSX, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export interface StepperProps {
  steps: {
    id: string | number;
    title: string;
    children?: React.FC | (() => JSX.Element);
  }[];
  activeStep?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
  lineLast?: boolean;
}

export const Stepper = ({
  steps,
  activeStep = -1,
  orientation = "horizontal",
  lineLast = false,
  className,
}: StepperProps) => {
  const isVertical = orientation === "vertical";
  const [isFirstRender, setIsFirstRender] = useState(true);
  
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <div
      className={cn(
        "w-full not-prose",
        isVertical
          ? "flex flex-col"
          : "flex flex-row items-center justify-between gap-2",
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isCurrent = index === activeStep;
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                "flex",
                isVertical
                  ? "flex-row items-center"
                  : "flex-col items-center justify-center",
                !isVertical && "flex-1 text-center"
              )}
            >
              <div className="relative">
                <motion.div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                    activeStep === -1
                      ? "bg-muted"
                      : isCompleted
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCurrent
                      ? "border-primary bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  )}
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: isCompleted && activeStep === -1 ? 1.1 : 1,
                    transition: { type: "spring", stiffness: 500, damping: 30 },
                  }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>
              </div>

              <div
                className={cn(
                  "flex flex-col",
                  isVertical ? "ml-4" : "mt-2 text-center w-full"
                )}
              >
                <span
                  className={cn(
                    "text-base font-semibold",
                    isCurrent
                      ? "text-primary"
                      : isCompleted || activeStep === -1
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>
            </div>

            {!isVertical && !isLast && (
              <div className="flex-1 h-0.5 relative overflow-hidden">
                <motion.div className="absolute top-0 h-full w-full bg-muted" />
                <motion.div
                  key={`line-${index}-${isCompleted}`}
                  className={cn("absolute top-0 h-full bg-primary")}
                  initial={{ width: isFirstRender ? (isCompleted ? "100%" : "0%") : (isCompleted ? "0%" : "100%") }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: isFirstRender ? 0 : 0.4 }}
                />
              </div>
            )}

            {isVertical && (
              <div className="flex flex-row gap-4">
                <div className="w-8">
                  {(!isLast || lineLast) && (
                    <div className="relative min-h-9 h-full w-full">
                      <motion.div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-muted" />
                      <motion.div
                        key={`v-line-${index}-${isCompleted}`}
                        className="absolute left-1/2 -translate-x-1/2 w-0.5"
                        initial={{
                          height: isFirstRender ? (isCompleted ? "100%" : "0%") : (isCompleted ? "0%" : "100%"),
                        }}
                        animate={{
                          height: isCompleted ? "100%" : "0%",
                          backgroundColor: isCompleted
                            ? "hsl(var(--primary))"
                            : "hsl(var(--muted))",
                        }}
                        transition={{ duration: isFirstRender ? 0 : 0.4 }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 pt-2 pb-4">
                  {step?.children && <step.children />}
                </div>
              </div>
            )}

            {!isVertical && step?.children && (
              <div className="w-full mt-2">
                <step.children />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
