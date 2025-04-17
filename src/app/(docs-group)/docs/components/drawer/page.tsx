import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/drawer.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drawer | Modern UI",
  description:
    "A bottom sheet component for mobile and tablet interfaces, built on top of the Vaul library.",
};

export default function DrawerPage() {
  return (
    <>
      <MdxLayout>
        <Contents />
      </MdxLayout>
      <TocWrapper file="drawer" />
    </>
  );
}
