"use client";

import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { CodeBlock } from "@/components/code-block";
import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { useComponentCode } from "@/lib/services/hooks/use-component-code";

const CLIContent = () => {
  const commands = {
    npm: "npx @modern-pack/ui add sparkles-text",
    pnpm: "pnpm dlx @modern-pack/ui add sparkles-text",
    yarn: "npx @modern-pack/ui add sparkles-text",
    bun: "bunx --bun @modern-pack/ui add sparkles-text",
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
  const { code: sparklesTextCode, isLoading } = useComponentCode("sparkles-text");
  return (
    <div>
      {isLoading ? (
        <div className="mt-2 text-sm text-muted-foreground">
          Loading component code...
        </div>
      ) : (
        <CodeBlock code={sparklesTextCode} language={"tsx"} />
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

export const SparklesTextInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTabId="CLI" />;
}; 