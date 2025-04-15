"use client";

import React from "react";
import { Switch } from "@/components/modern-ui/switch";
import { Label } from "@/components/modern-ui/label";

export function BasicSwitchDemo() {
  return <Switch />;
}

export function LabeledSwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}

export function DisabledSwitchDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled" disabled />
        <Label htmlFor="disabled" className="text-muted-foreground">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked" className="text-muted-foreground">Disabled (checked)</Label>
      </div>
    </div>
  );
}
