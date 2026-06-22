import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h3: ({ children }) => (
    <h3 className="text-sm font-semibold tracking-wide text-[var(--text-primary)]">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
      {children}
    </h4>
  ),
  p: ({ children }) => <p className="text-sm leading-6 text-inherit">{children}</p>,
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
  ),
  ul: ({ children }) => <ul className="space-y-2 pl-5">{children}</ul>,
  ol: ({ children }) => <ol className="space-y-2 pl-5">{children}</ol>,
  li: ({ children }) => <li className="pl-1 text-sm leading-6">{children}</li>,
  code: ({ children }) => (
    <code className="rounded-md bg-[var(--border)]/20 px-1.5 py-0.5 text-[0.8em] font-medium text-[var(--text-primary)]">
      {children}
    </code>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="font-medium text-[var(--accent)] underline decoration-[var(--accent)]/30 underline-offset-2 transition hover:decoration-[var(--accent)]"
    >
      {children}
    </a>
  ),
};

type ChatMarkdownProps = {
  content: string;
};

export function ChatMarkdown({ content }: ChatMarkdownProps) {
  return (
    <div className="space-y-3">
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
