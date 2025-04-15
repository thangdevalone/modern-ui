"use client";

import { buttonCode } from "@/app/(docs-group)/docs/components/button/preview";
import { CodeBlock } from "@/components/code-block";
import { Stepper } from "@/components/modern-ui/stepper";
import { TerminalBlock } from "@/components/modern-ui/terminal-block";
import { Code } from "@/components/shared/code";

const steps = [
  {
    id: 0,
    title: "Getting Started with Next.js",
    children: () => {
      const commands = {
        npm: "npx create-next-app@latest",
        pnpm: "npx create-next-app@latest",
        yarn: "npx create-next-app@latest",
        bun: "npx create-next-app@latest",
      };
      return (
        <div className="space-y-2">
          <div>Install Next.js using your preferred package manager.</div>
          <TerminalBlock
            commands={commands}
            activeTab={"npm"}
            showTypingAnimation={true}
          />
        </div>
      );
    },
  },
  {
    id: 1,
    title: "Create project",
    children: () => {
      const commands = {
        npm: "npx @modern-pack/ui init",
        pnpm: "pnpm dlx @modern-pack/ui init",
        yarn: "npx @modern-pack/ui init",
        bun: "bunx --bun @modern-pack/ui init",
      };
      return (
        <div className="space-y-2">
          <div>
            Run the <Code>init</Code> command to create a new Next.js project or
            to setup an existing one:
          </div>
          <TerminalBlock
            commands={commands}
            activeTab={"npm"}
            showTypingAnimation={true}
          />
          <div>Follow the steps on your terminal to complete</div>
        </div>
      );
    },
  },
  {
    id: 2,
    title: "Add Components",
    children: () => {
      const commands = {
        npm: "npx @modern-pack/ui add button",
        pnpm: "pnpm dlx @modern-pack/ui add button",
        yarn: "npx @modern-pack/ui add button",
        bun: "bunx --bun @modern-pack/ui add button",
      };
      return (
        <div className="space-y-2">
          <div>You can now start adding components to your project.</div>
          <TerminalBlock
            commands={commands}
            activeTab={"npm"}
            showTypingAnimation={true}
          />
          <div>
            The command above will add the Button component to your project. You
            can then import it like this:
          </div>
          <CodeBlock code={buttonCode} />
        </div>
      );
    },
  },
];

export const NextjsContent = () => {
  return (
    <div className="py-4">
      <Stepper steps={steps} orientation="vertical" lineLast={true} />
    </div>
  );
};
