"use client"

import { CodeBlock } from "@/components/code-block";
import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { useComponentCode } from "@/lib/services/hooks/use-component-code";

const CLIContent = () => {
  const commands = {
    npm: "npx @modern-core/ui add fancy-tabs",
    pnpm: "pnpm dlx @modern-core/ui add fancy-tabs",
    yarn: "npx @modern-core/ui add fancy-tabs",
    bun: "bunx --bun @modern-core/ui add fancy-tabs",
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
  const { code, isLoading } = useComponentCode("tabs");

  return (
    <div>
      {isLoading ? (
        <div className="mt-2 text-sm text-muted-foreground">
          Loading component code...
        </div>
      ) : (
        <CodeBlock code={code} language={"tsx"} maxHeight={300} />
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

export const TabInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTabId="CLI" />;
};
