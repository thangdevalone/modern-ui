import MdxLayout from "@/components/layouts/mdx-layout";
import TocWrapper from "@/components/providers/toc-wrapper";
import Contents from "@/mdx/docs/calendar.mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar | Modern UI",
  description: "A highly customizable calendar component based on react-day-picker with advanced date selection capabilities.",
};

export default function CalendarPage() {
  return <>
  <MdxLayout>
    <Contents />
  </MdxLayout>
  <TocWrapper file="calendar"/>
  </>;
} 