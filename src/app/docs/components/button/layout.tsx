import {PreviewButton} from '@/app/docs/components/button/preview';
import TocWrapper from '@/components/providers/toc-wrapper';
import MdxLayout from '@/components/layouts/mdx-layout';
import {BreadcrumbNav} from '@/components/breadcrumb-nav';

export default function ButtonLayout({children}: { children: React.ReactNode }) {
  return <>
    <MdxLayout>
      <BreadcrumbNav className="mb-4" items={[
        {label: "Docs", href: "/docs"},
        {label: "Components", href: "/docs/components"},
        {label: "Button"},
      ]}/>
      <PreviewButton/>
      {children}
    </MdxLayout>
    <TocWrapper file="button"/>
  </>;
}