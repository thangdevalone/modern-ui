"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/modern-ui/tabs";
import { User, Lock, Settings } from "lucide-react";

export function BasicTabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList className="w-full">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-gray-500 mt-2">
          Configure your account preferences and settings.
        </p>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Password Settings</h3>
        <p className="text-sm text-gray-500 mt-2">
          Update your password and security preferences.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">General Settings</h3>
        <p className="text-sm text-gray-500 mt-2">
          Configure application appearance and behavior.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export function VerticalTabsDemo() {
  return (
    <Tabs defaultValue="tab1" orientation="vertical" className="flex w-full max-w-md gap-4">
      <TabsList className="flex flex-col w-32">
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="tab1" className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Tab 1 Content</h3>
          <p className="text-sm text-gray-500 mt-2">
            This is the content for Tab 1.
          </p>
        </TabsContent>
        <TabsContent value="tab2" className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Tab 2 Content</h3>
          <p className="text-sm text-gray-500 mt-2">
            This is the content for Tab 2.
          </p>
        </TabsContent>
        <TabsContent value="tab3" className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Tab 3 Content</h3>
          <p className="text-sm text-gray-500 mt-2">
            This is the content for Tab 3.
          </p>
        </TabsContent>
      </div>
    </Tabs>
  );
}

export function TabsWithIconsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList className="w-full">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Account</span>
        </TabsTrigger>
        <TabsTrigger value="password" className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>Password</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Account Settings</h3>
        <p className="text-sm text-gray-500 mt-2">
          Configure your account preferences and settings.
        </p>
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">Password Settings</h3>
        <p className="text-sm text-gray-500 mt-2">
          Update your password and security preferences.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border rounded-md mt-2">
        <h3 className="text-lg font-medium">General Settings</h3>
        <p className="text-sm text-gray-500 mt-2">
          Configure application appearance and behavior.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export function ResponsiveTabsDemo() {
  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="tab1" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="p-4 border rounded-md mt-2 space-y-4">
          <h3 className="text-lg font-medium">Responsive Tab 1</h3>
          <p className="text-sm text-gray-500">
            This tabs layout adapts to different screen sizes using grid.
          </p>
        </TabsContent>
        <TabsContent value="tab2" className="p-4 border rounded-md mt-2 space-y-4">
          <h3 className="text-lg font-medium">Responsive Tab 2</h3>
          <p className="text-sm text-gray-500">
            The equal-width grid ensures consistent spacing regardless of content.
          </p>
        </TabsContent>
        <TabsContent value="tab3" className="p-4 border rounded-md mt-2 space-y-4">
          <h3 className="text-lg font-medium">Responsive Tab 3</h3>
          <p className="text-sm text-gray-500">
            Tabs will remain evenly distributed across the container width.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
} 