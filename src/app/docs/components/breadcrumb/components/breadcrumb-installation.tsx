"use client"

import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { CodeBlock } from "@/components/code-block";
import { useComponentCode } from "@/lib/services/hooks/use-component-code";

const CLIContent = () => {
  const commands = {
    npm: "npx @thangdevalone/modern-ui add breadcrumb",
    pnpm: "pnpm dlx @thangdevalone/modern-ui add breadcrumb",
    yarn: "yarn dlx @thangdevalone/modern-ui add breadcrumb",
    bun: "bunx --bun @thangdevalone/modern-ui add breadcrumb",
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
  const { code, isLoading } = useComponentCode("breadcrumb");

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

export const BreadcrumbInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTabId="CLI" />;
}; 