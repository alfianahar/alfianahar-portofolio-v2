import { Container } from "@components/ui/container";
import { HeroBackground } from "./hero-background";
import { HeroChatPreview } from "./hero-chat-preview";
import { HeroCopy } from "./hero-copy";
import { HeroToolStrip } from "./hero-tool-strip";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--background)] py-20 sm:py-28 lg:min-h-[calc(100vh-5rem)] lg:py-24">
      <HeroBackground />
      <Container
        size="wide"
        className="relative z-10 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center"
      >
        <div className="space-y-10">
          <HeroCopy />
          <HeroToolStrip />
        </div>
        <HeroChatPreview />
      </Container>
    </section>
  );
}
