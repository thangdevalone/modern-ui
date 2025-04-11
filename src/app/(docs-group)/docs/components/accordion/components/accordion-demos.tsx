"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/modern-ui/accordion";

export function BasicAccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function MultipleAccordionDemo() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionContent>
          This is the first section content. Multiple sections can be opened at once.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionContent>
          This is the second section content. You can open this while the first is open.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function CustomAccordionDemo() {
  return (
    <Accordion 
      type="single" 
      collapsible 
      className="w-full border rounded-lg"
    >
      <AccordionItem value="item-1" className="border-b px-4">
        <AccordionTrigger className="py-3 text-primary hover:no-underline">
          Custom styling
        </AccordionTrigger>
        <AccordionContent className="pb-3 pt-1 text-sm">
          This accordion has custom styling applied to it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="px-4">
        <AccordionTrigger className="py-3 text-primary hover:no-underline">
          Customizable
        </AccordionTrigger>
        <AccordionContent className="pb-3 pt-1 text-sm">
          The accordion is fully customizable with Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
} 