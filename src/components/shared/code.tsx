import {cn} from '@/lib/utils';
import {ReactNode} from 'react';

export const Code = ({children, className}: { children: ReactNode, className?: string }) => {
  return <code
    className={cn("relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono not-prose", className)}>{children}</code>;
};