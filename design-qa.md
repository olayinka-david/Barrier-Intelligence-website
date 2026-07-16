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

# 3D footer and legal routes — 16 July 2026

**Source visual truth**

- `C:\Users\ASUSRO~1\AppData\Local\Temp\codex-clipboard-4a08ec05-ad78-4a5d-9887-08273791383a.png` — floating rounded information panel over a cinematic 3D journey landscape.
- Existing V1 grayscale, white-stage, gold-physics and lime-detector image language.

**Implementation evidence**

- `qa/legal-footer-desktop-final2.png` — 1440 × 900 light footer state.
- `qa/legal-footer-dark.png` — dark-panel theme treatment.
- `qa/legal-privacy-desktop-final.png` — 1440 × 1000 Privacy Policy route.
- `qa/legal-footer-comparison.png` — normalized same-input comparison of the source and implementation.

**Findings**

No actionable P0, P1 or P2 differences remain.

- Fonts and typography: the footer retains V1 Hanken Grotesk and mono metadata roles while matching the source's quiet hierarchy and compact link density.
- Spacing and layout rhythm: the wide rounded panel floats above the lower scene with the source's large outer frame, balanced columns, divider and calm whitespace.
- Colors and visual tokens: orange was intentionally translated into the established Barrier Intelligence gold; the lime signal remains restricted to detector/pilot status.
- Image quality and asset fidelity: the generated 3D scene is a real raster asset, not CSS art. It preserves the source's rolling journey composition while replacing the logistics subject with a process module, pipeline path, technical contours and detector beacons.
- Copy and content: navigation is product-specific and both legal routes are present. Privacy copy reflects the static site's current behavior; terms preserve the product's prototype and engineering-authority boundaries.
- Responsive and theme states: the panel collapses to two-column link groups on small screens, the scene repositions to preserve the route, and dark mode uses an opaque high-contrast panel over the same art.

**Comparison history**

1. P2: the first footer crop hid the process module behind the information panel. Fixed by top-aligning the generated landscape within the frame; the post-fix capture exposes the plant and the verification path beneath the panel.

**Focused-region comparison evidence**

The full footer is the fidelity-sensitive component and is fully legible in the combined comparison, so a separate crop was not required.

**Implementation checklist**

- [x] Shared 3D footer applied to all V1 and legal routes.
- [x] Product, assurance, legal and contact links resolve.
- [x] Light and dark footer treatments checked.
- [x] Privacy Policy and Terms & Conditions routes added.
- [x] Safety-critical reliance and pilot-data boundaries stated.

final result: passed

---

# V1 multi-page expansion — 16 July 2026

**Source visual truth**

- The production V1 homepage and its established Barrier Intelligence design tokens, logo treatment, white technical stage, warm-gold signal color and grayscale/gold 3D engineering imagery.
- Refero reference lock recorded in `multi-page-strategy.md`: Groq for industrial-minimal section rhythm, Fingerprint for data-sheet precision, Programa for architectural editorial structure and Operate for ordered ledger logic only.

**Implementation evidence**

- `qa/multipage-design-comparison.png` — same-viewport comparison of the V1 homepage and the new Method route.
- `qa/multipage-assure3d-desktop.png`, `qa/multipage-method-desktop.png`, `qa/multipage-applications-desktop.png`, `qa/multipage-evidence-desktop.png`, `qa/multipage-pilot-desktop.png` — 1440 × 1000 route captures.
- `qa/multipage-method-mobile-final.png`, `qa/multipage-pilot-mobile-final.png`, `qa/multipage-evidence-mobile-final.png` — narrow responsive captures.
- `qa/multipage-method-dark.png` — dark-theme verification.
- `qa/multipage-method-long.png`, `qa/multipage-applications-long.png`, `qa/multipage-evidence-long.png`, `qa/multipage-pilot-long.png` — long-page content and rhythm checks.

**Findings**

No actionable P0, P1 or P2 differences remain.

- Visual consistency: the five routes preserve the V1 typography, white/off-white surfaces, restrained gold signal role, thin borders, square engineering frames and official logo assets.
- Information architecture: each page resolves one buyer question—product, method, application, evidence or pilot—without duplicating the homepage narrative.
- Image fidelity: the two generated technical scenes match the existing grayscale/gold isometric asset family and fit their measured 16:10 hero frames without distortion.
- Responsive behavior: desktop split heroes collapse to one column; figures and data tables no longer force the grid wider than the viewport; ordered processes and cards remain readable.
- Theme and interaction: theme state persists across routes; mobile navigation, route links, pilot form, on-load sequence, reveal motion, progress indicator and reduced-motion/QA fallbacks are wired.
- Claims: the pages consistently describe a functional prototype entering pilot deployment, preserve qualified-engineer authority and avoid certification claims.

**Comparison history**

1. P1: default browser margins on hero figures increased the mobile grid min-content width and clipped copy/artwork. Fixed by zeroing figure margins, allowing grid children to shrink and tightening the small-screen display scale.
2. P2: the Evidence hero used a data sheet instead of a figure and therefore missed the hero entrance sequence. Fixed by adding the register to the same GSAP entrance target.
3. P2: mobile menu state changed visually but the control label remained “Menu.” Fixed by synchronising Menu/Close text and resetting after navigation.

**Implementation checklist**

- [x] Five non-footer routes implemented and linked.
- [x] Shared header, theme, mobile navigation and footer applied.
- [x] Two new technical 3D assets added.
- [x] Pilot form validation and completion state implemented.
- [x] Desktop, mobile, long-page and dark-theme visual checks completed.
- [x] Motion honors reduced-motion and deterministic QA capture states.

final result: passed

---

# GSAP interaction refinement â€” 15 July 2026

- Loader-to-hero staging, scroll progress, trust-strip reveal, image parallax, counter motion, card lift, register perspective, and magnetic controls added.
- Motion is limited to transform and opacity where possible and remains disabled for reduced-motion users and deterministic QA captures.
- Desktop final-state capture: `qa/motion-v1-final.png`.

final result: passed

---

# Typography-density refinement — 15 July 2026

**Source visual truth**

- User-provided issue reference: `C:\Users\ASUSRO~1\AppData\Local\Temp\codex-clipboard-f09cfc26-9837-4f38-ad61-831f12333a6e.png`

**Implementation evidence**

- `qa/typography-v1-desktop.png` — 1720 × 920 V1 light desktop, static QA state.

**Findings**

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: the display system now tops out at 5.85rem for the V1 hero and 4.35rem for shared V1 section headings, preserving Hanken Grotesk’s tight, technical character while preventing oversized line wrapping.
- Spacing and layout rhythm: the hero has a dedicated 1560px maximum width, separate from the 1380px navigation and general content shell. Its copy column was widened and the visual column retained enough width to preserve the evidence-render crop.
- Colors and visual tokens: no palette, logo, or theme-state changes were introduced.
- Image quality and asset fidelity: the original hero render remains unaltered and gains more visual breathing room.
- Copy and content: unchanged; only typographic density and layout proportions were refined.

**Focused-region comparison evidence**

The user’s screenshot and the revised 1720px V1 capture were reviewed together. The earlier six-line hero stack is resolved into four intentional lines, with “Fire and gas” no longer split across lines.

**Comparison history**

1. P1: V1's 7.2rem display cap combined with the narrow .85fr copy track produced a visually over-tall, six-line hero at wide desktop widths. Fixed by widening the hero-only shell/copy track and lowering the display cap. Post-fix capture shows the intended horizontal reading rhythm.

**Implementation checklist**

- [x] V1 hero width decoupled from navigation width.
- [x] V1 hero and shared display scale reduced proportionally.
- [x] Desktop visual crop and CTA area preserved.

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
