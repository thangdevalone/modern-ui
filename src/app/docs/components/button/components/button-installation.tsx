"use client"

import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { CodeBlock } from "@/components/code-block";
import { useComponentCode } from "@/lib/services/hooks/use-component-code";

const CLIContent = () => {
  const commands = {
    npm: "npx @thangdevalone/modern-ui add button",
    pnpm: "pnpm dlx @thangdevalone/modern-ui add button",
    yarn: "yarn dlx @thangdevalone/modern-ui add button",
    bun: "bunx --bun @thangdevalone/modern-ui add button",
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
  const { code, isLoading } = useComponentCode("button");

  return (
    <div>
      {isLoading ? (
        <div className="mt-2 text-sm text-muted-foreground">
          Loading component code...
        </div>
      ) : (
        <CodeBlock code={code} language={"tsx"} />
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

export const ButtonInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTabId="CLI" />;
};
