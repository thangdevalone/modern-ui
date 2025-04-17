"use client";

import { useState } from "react";
import { Button } from "@/components/modern-ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/modern-ui/sheet";
import { Label } from "@/components/modern-ui/label";
import { Input } from "@/components/modern-ui/input";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 text-sm">Name</span>
            <input
              className="col-span-3 h-10 rounded-md border px-3"
              placeholder="Your name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-1 text-sm">Email</span>
            <input
              className="col-span-3 h-10 rounded-md border px-3"
              placeholder="example@email.com"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Save changes</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function SheetSideDemo() {
  return (
    <div className="flex gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the top of the screen.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the right of the screen.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the bottom of the screen.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
            <SheetDescription>
              This sheet slides in from the left of the screen.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function SheetFormDemo() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formValues);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </SheetTrigger>
      <SheetContent>
        <form onSubmit={handleSubmit}>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formValues.name}
                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                placeholder="Your name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formValues.email}
                onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                placeholder="example@email.com"
              />
            </div>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
} 