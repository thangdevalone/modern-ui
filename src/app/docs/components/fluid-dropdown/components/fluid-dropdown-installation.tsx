"use client";

import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { CodeBlock } from "@/components/code-block";
import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { useComponentCode } from "@/lib/services/hooks/use-component-code";

const CLIContent = () => {
  const commands = {
    npm: "npx @thangdevalone/modern-ui add fluid-dropdown",
    pnpm: "pnpm dlx @thangdevalone/modern-ui add fluid-dropdown",
    yarn: "yarn dlx @thangdevalone/modern-ui add fluid-dropdown",
    bun: "bunx --bun @thangdevalone/modern-ui add fluid-dropdown",
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
  const { code: fluidDropdownCode, isLoading } = useComponentCode("fluid-dropdown");
  return (
    <div>
      {isLoading ? (
        <div className="mt-2 text-sm text-muted-foreground">
          Loading component code...
        </div>
      ) : (
        <CodeBlock code={fluidDropdownCode} language={"tsx"} />
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

export const FluidDropdownInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTabId="CLI" />;
};
