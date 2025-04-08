import { DesignSection } from "./components/design-section";
import { HeroSection } from "./components/hero-section";
import { IntegrationSection } from "./components/intergration-section";
import { FeaturesSection } from "./components/feature-section";
import { ComponentsSection } from "./components/components-section";

export default function page() {
  return (
    <main className="flex-1">
      <HeroSection />
      <FeaturesSection />
      <DesignSection />
      <ComponentsSection />
      <IntegrationSection />
    </main>
  );
}
