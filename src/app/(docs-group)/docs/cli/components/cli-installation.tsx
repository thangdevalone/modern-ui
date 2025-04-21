import { TerminalBlock } from "@/components/modern-ui/terminal-block";

export const InitInstallation = ({className}: {className?: string}) => {
  const commands = {
    npm: "npx @modern-kit/ui init",
    pnpm: "pnpm dlx @modern-kit/ui init",
    yarn: "npx @modern-kit/ui init",
    bun: "bunx --bun @modern-kit/ui init",
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
    npm: "npx @modern-kit/ui add [component]",
    pnpm: "pnpm dlx @modern-kit/ui add [component]",
    yarn: "npx @modern-kit/ui add [component]",
    bun: "bunx --bun @modern-kit/ui add [component]",
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
    npm: "npx @modern-kit/ui version",
    pnpm: "pnpm dlx @modern-kit/ui version",
    yarn: "npx @modern-kit/ui version",
    bun: "bunx --bun @modern-kit/ui version",
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
