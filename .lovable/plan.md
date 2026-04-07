

## Plan: Chain DecryptedText animation after TextType finishes

### Problem
Both animations start independently. The "А какой кондиционер подойдёт именно вам?" decryption animation should wait until the typing animation completes.

### Approach
1. **Add `onComplete` callback to TextType** — fire when typing finishes (when `loop=false` and all characters are typed).
2. **Use state in HeroSection** — track when TextType is done, then conditionally trigger DecryptedText.
3. **Add manual trigger to DecryptedText** — new prop (e.g. `startAnimation`) that triggers the decrypt when set to `true`, instead of relying on `animateOn="view"`.

### Changes

**src/components/TextType.tsx**
- Add `onComplete?: () => void` to props interface.
- Call `onComplete()` when typing finishes (non-loop mode, all chars typed).

**src/components/DecryptedText.tsx**
- Add optional `startAnimation?: boolean` prop.
- When `startAnimation` transitions from `false` to `true`, trigger `triggerDecrypt()`.

**src/components/HeroSection.tsx**
- Add `useState` for `typingDone`.
- Pass `onComplete={() => setTypingDone(true)}` to TextType.
- Pass `startAnimation={typingDone}` to DecryptedText (remove `animateOn="view"`).

### Timing
The typing text is ~63 chars at 50ms each + 800ms delay ≈ 4s total. The decryption will start immediately after, creating a seamless chain.

