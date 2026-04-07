

## Problem

The parent `div` has `max-w-2xl` (672px) which constrains both the text and the buttons. The buttons with `flex-1` split this narrow space equally, making each button only ~310px wide. The user wants the "Подбор за 2 минуты" button to be as wide as the "А какой кондиционер подойдёт именно вам?" text.

## Solution

Move the question text and buttons block outside of the `max-w-2xl` wrapper so they can stretch wider. Remove `max-w-2xl` from the parent div OR restructure so only the heading and subtitle are constrained.

### File: `src/components/HeroSection.tsx`

- Change the parent `max-w-2xl` div to only wrap the heading and subtitle
- Move the `space-y-3 pt-2` block (question text + buttons) outside of `max-w-2xl`, giving it its own wider max-width (e.g. `max-w-3xl` or `max-w-4xl`) so the buttons naturally stretch wider
- Keep both buttons as `flex-1` so they fill the row equally at the new wider width

