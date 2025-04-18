"use client";

import { NumberCounter } from "@/components/modern-ui/number-counter";
import { Button } from "@/components/modern-ui/button";
import { useState } from "react";

export function DefaultNumberCounterDemo() {
  const [value, setValue] = useState(1000);
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-4xl font-bold">
        <NumberCounter value={value} startValue={0} />
      </div>
      <Button 
        onClick={() => setValue(prev => prev + 1000)}
      >
        Add 1000
      </Button>
    </div>
  );
}

export function CustomFormattedCounterDemo() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <p className="text-sm text-muted-foreground mb-2">Revenue</p>
        <span className="text-3xl font-bold">
          <NumberCounter 
            value={5280} 
            startValue={0}
            className="before:content-['$']"
          />
        </span>
      </div>
    </div>
  );
}

export function AnimatedNumberCounterDemo() {
  const [isVisible, setIsVisible] = useState(true);
  
  const stats = [
    { label: "Users", value: 25600, prefix: "", suffix: "+" },
    { label: "Revenue", value: 5280, prefix: "$", suffix: "" },
    { label: "Conversion", value: 14.8, prefix: "", suffix: "%", decimals: 1 },
  ];
  
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {isVisible && stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <p className="text-muted-foreground mb-1">{stat.label}</p>
            <span className="text-lg font-bold">
              {stat.prefix}
              <NumberCounter 
                value={stat.value} 
                startValue={0}
                delay={index * 0.2}
                decimalPlaces={stat.decimals || 0}
              />
              {stat.suffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 