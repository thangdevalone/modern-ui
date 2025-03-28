import {TerminalBlock} from '@/components/modern-ui/terminal-block';
import UnderlineTabs from '@/components/modern-ui/underline-tabs';
import {CodeBlock} from '@/components/code-block';
import path from 'node:path';
import fs from 'node:fs';


const CLIContent = () => {
  const commands = {
    npm: 'npx @thangdevalone/modern-ui add button',
    pnpm: 'pnpm dlx @thangdevalone/modern-ui add button',
    yarn: 'yarn dlx @thangdevalone/modern-ui add button',
    bun: 'bunx --bun @thangdevalone/modern-ui add button',
  };
  return (
    (
      <div>
        <TerminalBlock commands={commands} activeTab={'npm'}
                       showTypingAnimation={true}/>
      </div>
    )
  );
};

const ManualContent = () => {
  let code = '';

  try {
    const filePath = path.join(process.cwd(), 'src', 'components', 'modern-ui', 'button.tsx');

    code = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    code = '// Unable to load code sample.\n// Please check the file path or permissions.';
  }

  return (
    <div>
      <CodeBlock code={code} language={'tsx'}/>
    </div>
  );
};


const tabs = [
  {
    id: "CLI",
    label: "CLI",
    content: <CLIContent/>
  },
  {
    id: "Manual",
    label: "Manual",
    content: <ManualContent/>
  }
];

export const ButtonInstallation = () => {
  return <UnderlineTabs tabs={tabs} defaultTab="CLI"/>;

};