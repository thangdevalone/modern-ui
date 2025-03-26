"use client";
import {TerminalBlock} from '@/components/modern-ui/terminal-block';
import {useState} from 'react';

export function ButtonInstallation() {
  const [activeTab, setActiveTab] = useState<"pnpm" | "npm" | "yarn" | "bun">("npm");
  const commands = {
    npm: 'npx @thangdevalone/button add button',
    pnpm: 'pnpm dlx @thangdevalone/button add button',
    yarn: 'yarn dlx @thangdevalone/button add button',
    bun: 'bunx --bun @thangdevalone/button add button',
  };

  return <>
    <TerminalBlock commands={commands} activeTab={activeTab}
                   showTypingAnimation={true}/>
  </>;
}