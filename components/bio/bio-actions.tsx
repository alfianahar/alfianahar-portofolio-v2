import Link from "next/link";
import { buttonClassName } from "@components/ui/button";
import { bioActions } from "@content/bio-actions";

export function BioActions() {
  return (
    <section className="grid gap-3" aria-label="Bio actions">
      {bioActions.map((action) => {
        const className = buttonClassName({
          variant: action.label === "Start a Project" ? "primary" : "secondary",
          size: "lg",
          className:
            "h-auto min-h-16 w-full justify-between rounded-2xl px-5 py-4 text-left shadow-none",
        });
        const content = (
          <>
            <span>
              <span className="block font-semibold">{action.label}</span>
              <span className="mt-1 block text-xs font-normal leading-5 opacity-75">
                {action.description}
              </span>
            </span>
            <span aria-hidden="true">→</span>
          </>
        );

        if (action.external) {
          const opensNewTab = action.href.startsWith("http");

          return (
            <a
              key={action.href}
              href={action.href}
              className={className}
              target={opensNewTab ? "_blank" : undefined}
              rel={opensNewTab ? "noreferrer" : undefined}
            >
              {content}
            </a>
          );
        }

        return (
          <Link key={action.href} href={action.href} className={className}>
            {content}
          </Link>
        );
      })}
    </section>
  );
}
