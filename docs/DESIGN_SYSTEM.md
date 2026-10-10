# Design System

> **Status:** Visual specification. Implement and validate during the frontend phases.

## 1. Visual direction

Create a premium, futuristic, dark portfolio with restrained blue, violet, and cyan accents. The visual language should feel polished and technical without becoming a noisy “sci-fi dashboard.” Content and recruiter usability take priority over effects.

## 2. Color tokens

Use CSS custom properties in `src/styles/tokens.css`. Values below are proposed starting points; inspect them in-browser and adjust contrast after implementation.

```css
:root {
  color-scheme: dark;
  --color-bg: #080B14;
  --color-bg-elevated: #0F1424;
  --color-surface: #121A2D;
  --color-surface-hover: #18223A;
  --color-border: rgba(157, 177, 220, 0.16);
  --color-text: #F3F6FF;
  --color-text-muted: #A6B1C8;
  --color-text-subtle: #77839D;
  --color-blue: #5B8CFF;
  --color-violet: #9B6BFF;
  --color-cyan: #4DE4F5;
  --color-success: #54D6A0;
  --color-warning: #FFC76A;
  --color-danger: #FF718A;
}
```

Guidelines:
- Dark backgrounds should remain nearly neutral; gradients are accents, not the main reading surface.
- Use blue/violet/cyan glow sparingly.
- Keep body text high contrast.
- Do not communicate project status through color alone; include readable status text.
- Check contrast against WCAG AA targets where practical, especially for body text and controls.

## 3. Typography

Suggested system:
- Headings: a modern sans-serif such as `Inter`, `Manrope`, or a system fallback.
- Body: `Inter` or a system sans-serif.
- Code/technical labels: a monospace system font, used sparingly.

Suggested scale:
- Hero title: `clamp(2.5rem, 7vw, 5.5rem)`, line-height about `1.0–1.1`.
- Section heading: `clamp(1.8rem, 4vw, 3rem)`.
- Card heading: `1.125–1.375rem`.
- Body: `1rem` with line-height `1.6–1.75`.
- Small metadata: do not go below `0.8rem` unless truly supplementary.

Limit each section to a clear heading and concise supporting copy. Avoid all-caps body paragraphs.

## 4. Layout and spacing

- Main content max width: approximately `1120–1240px`.
- Side padding: `clamp(1rem, 4vw, 3rem)`.
- Spacing system: multiples of 4px or 8px.
- Section vertical padding: `clamp(4rem, 9vw, 7rem)`.
- Card padding: `1.25–1.75rem`.
- Use a consistent grid and alignment.
- Avoid horizontal overflow at 320px wide.
- Project cards should become one column on narrow screens, two columns on medium screens, and optionally three columns on wide screens if text remains readable.

## 5. Shape, borders, and shadows

- Card radius: 16–24px.
- Buttons and inputs: 10–14px radius.
- Borders: subtle 1px translucent border.
- Shadows: soft, layered, and low-opacity.
- Glow: reserved for the main hero visual, active states, or one featured element.
- Avoid glass blur on every component; blur can reduce text contrast and hurt performance.

## 6. 3D scene direction

Recommended hero visual:
- One abstract, elegant 3D object or cluster: e.g. a slowly rotating wireframe orb, glass-like geometric form, or restrained floating shapes.
- Colors: deep blue base with violet/cyan highlights.
- Camera framing must leave enough space for hero text.
- Use a static gradient/shape fallback if WebGL is unavailable.
- 3D object is decorative and should be hidden from assistive technology when it conveys no unique information.
- Do not make the scene a required interaction to reach content.
- Avoid excessive particles, flashing, rapid camera movement, and distracting loops.

Performance:
- Lazy-load the 3D scene when feasible.
- Use reasonable device pixel ratio limits.
- Pause or reduce animation when the page is hidden or the scene is offscreen where practical.
- Check on mobile and with reduced-motion enabled.

## 7. Motion rules

Use Motion for React for purposeful interaction:
- Small fade/slide entrance on section reveal.
- Button hover/press feedback.
- Smooth menu open/close.
- Project card hover lift of only a few pixels.
- Short state transitions for form feedback.

Guidelines:
- Typical micro-interactions: 150–250ms.
- Larger entrance transitions: approximately 300–600ms.
- Avoid animating every item with long stagger delays.
- Do not animate layout in ways that cause content jumps.
- Honor `prefers-reduced-motion`; reduce or remove nonessential transitions.
- Ensure motion never delays navigation or form submission.

## 8. Component behavior

### Navigation
- Sticky or fixed navigation only if it does not cover anchor targets.
- Clear active/hover/focus states.
- Mobile menu must be keyboard-operable and close after selecting a section.

### Buttons and links
- Primary CTA: high-contrast blue/violet treatment.
- Secondary CTA: outlined or quiet surface treatment.
- Visible focus ring.
- External links should be identifiable and use safe `rel` attributes when opened in a new tab.
- Resume CTA must not point to a fake or missing file.

### Project cards
Each card can show:
- Real project title.
- Short factual summary.
- Technology tags.
- Explicit `Completed` or `In Progress` label.
- Repository/live demo links only if they exist.
- Optional image/screenshot when available.
Do not use fake metrics or generic placeholder projects in the public production build.

### Contact form
- Visible labels, not placeholder-only labels.
- Inline validation messages.
- Submit button disabled while submitting.
- Clear success/error announcement for assistive technology.
- Do not clear the form on a failed request.
- Include a privacy note if storing messages.

## 9. Responsive behavior

Test at minimum:
- 320px, 375px, 768px, 1024px, and 1440px viewport widths.
- Keyboard-only navigation.
- Reduced motion.
- WebGL disabled or unavailable.
- Slow network and backend unavailable.
- Long project titles and large text zoom.

Mobile priorities:
- Keep headline readable and avoid overflow.
- Stack hero content and CTA buttons.
- Reduce or disable expensive 3D effects if needed.
- Use comfortable touch targets (roughly 44px).
- Make the menu and form usable without hover.

## 10. Accessibility checklist

- Semantic landmarks and a single clear page-level heading.
- Logical heading order.
- Keyboard access for all interactive controls.
- Focus styles never removed without replacement.
- Useful alt text for meaningful images; empty alt for decoration.
- Form labels and errors programmatically associated.
- Sufficient color contrast.
- Reduced-motion support.
- Do not rely only on color, animation, or icons to communicate meaning.
- Test with browser accessibility tools during implementation.

## 11. Content tone

- Professional, concise, specific, and honest.
- Prefer “I’m building…” for active learning/projects.
- Avoid unsupported claims such as “expert,” “industry-leading,” or fabricated years of experience.
- Keep the primary message focused on full-stack development and junior job/internship readiness.
