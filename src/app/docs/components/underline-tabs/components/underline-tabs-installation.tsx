"use client";

import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { CodeBlock } from "@/components/code-block";
import { useComponentCode } from "@/hooks/use-component-code";
import { useEffect } from "react";

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
  const { code: underlineTabsCode, isLoading } =
    useComponentCode("underline-tabs");
  return (
    <div>
      {isLoading ? (
        <div className="mt-2 text-sm text-muted-foreground">
          Loading component code...
        </div>
      ) : (
        <CodeBlock code={underlineTabsCode} language={"tsx"} />
      )}
    </div>
  );
};

const tabs = [
  {
    id: "CLI",
    label: "CLI",
    content: <CLIContent />,
  },
  {
    id: "Manual",
    label: "Manual",
    content: <ManualContent />,
  },
];

export const UnderlineTabsInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTabId="CLI" />;
};
