"use client";

import { Textarea } from "@/components/modern-ui/textarea";
import { Label } from "@/components/modern-ui/label";

export function BasicTextAreaDemo() {
  return (
    <Textarea className="w-full max-w-sm bg-background" placeholder="Enter your message" />
  );
}

export function TextAreaWithLabelDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" className="bg-background" placeholder="Enter your message" />
    </div>
  );
}


export function TextAreaWithErrorDemo() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="bio" className="text-red-500">Bio</Label>
      <Textarea 
        id="bio" 
        className="border-red-500 focus-visible:ring-red-500" 
        placeholder="Tell us about yourself"
      />
      <p className="text-sm text-red-500">Bio is required</p>
    </div>
  );
}
