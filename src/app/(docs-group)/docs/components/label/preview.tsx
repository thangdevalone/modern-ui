import React from "react";
import { Label } from "@/components/modern-ui/label";
import { Input } from "@/components/modern-ui/input";

export function PreviewLabel() {
  return (
    <div className="flex flex-col items-center justify-center p-6 border rounded-md">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </div>
  );
} 