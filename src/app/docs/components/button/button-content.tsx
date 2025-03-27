import {TerminalBlock} from '@/components/modern-ui/terminal-block';

export const ButtonContent = () => {
  const commands = {
    npm: 'npx @thangdevalone/button add button',
    pnpm: 'pnpm dlx @thangdevalone/button add button',
    yarn: 'yarn dlx @thangdevalone/button add button',
    bun: 'bunx --bun @thangdevalone/button add button',
  };

  return <>
    <TerminalBlock commands={commands} activeTab={'npm'}
                   showTypingAnimation={true}/>
  </>;
};