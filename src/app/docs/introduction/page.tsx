import Contents from '@/mdx/docs.mdx';
import MdxLayout from '@/components/layouts/mdx-layout';
import TocWrapper from '@/components/providers/toc-wrapper';
import {BreadcrumbNav} from '@/components/breadcrumb-nav';

export default function page() {
  return <>
    <MdxLayout>
      <BreadcrumbNav className="mb-4" items={[
        {label: "Docs", href: "/docs"},
        {label: "Introduction"},
      ]}/>
      <Contents/>
    </MdxLayout>
    <TocWrapper file="docs"/>
  </>;
}