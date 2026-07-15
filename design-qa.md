# Barrier Intelligence marketing site — design QA

- Source visual truth: `C:\Users\ASUSRO~1\AppData\Local\Temp\codex-clipboard-f5158337-c87f-4c64-9e3e-ff41f387b3d7.png`
- Implementation screenshots:
  - `qa/qa-home-motion.png` — GSAP loading sequence in progress.
  - `qa/qa-motion-reduced.png` — desktop light theme with reduced motion enabled.
  - `qa/qa-motion-live.png` — AssureLive tab selected through the interactive handler.
  - `qa/qa-motion-contact.png` — dark-theme pilot dialog opened through the interactive handler.
- Viewport: 1440 × 1000 desktop; responsive behavior additionally checked at the mobile breakpoint.
- State: light and dark themes, loader, reduced-motion fallback, product-tab transition, and pilot dialog.

## Findings

No actionable P0, P1, or P2 issues remain.

- Fonts and typography: Hanken Grotesk preserves the Ceramic Barrier Intelligence typography policy. Display scale, tight heading tracking, mono evidence labels, and sentence casing remain legible in both themes. The loader uses the mono evidence vocabulary without introducing a competing display face.
- Spacing and layout rhythm: the reference's airy white stage, large editorial type, thin dividers, and contained evidence panels remain intact. GSAP uses transforms and opacity only, so layout geometry does not shift while animating.
- Colors and visual tokens: motion retains the white/near-black canvases, warm-gold action signal, restrained lime detector signal, and RAG colors only inside the credit register.
- Image quality and asset fidelity: both project-bound 3D renders remain sharp, correctly cropped, and free of placeholder or CSS-generated imagery. The hero parallax uses a small scale buffer to avoid exposing edges.
- Copy and content: motion reinforces the PRD sequence—Evidence → Geometry → Physics → Credit—without changing claim discipline, product status, sources, or audience positioning.
- Accessibility and interaction: `prefers-reduced-motion` removes the loader and all GSAP choreography. Native focus behavior remains intact. Product tabs update `aria-selected`; the dialog retains native modal semantics and supports Escape/outside/Close dismissal.

## Full-view comparison evidence

The reduced-motion desktop capture confirms that the final resting state preserves the approved reference-led composition. The loader capture confirms a visually consistent motion layer rather than a separate visual system.

## Focused-region comparison evidence

Focused captures cover the AssureLive tab state and dark pilot dialog because these are the most interaction-sensitive regions. The 3D hero, problem render, register, method, products, and proof sections were visually checked in the preceding QA pass and retain the same layout after the motion-only change.

## Comparison history

1. Earlier P2: the 390 px hero headline and CTA row overflowed. Fixed with a mobile-specific type scale, explicit line control, stacked actions, and horizontal overflow protection. Post-fix mobile evidence passed.
2. Earlier P2: the native `hidden` attribute was overridden by authored display rules, allowing both product panels to participate in layout. Fixed with `[hidden] { display: none !important; }`. Post-fix Assure3D and AssureLive captures passed.
3. Motion pass: added self-hosted GSAP 3.15.0 + ScrollTrigger, loader, scroll reveals, metric counters, 3D pointer depth, product-tab transitions, dialog motion, and reduced-motion bypass. No layout or content regressions found in post-change captures.

## Implementation checklist

- [x] GSAP and ScrollTrigger vendored locally and loaded before application code.
- [x] Loader exits without blocking content; CSS failsafe included.
- [x] Scroll reveals use one-time triggers and transform/opacity animation.
- [x] Counters preserve exact suffixes, decimals, and padded values.
- [x] Product tabs and dialog animate while retaining semantic state.
- [x] Reduced-motion users receive the complete static page immediately.
- [x] JavaScript syntax and dependency audit pass.

## Follow-up polish

- P3: tune individual ScrollTrigger start points after observing real production analytics and typical device scroll velocity.

final result: passed

---

# Brand-alignment verification â€” 14 July 2026

**Source visual truth**

- Theme policy: `C:\Users\ASUS ROG STRIX\Documents\CODE\Ceraminc-Design-System\packages\design-system\src\manifests\theme-barrier-intelligence.json`
- Theme tokens: `C:\Users\ASUS ROG STRIX\Documents\CODE\Ceraminc-Design-System\packages\design-system\src\themes\barrier-intelligence.css`
- Official logo source: `C:\Users\ASUS ROG STRIX\Downloads\Barrier Intelligence Logo\Barrier Intelligence Logo + Gold Symbol.svg`

**Implementation evidence**

- `qa/brand-v1-light.png` — 1440 × 1000 V1 light state.
- `qa/brand-v1-dark.png` — 1440 × 1000 V1 dark state.

**Findings**

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: Hanken Grotesk remains the only Latin interface/display family; the official logo keeps its own supplied lettering rather than substituting a typed approximation.
- Spacing and layout rhythm: the full lockup is scaled to retain header balance in light mode; its compact gold-symbol treatment preserves the same rhythm against V1's dark theme.
- Colors and tokens: warm gold matches the theme's primary signal role; light and dark backgrounds, ink hierarchy, card steps, borders, and controls map to the Barrier Intelligence semantic palette.
- Image quality and asset fidelity: the header and footer use the supplied SVG source assets, with no CSS-drawn or hand-built logo replacement.
- Copy and interaction: V1's theme switch remains functional, and the logo treatment responds correctly to both states.

**Focused-region comparison evidence**

Header/logo regions were reviewed at the same 1440 × 1000 viewport in both theme states because logo contrast and lockup density are the fidelity-sensitive areas.

**Comparison history**

1. P1: SVG logos initially loaded as generic binary data from the local preview server. Fixed by serving `.svg` with `image/svg+xml`; post-fix captures show the supplied logo correctly in both V1 theme states.

**Implementation checklist**

- [x] Official gold lockup added to V1 light surfaces.
- [x] Official gold symbol added to V1 dark surfaces.
- [x] Semantic Barrier Intelligence tokens aligned with the Ceramic theme policy.
- [x] Header/logo contrast verified in both states.

final result: passed
