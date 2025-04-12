"use client";

import {Stepper} from '@/components/modern-ui/stepper';
import {TerminalBlock} from '@/components/modern-ui/terminal-block';
import {Code} from '@/components/shared/code';
import {CodeBlock} from '@/components/code-block';
import {buttonCode} from '@/app/(docs-group)/docs/components/button/preview';

const steps = [
  {
    id: 0,
    title: "Getting Started with Vite",
    children: () => {
      const commands = {
        npm: 'npm create vite@latest',
        pnpm: 'pnpm create vite',
        yarn: 'yarn create vite',
        bun: 'bun create vite',
      };
      return (
        <div className='space-y-2'>
          <div>
            Install Vite using your preferred package manager.
          </div>
          <TerminalBlock commands={commands} activeTab={'npm'}
                         showTypingAnimation={true}/>
        </div>
      );
    }
  },
  {
    id: 1,
    title: "Init Modern UI",
    children: () => {
      const commands = {
        npm: 'npx @thangdevalone/modern-ui init',
        pnpm: 'pnpm dlx @thangdevalone/modern-ui init',
        yarn: 'npx @thangdevalone/modern-ui init',
        bun: 'bunx --bun @thangdevalone/modern-ui init',
      };
      return (
        <div className='space-y-2'>
          <div>
            Run the <Code>init</Code> command to create a new Vite project or to setup an existing one:
          </div>
          <TerminalBlock commands={commands} activeTab={'npm'}
                         showTypingAnimation={true}/>
          <div>
            Follow the steps on your terminal to complete
          </div>
        </div>
      );
    }
  },
  {
    id: 2,
    title: "Add Components",
    children: () => {
      const commands = {
        npm: 'npx @thangdevalone/button add button',
        pnpm: 'pnpm dlx @thangdevalone/button add button',
        yarn: 'yarn dlx @thangdevalone/button add button',
        bun: 'bunx --bun @thangdevalone/button add button',
      };
      return (
        <div className='space-y-2'>
          <div>
            You can now start adding components to your project.
          </div>
          <TerminalBlock commands={commands} activeTab={'npm'}
                         showTypingAnimation={true}/>
          <div>
            The command above will add the Button component to your project. You can then import it like this:
          </div>
          <CodeBlock code={buttonCode}/>
        </div>
      );
    }
  },
];


export const ViteContent = () => {
  return (
    <div className="py-4">
      <Stepper steps={steps} orientation="vertical" lineLast={true}/>
    </div>
  );
};