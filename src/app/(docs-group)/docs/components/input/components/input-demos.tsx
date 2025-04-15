import React from "react";
import { Input } from "@/components/modern-ui/input";
import { Label } from "@/components/modern-ui/label";
import { Search } from "lucide-react";

export function BasicInputDemo() {
  return <Input className="bg-background w-full max-w-sm" placeholder="Email" />;
}

export function InputWithLabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" className="bg-background" placeholder="Email" />
    </div>
  );
}

export function InputWithIconDemo() {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Search" className="pl-8 bg-background" />
    </div>
  );
}

export function InputWithErrorDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="username" className="text-red-500">Username</Label>
      <Input 
        id="username" 
        className="border-red-500 focus-visible:ring-red-500 bg-background" 
        placeholder="Enter username"
      />
      <p className="text-sm text-red-500">Username is required</p>
    </div>
  );
}
