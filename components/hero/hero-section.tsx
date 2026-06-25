import { Container } from "@components/ui/container";
import { HeroBackground } from "./hero-background";
import { HeroChatPreview } from "./hero-chat-preview";
import { HeroCopy } from "./hero-copy";
import { HeroToolStrip } from "./hero-tool-strip";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-[var(--background)] lg:h-[calc(100svh-5rem)]">
      <HeroBackground />
      <Container
        size="wide"
        className="relative z-10 grid min-h-[calc(100svh-5rem)] gap-5 py-5 sm:gap-6 sm:py-6 lg:h-full lg:min-h-0 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-8"
      >
        <div className="flex min-h-0 flex-col justify-center gap-6 lg:gap-8">
          <HeroCopy />
          <HeroToolStrip />
        </div>
        <div className="hidden lg:block lg:h-full">
          <HeroChatPreview />
        </div>
      </Container>
    </section>
  );
}
