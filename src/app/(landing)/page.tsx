import JsonLd from "@/components/seo/json-ld";
import { generateWebPageSchema } from "@/lib/schema";
import { Metadata } from "next";
import { ComponentsSection } from "./components/components-section";
import { DesignSection } from "./components/design-section";
import { FeaturesSection } from "./components/feature-section";
import { HeroSection } from "./components/hero-section";
import { IntegrationSection } from "./components/intergration-section";

export const metadata: Metadata = {
  title: "Modern UI - Beautiful Library Components",
  description:
    "A collection of beautiful and reusable components built with Radix UI and Tailwind CSS. Free, Open Source, and ready for your Next.js projects. Inspired by Shadcn UI.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  const jsonLd = generateWebPageSchema({
    title: "Modern UI - Beautiful Library Components",
    description:
      "A collection of beautiful and reusable components built with Radix UI and Tailwind CSS. Free, Open Source, and ready for your Next.js projects. Inspired by Shadcn UI.",
    url: "https://modern-ui.org",
    images: ["/assets/logo.png"],
  });

  return (
    <main className="flex-1">
      <JsonLd data={jsonLd} />
      <HeroSection />
      <FeaturesSection />
      <DesignSection />
      <ComponentsSection />
      <IntegrationSection />
    </main>
  );
}
