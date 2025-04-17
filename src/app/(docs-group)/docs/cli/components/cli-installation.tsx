import { TerminalBlock } from "@/components/modern-ui/terminal-block";

export const InitInstallation = ({className}: {className?: string}) => {
  const commands = {
    npm: "npx @modern-pack/ui init",
    pnpm: "pnpm dlx @modern-pack/ui init",
    yarn: "npx @modern-pack/ui init",
    bun: "bunx --bun @modern-pack/ui init",
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
    npm: "npx @modern-pack/ui add [component]",
    pnpm: "pnpm dlx @modern-pack/ui add [component]",
    yarn: "npx @modern-pack/ui add [component]",
    bun: "bunx --bun @modern-pack/ui add [component]",
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
    npm: "npx @modern-pack/ui version",
    pnpm: "pnpm dlx @modern-pack/ui version",
    yarn: "npx @modern-pack/ui version",
    bun: "bunx --bun @modern-pack/ui version",
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
