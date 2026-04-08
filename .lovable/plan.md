

## Plan: Connect service buttons to AI chat

Each "Оставить заявку" button in `ServicesSection` will open the AI chat with a pre-filled message matching the service name, so the assistant immediately knows which service the user is interested in.

### Changes

**File: `src/components/ServicesSection.tsx`**
- Import `useChat` from `ChatContext`
- Call `openChat()` with a service-specific prefill on each button click (e.g., `openChat("Интересует установка кондиционеров")`)
- Each service card's button will prefill the chat with its title for context

No new components or backend changes needed — same single assistant, just wired to these buttons.

