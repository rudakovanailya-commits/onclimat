

## Plan: AI Chat Assistant for Climate Equipment

### What
Add a floating chat widget powered by Lovable AI that opens when users click "Подбор за 2 минуты" or "Задать вопрос" buttons. The AI assistant helps select climate equipment, answers questions, and collects leads. All conversations are saved to the database and visible in the admin panel.

### Database Changes

**New table: `chat_conversations`**
- `id` uuid PK
- `name` text (nullable)
- `phone` text (nullable)
- `status` text default `'active'` (active / closed / transferred)
- `created_at`, `updated_at` timestamps

**New table: `chat_messages`**
- `id` uuid PK
- `conversation_id` uuid FK → chat_conversations
- `role` text (user / assistant / system)
- `content` text
- `created_at` timestamp

RLS: public INSERT for both tables (anonymous users chat without auth), admin SELECT/UPDATE/DELETE.

### Edge Function: `chat`

- Receives `{ messages, conversation_id }`.
- System prompt instructs AI to be a climate equipment consultant for OnКлимат (СПб). Includes catalog data, services list, pricing guidance. AI asks clarifying questions about room type, area, budget, tasks. Suggests 2-3 options with explanations. When user is ready, asks for name + phone to create a submission. If user says "связаться с менеджером", sets conversation status to "transferred".
- Uses Lovable AI gateway with `google/gemini-3-flash-preview`.
- Streams response via SSE.

### Frontend Components

1. **`ChatWidget.tsx`** — floating button (bottom-right corner) + slide-up chat panel.
   - Message list with markdown rendering (`react-markdown`).
   - Input field + send button.
   - Streaming token-by-token display.
   - When AI detects user wants to leave contacts, parses name/phone and inserts into `submissions` table too.

2. **Button wiring:**
   - Header "Подбор за 2 минуты" → opens chat with pre-filled message "Помогите подобрать оборудование".
   - HeroSection CTAs → open chat.
   - CtaSection "Получить подбор" → opens chat.
   - Add "Задать вопрос" button to Header.

3. **`ChatContext.tsx`** — React context to manage chat open/close state and pre-filled messages across components.

### Admin Panel

**New page: `AdminChats.tsx`** at `/admin/chats`
- List of conversations with name, phone, status, date.
- Click to expand and view full message history.
- Filter by status (active / transferred / closed).
- Add nav item to AdminDashboard sidebar.

### Files to Create/Edit

| Action | File |
|--------|------|
| Create | `supabase/functions/chat/index.ts` |
| Create | `src/components/ChatWidget.tsx` |
| Create | `src/components/ChatContext.tsx` |
| Create | `src/pages/admin/AdminChats.tsx` |
| Edit | `src/components/Header.tsx` — add "Задать вопрос" button, wire both buttons to open chat |
| Edit | `src/components/HeroSection.tsx` — wire CTA to open chat |
| Edit | `src/components/CtaSection.tsx` — wire button to open chat |
| Edit | `src/pages/Index.tsx` — wrap with ChatContext, add ChatWidget |
| Edit | `src/App.tsx` — add admin/chats route |
| Edit | `src/pages/AdminDashboard.tsx` — add "Чаты" nav item |
| Migration | Create `chat_conversations` and `chat_messages` tables with RLS |

### Technical Details

- System prompt will include the 4 services from DB and general climate equipment knowledge (BTU calculations, noise levels, inverter vs non-inverter, popular brands).
- Chat stores conversation_id in local state; creates new conversation on first message.
- Submission creation happens via Supabase client when AI signals readiness (tool calling or keyword detection in edge function).
- `react-markdown` package needed for rendering AI responses.

