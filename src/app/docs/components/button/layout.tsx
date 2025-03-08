import {PreviewButton} from '@/app/docs/components/button/preview';

export default function MDXPage({children}: { children: React.ReactNode }) {
  return <>
    <PreviewButton/>
    {children}
  </>;
}