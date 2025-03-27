"use client";
import React, {JSX} from 'react';
import {cn} from '@/lib/utils';
import {motion} from "framer-motion";
import {Check} from 'lucide-react';

export interface StepperProps {
  steps: {
    id: string | number
    title: string
    children?: React.FC | (() => JSX.Element)
  }[],
  activeStep?: number
  orientation?: "horizontal" | "vertical"
  className?: string,
  lineLast?: boolean
}

export const Stepper = ({steps, activeStep, orientation = "horizontal", lineLast = false, className}: StepperProps) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        "w-full not-prose",
        isVertical ? "flex flex-col" : "flex flex-row items-center justify-between",
        className,
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < (activeStep ?? 0);
        const isCurrent = index === (activeStep ?? 0);
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            <div className={cn("flex", isVertical ? "flex-row items-center" : "flex-col items-center")}>
              <div className="relative">
                <motion.div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                    !activeStep ? "bg-muted" :
                      isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCurrent
                          ? "border-primary text-primary"
                          : "border-muted-foreground/30 text-muted-foreground",
                  )}
                  initial={{scale: 0.8}}
                  animate={{
                    scale: (isCompleted && activeStep) ? 1.1 : 1,
                    transition: {type: "spring", stiffness: 500, damping: 30},
                  }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{opacity: 0, scale: 0.5}}
                      animate={{opacity: 1, scale: 1}}
                      transition={{duration: 0.3}}
                    >
                      <Check className="h-5 w-5"/>
                    </motion.div>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </motion.div>
              </div>

              <div className={cn("flex flex-col", isVertical ? "ml-4" : "mt-2 text-center")}>
                <span
                  className={cn(
                    "text-lg font-semibold",
                    isCurrent ? "text-primary" : (isCompleted || !activeStep) ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.title}
                </span>
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div className="w-8">
                {(!isLast || lineLast) && (
                  <div className={cn("relative", isVertical ? "min-h-9 h-full w-full" : "h-0.5 flex-1 mx-2")}>
                    <motion.div
                      className={cn("absolute", isVertical ? "left-0 h-full w-full" : "top-0 h-full w-full")}
                      initial={{
                        backgroundColor: "var(hsl(--muted))",
                      }}
                    />
                    <motion.div
                      className={cn(
                        "absolute",
                        isVertical ? "left-1/2 h-0 w-0.5 -translation-x-1/2" : "top-0 h-full w-0",
                        !activeStep ? "bg-muted" : "bg-primary",
                      )}
                      animate={{
                        [isVertical ? "height" : "width"]: (isCompleted || !activeStep) ? "100%" : "0%",
                      }}
                      transition={{duration: 0.4}}
                    />
                  </div>
                )}
              </div>
              <div className="flex-1 pt-2 pb-4">
                {step?.children && <step.children/>}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};