"use client";
import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import UnderlineTabs from "@/components/modern-ui/underline-tabs";

const CLIContent = () => {
  const commands = {
    npm: "npx @thangdevalone/modern-ui add underline-tabs",
    pnpm: "pnpm dlx @thangdevalone/modern-ui add underline-tabs",
    yarn: "yarn dlx @thangdevalone/modern-ui add underline-tabs",
    bun: "bunx --bun @thangdevalone/modern-ui add underline-tabs",
  };
  return (
    <div>
      <TerminalBlock
        commands={commands}
        activeTab={"npm"}
        showTypingAnimation={true}
      />
    </div>
  );
};

const ManualContent = () => {
  return (
    <div className="my-4 space-y-4 text-sm">
      <p>Follow these steps to manually add the UnderlineTabs component:</p>
      <ol className="list-decimal ml-4 space-y-2">
        <li>
          Create a <code className="bg-muted px-2 py-1 rounded-sm">underline-tabs.tsx</code> file in your components directory
        </li>
        <li>
          Copy the UnderlineTabs code into the file
        </li>
        <li>
          Install the necessary dependencies:
          <pre className="bg-muted p-4 rounded-md overflow-x-auto mt-2">
            <code className="text-sm">
              npm install framer-motion lucide-react
            </code>
          </pre>
        </li>
      </ol>
    </div>
  );
};

const tabs = [
  {
    id: "CLI",
    label: "CLI",
    content: <CLIContent/>
  },
  {
    id: "Manual",
    label: "Manual",
    content: <ManualContent/>
  }
];

export const UnderlineTabsInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTab="CLI"/>;
}; 