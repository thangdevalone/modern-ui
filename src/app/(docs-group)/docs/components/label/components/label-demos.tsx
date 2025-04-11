import React from "react";
import { Label } from "@/components/modern-ui/label";
import { Input } from "@/components/modern-ui/input";
import { Checkbox } from "@/components/modern-ui/checkbox";

export function BasicLabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
}

export function RequiredLabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="name" className="flex gap-1">
        Name <span className="text-red-500">*</span>
      </Label>
      <Input id="name" required />
    </div>
  );
}

export function LabelWithCheckboxDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" className="text-sm font-normal">
        Accept terms and conditions
      </Label>
    </div>
  );
} 