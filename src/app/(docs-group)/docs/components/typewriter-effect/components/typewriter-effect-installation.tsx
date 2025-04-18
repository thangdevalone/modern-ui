"use client";

import { UnderlineTabs } from "@/components/modern-ui/underline-tabs";
import { CodeBlock } from "@/components/code-block";
import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { useComponentCode } from "@/lib/services/hooks/use-component-code";

const CLIContent = () => {
  const commands = {
    npm: "npx @modern-pack/ui add typewriter-effect",
    pnpm: "pnpm dlx @modern-pack/ui add typewriter-effect",
    yarn: "npx @modern-pack/ui add typewriter-effect",
    bun: "bunx --bun @modern-pack/ui add typewriter-effect",
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
  const { code: typewriterEffectCode, isLoading } = useComponentCode("typewriter-effect");
  return (
    <div>
      {isLoading ? (
        <div className="mt-2 text-sm text-muted-foreground">
          Loading component code...
        </div>
      ) : (
        <CodeBlock code={typewriterEffectCode} language={"tsx"} />
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

export const TypewriterEffectInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTabId="CLI" />;
}; 