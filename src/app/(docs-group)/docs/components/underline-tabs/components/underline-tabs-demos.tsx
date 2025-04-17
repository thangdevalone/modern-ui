"use client";

import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import {
  Home,
  Image,
  MessageSquare,
  Settings,
  User,
  Video,
} from "lucide-react";

export function BasicUnderlineTabsDemo() {
  const tabs = [
    {
      id: "tab1",
      label: "Tab 1",
      content: (
        <div>
          <h3 className="text-lg font-medium">Tab 1 Content</h3>
          <p className="text-gray-500 mt-2">
            This is the content for the first tab.
          </p>
        </div>
      ),
    },
    {
      id: "tab2",
      label: "Tab 2",
      content: (
        <div>
          <h3 className="text-lg font-medium">Tab 2 Content</h3>
          <p className="text-gray-500 mt-2">
            This is the content for the second tab.
          </p>
        </div>
      ),
    },
    {
      id: "tab3",
      label: "Tab 3",
      content: (
        <div>
          <h3 className="text-lg font-medium">Tab 3 Content</h3>
          <p className="text-gray-500 mt-2">
            This is the content for the third tab.
          </p>
        </div>
      ),
    },
  ];

  return <UnderlineTabs tabs={tabs} defaultTabId="tab1" />;
}

export function IconsUnderlineTabsDemo() {
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <User className="w-4 h-4" />,
      content: (
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-gray-500 mt-2">
            View and edit your profile information.
          </p>
        </div>
      ),
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home className="w-4 h-4" />,
      content: (
        <div>
          <h3 className="text-lg font-medium">Dashboard</h3>
          <p className="text-gray-500 mt-2">
            Overview of your account and statistics.
          </p>
        </div>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      content: (
        <div>
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-gray-500 mt-2">
            Configure your account settings and preferences.
          </p>
        </div>
      ),
    },
  ];

  return <UnderlineTabs tabs={tabs} defaultTabId="profile" />;
}

export function CustomStyledUnderlineTabsDemo() {
  const tabs = [
    {
      id: "messages",
      label: "Messages",
      icon: <MessageSquare className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-blue-50 rounded-md">
          <h3 className="text-lg font-medium text-blue-800">Messages</h3>
          <p className="text-blue-600 mt-2">
            Your recent messages and conversations.
          </p>
        </div>
      ),
    },
    {
      id: "photos",
      label: "Photos",
      icon: <Image className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-green-50 rounded-md">
          <h3 className="text-lg font-medium text-green-800">Photos</h3>
          <p className="text-green-600 mt-2">Your photo gallery and albums.</p>
        </div>
      ),
    },
    {
      id: "videos",
      label: "Videos",
      icon: <Video className="w-4 h-4" />,
      content: (
        <div className="p-4 bg-purple-50 rounded-md">
          <h3 className="text-lg font-medium text-purple-800">Videos</h3>
          <p className="text-purple-600 mt-2">
            Your video library and playlists.
          </p>
        </div>
      ),
    },
  ];

  return (
    <UnderlineTabs
      tabs={tabs}
      defaultTabId="messages"
      className="border p-4 rounded-lg shadow-sm bg-background"
    />
  );
}
