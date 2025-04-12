"use client";
import { Checkbox } from "@/components/modern-ui/checkbox";
import { Input } from "@/components/modern-ui/input";
import { Label } from "@/components/modern-ui/label";

export function BasicLabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
}
