---
name: Archon
description: AI-native Technical Architect for engineering teams
colors:
  primary: oklch(0.541 0.281 293.009)
  primaryForeground: oklch(0.985 0 0)
  secondary: oklch(0.967 0.001 286.375)
  secondaryForeground: oklch(0.21 0.006 285.885)
  background: oklch(1 0 0)
  foreground: oklch(0.141 0.005 285.823)
  muted: oklch(0.967 0.001 286.375)
  mutedForeground: oklch(0.485 0.012 286.05)
  accent: oklch(0.967 0.001 286.375)
  accentForeground: oklch(0.21 0.006 285.885)
  destructive: oklch(0.55 0.22 27)
  destructiveForeground: oklch(0.985 0 0)
  border: oklch(0.85 0.004 286.32)
  input: oklch(0.85 0.004 286.32)
  ring: oklch(0.541 0.281 293.009)
  card: oklch(1 0 0)
  cardForeground: oklch(0.141 0.005 285.823)
  popover: oklch(1 0 0)
  popoverForeground: oklch(0.141 0.005 285.823)
typography:
  fontFamily: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
  fontSize:
    xs: 0.75rem
    sm: 0.875rem
    base: 1rem
    lg: 1.125rem
    xl: 1.25rem
    '2xl': 1.5rem
    '3xl': 1.875rem
    '4xl': 2.25rem
    '5xl': 3rem
    '6xl': 3.75rem
    '7xl': 4.5rem
  fontWeight:
    normal: 400
    medium: 500
    semibold: 600
    bold: 700
  lineHeight:
    tight: 1.25
    normal: 1.5
    relaxed: 1.75
rounded:
  sm: 0.375rem
  md: 0.5rem
  lg: 0.65rem
  xl: 0.75rem
  '2xl': 1rem
  '3xl': 1.25rem
  '4xl': 1.5rem
spacing:
  xs: 0.5rem
  sm: 0.75rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  '2xl': 2.5rem
  '3xl': 3rem
  '4xl': 4rem
components:
  Button:
    variants:
      default:
        background: primary
        foreground: primaryForeground
        hover: primary/90
      destructive:
        background: destructive
        foreground: destructiveForeground
        hover: destructive/90
      outline:
        border: input
        background: background
        hover: accent
      secondary:
        background: secondary
        foreground: secondaryForeground
        hover: secondary/80
      ghost:
        hover: accent
      link:
        color: primary
        underline: true
    sizes:
      sm: h-9 px-3
      default: h-10 px-4 py-2
      lg: h-11 px-8
      icon: h-10 w-10
  Card:
    background: card/60
    border: border/70
    radius: 2xl
    shadow: sm
    hover:
      transform: translateY(-4px)
      shadow: lg
      background: card
  SpotlightCard:
    background: card
    border: border
    radius: 3xl
    spotlight: radial-gradient at cursor position
    transition: 500ms ease-in-out
  FeatureCard:
    background: card/60
    border: border/70
    radius: 2xl
    backdrop: blur
    eyebrow:
      background: primary/10
      color: primary
      radius: full
      padding: px-3 py-1
      size: xs
---

# Overview

Archon's visual system is built for technical precision and clarity. The design prioritizes information density without overwhelming users, using a restrained purple-violet primary color that signals AI sophistication while maintaining professional credibility. The interface balances modern SaaS patterns with developer-tool familiarity—clean typography, subtle motion, and purposeful visual hierarchy.

**The Restrained Color Rule.** A single primary hue (purple-violet at 293°) carries all accent and interactive states. The surface remains neutral with subtle tinting toward the primary hue in dark mode. This creates visual coherence without the saturated AI-tool monoculture.

**The Motion Feedback Rule.** Motion exists to convey state changes and user feedback, never decoration. Transitions are fast (150-300ms) with ease-out curves. The only exception is the DarkVeil WebGL background, which provides ambient depth in dark mode without competing with content.

**The Clarity Hierarchy Rule.** Information is organized through deliberate contrast: headings use bold weights and large scales, body text stays at readable line lengths (65-75ch), and muted text is reserved for supporting information only. No gradient text, no decorative borders, no visual noise that doesn't serve comprehension.

# Colors

Archon uses a **Restrained** color strategy with a single primary hue family. The purple-violet anchor (OKLCH 293°) carries all interactive states, accents, and brand presence. Surfaces remain near-neutral with subtle chroma shifts toward the primary hue in dark mode.

**Primary hue family**: Purple-violet (293°) - conveys AI sophistication, technical precision, and modern SaaS credibility without the saturated blue monoculture of developer tools.

**Light mode**: Near-white background (OKLCH L 1.0) with very low chroma. Text is near-black (OKLCH L 0.141) for maximum readability. The primary color is saturated (C 0.281) for clear interactive affordances.

**Dark mode**: Deep charcoal background (OKLCH L 0.141) with minimal chroma. Text is near-white (OKLCH L 0.985). The primary color shifts slightly lighter (OKLCH L 0.606, C 0.25) to maintain contrast against dark surfaces.

**Semantic state colors**:
- Success: Green-500 (inline usage in progress indicators)
- Warning: Amber-500 (gap detection alerts)
- Error: Red/orange hue (destructive actions)

**The No-Gradient-Text Rule.** Text is always solid color. Emphasis comes from weight, size, and contrast, not background clipping. The hero heading uses a gradient only as a deliberate brand statement, not a pattern to repeat.

**The Muted-Text Floor Rule.** Muted text must maintain ≥4.5:1 contrast against its background. The current muted-foreground (OKLCH L 0.485) is sufficiently dark on light backgrounds and sufficiently light on dark backgrounds.

# Typography

Archon uses a **single sans-serif** system font stack. This is a product UI decision—consistency and familiarity outweigh display-body pairing. The system stack ensures fast loading and native feel across platforms.

**Font family**: System UI stack (San Francisco on macOS, Segoe UI on Windows, Roboto on Android). This is the right choice for a developer tool—users expect system fonts in their tools.

**Scale**: Fixed rem scale with 1.125–1.2 ratio between steps. No fluid clamp sizing—product UI views at consistent DPI, and fluid headings in sidebars look worse, not better.

**Weight usage**:
- Normal (400): Body text, descriptions
- Medium (500): Labels, small UI text
- Semibold (600): Section headings, card titles
- Bold (700): Hero heading, emphasis

**Line length**: Body text capped at 65-75ch using `text-pretty` and `line-clamp` utilities. This is enforced in feature descriptions and problem statements.

**The No-Display-Font Rule.** Display fonts are prohibited in UI labels, buttons, and data. The only exception is the hero heading, which uses the system font at a large scale with gradient treatment as a deliberate brand moment.

**The Tight-Scale Rule.** Type scale stays between 1.125 and 1.2 ratio. Exaggerated contrast creates noise in product UI. The current scale (xs at 0.75rem through 7xl at 4.5rem) follows this constraint.

# Elevation

Archon uses **flat by default with purposeful layering**. Shadows are subtle and reserved for interactive states. This follows the responsive motion energy—state changes get elevation, static content stays flat.

**Shadow scale**:
- None: Static cards, sections
- sm: Default cards, subtle depth
- lg: Hover states on cards
- 2xl: Auth glass panels, modals

**Backdrop blur**: Used sparingly for glass effects (auth panels, sticky header). The `auth-glass` utility applies backdrop-blur-xl with border transparency.

**The No-Decorative-Shadow Rule.** Shadows exist only to convey interactive state or layer separation. No drop shadows on static elements, no colored glows without purpose. The auth-glow utility is the exception—used only on authentication surfaces to create a focal moment.

**The Glass-Exception Rule.** Glassmorphism is permitted only when it serves a functional purpose: creating visual separation between layers (sticky header, modals, auth panels). Never as a decorative background pattern.

# Components

## Button

Shadcn/UI button with six variants (default, destructive, outline, secondary, ghost, link) and four sizes (sm, default, lg, icon). Primary actions use the default variant with the primary color. Secondary actions use ghost or outline.

**State handling**: All variants include hover, focus-visible (ring), and disabled states. Focus ring uses the ring color with 70% opacity and 2px offset from background.

**The Consistent-Button-Vocabulary Rule.** All buttons across the surface must use these variants. No custom button styles outside this system. If a new affordance is needed, extend the variants, don't invent a new button.

## Card

Used for feature cards, problem statements, and content grouping. Default state uses card/60 background with border/70 and rounded-2xl. Hover state lifts (-translate-y-1) and increases shadow to lg.

**FeatureCard**: Specialized card with eyebrow badge (primary/10 background, primary text), bullet points with primary dot indicators, and footer metadata. Used in the Features section.

**SpotlightCard**: Interactive card with mouse-tracking spotlight effect. Uses radial-gradient at cursor position with 500ms ease-in-out transition. Reserved for high-interaction surfaces (currently Problems section).

**The No-Nested-Cards Rule.** Cards never contain other cards. If content needs grouping, use borders or background tints within the parent card, not nested card structures.

## Navigation

**SlidingNav**: Custom navigation with animated pill background that tracks active section. Uses IntersectionObserver to detect visible sections and smooth cubic-bezier transition (0.22, 1, 0.36, 1) for pill movement. Active state uses primary background with primary-foreground text.

**Header**: Sticky header with backdrop-blur on scroll. Contains logo, SlidingNav, theme toggle, and auth buttons. Mobile view collapses to hamburger menu (currently placeholder).

**The Active-State-Only Rule.** Navigation highlights only the currently visible section. No "visited" state or hover decoration beyond the pill. The pill itself is the affordance.

## DarkVeil

WebGL-based animated background for dark mode hero section. Uses OGL library with custom fragment shader featuring CPPN (Compositional Pattern-Producing Network) for procedural generation. Includes hue shift, noise, scanline, and warp parameters for ambient motion.

**Usage**: Only in dark mode hero section. Light mode shows solid background. This is a deliberate brand moment, not a pattern to repeat elsewhere.

**The Ambient-Only Rule.** DarkVeil is background only—never overlay content. Its opacity and blend mode are tuned to stay behind text and interactive elements.

# Do's and Don'ts

**Do**:
- Use the primary color for all interactive states, accents, and brand moments
- Maintain 4.5:1 contrast for body text and 3:1 for large text
- Use motion to convey state changes (hover, focus, active, loading)
- Keep line length under 75ch for body text
- Use the system font stack for all UI text
- Apply backdrop-blur only for functional layer separation
- Use the button variants from the design system—don't invent new button styles
- Reserve the spotlight effect for high-interaction surfaces
- Keep shadows subtle and purposeful
- Use the card system for content grouping

**Don't**:
- Use gradient text except in the hero heading (the one deliberate brand moment)
- Apply side-stripe borders as colored accents
- Use glassmorphism as a decorative background pattern
- Nest cards within cards
- Use display fonts in UI labels, buttons, or data
- Create custom button styles outside the variant system
- Apply decorative motion that doesn't convey state
- Use the saturated AI-tool monoculture (cream/sand backgrounds, generic blue accents)
- Add numbered section markers (01/02/03) above every section
- Use identical card grids as the default layout pattern
