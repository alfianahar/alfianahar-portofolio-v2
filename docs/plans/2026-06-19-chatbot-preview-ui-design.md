# Chatbot Preview UI Design

## Scope

Finish the remaining portfolio migration work by extracting the repeated static chatbot preview UI into shared components, then run final QA and polish only the issues found.

The chatbot remains a curated preview. It does not add backend calls, local prompt handling, message state, or fake AI behavior.

## Recommended Approach

Use small shared primitives under `components/chat` while keeping page-specific wrappers in `components/hero` and `components/bio`.

This preserves the existing hero and bio visual direction, removes the duplicated message/action/input TSX, and avoids over-configuring one large component with theme-specific class plumbing.

## Components

- `ChatPanel` renders the shared assistant header, message list, quick actions, and input mock.
- `ChatMessage` renders one data-driven chat bubble with variant classes for user and assistant messages.
- `ChatQuickActions` renders quick actions as buttons or decorative chips depending on the page context.
- `ChatInput` renders the non-functional prompt input preview with an accessible label.

`HeroChatPreview` keeps the premium light outer card and side stats. `BioChatPreview` keeps the compact dark link-in-bio shell.

## Data Flow

Both variants continue to consume `chatMessages` and `chatQuickActions` from `content/chatbot.ts`.

Hero renders the full quick-action set. Bio renders the first two quick actions to preserve the compact layout.

## Accessibility

Message order stays readable in DOM order. Interactive quick actions use real buttons with visible text. Decorative bio chips remain non-interactive. The input mock includes an accessible label so it is not just anonymous placeholder text.

## Verification

After implementation, run:

```bash
bun run test
bun run format:check
bun run lint
bun run typecheck
bun run build
```

Then fix only concrete QA failures or obvious polish issues surfaced by those checks.
