"use client";

import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { CodeBlock } from "@/components/code-block";
import { useHookCode } from "@/lib/services/hooks/use-hook-code";

const CLIContent = () => {
  const commands = {
    npm: "npx @modern-core/ui add use-debounce",
    pnpm: "pnpm dlx @modern-core/ui add use-debounce",
    yarn: "npx @modern-core/ui add use-debounce",
    bun: "bunx --bun @modern-core/ui add use-debounce",
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
  const { code, isLoading } = useHookCode("use-debounce");

  return (
    <div>
      {isLoading ? (
        <div className="mt-2 text-sm text-muted-foreground">
          Loading hook code...
        </div>
      ) : (
        <CodeBlock code={code} language={"ts"} />
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

export const UseDebounceInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTabId="CLI" />;
}; 