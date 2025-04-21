import { TerminalBlock } from "@/components/modern-ui/terminal-block";

export const InitInstallation = ({className}: {className?: string}) => {
  const commands = {
    npm: "npx @modern-core/ui init",
    pnpm: "pnpm dlx @modern-core/ui init",
    yarn: "npx @modern-core/ui init",
    bun: "bunx --bun @modern-core/ui init",
  };
  return (
    <div className={className}>
      <TerminalBlock
        commands={commands}
        activeTab={"npm"}
        showTypingAnimation={true}
      />
    </div>
  );
};

export const AddInstallation = () => {
  const commands = {
    npm: "npx @modern-core/ui add [component]",
    pnpm: "pnpm dlx @modern-core/ui add [component]",
    yarn: "npx @modern-core/ui add [component]",
    bun: "bunx --bun @modern-core/ui add [component]",
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

export const VersionInstallation = () => {
  const commands = {
    npm: "npx @modern-core/ui version",
    pnpm: "pnpm dlx @modern-core/ui version",
    yarn: "npx @modern-core/ui version",
    bun: "bunx --bun @modern-core/ui version",
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
