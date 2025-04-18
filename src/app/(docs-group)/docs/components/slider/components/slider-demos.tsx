"use client";

import { Slider } from "@/components/modern-ui/slider";
import { useState } from "react";

export function DefaultSliderDemo() {
  return (
    <div className="w-full max-w-md">
      <Slider defaultValue={[50]} max={100} step={1} />
    </div>
  );
}

export function SliderWithValuesDemo() {
  const [value, setValue] = useState([25]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between">
        <label className="text-sm font-medium">Volume: {value}%</label>
      </div>
      <Slider 
        value={value} 
        onValueChange={setValue} 
        max={100} 
        step={1}
      />
    </div>
  );
}

export function RangeSliderDemo() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex justify-between">
        <label className="text-sm font-medium">
          Price Range: ${range[0]} - ${range[1]}
        </label>
      </div>
      <Slider 
        value={range} 
        onValueChange={setRange} 
        max={100} 
        step={1}
      />
    </div>
  );
} 