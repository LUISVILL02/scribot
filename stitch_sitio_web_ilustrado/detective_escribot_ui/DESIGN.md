---
name: Detective Escribot UI
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#00668a'
  on-secondary: '#ffffff'
  secondary-container: '#40c2fd'
  on-secondary-container: '#004d6a'
  tertiary: '#5e4400'
  on-tertiary: '#ffffff'
  tertiary-container: '#7b5b00'
  on-tertiary-container: '#ffd681'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
  renglon-cielo: '#38BDF8'
  renglon-cielo-light: '#E0F2FE'
  renglon-pasto: '#22C55E'
  renglon-pasto-light: '#DCFCE7'
  renglon-tierra: '#B45309'
  renglon-tierra-light: '#FEF3C7'
  surface-paper: '#F8FAFC'
  surface-card: '#FFFFFF'
  status-pending: '#94A3B8'
  status-progress: '#4F46E5'
  status-completed: '#22C55E'
typography:
  display:
    fontFamily: Quicksand
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-mobile:
    fontFamily: Quicksand
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Quicksand
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Quicksand
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Nunito Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  label-sm:
    fontFamily: Quicksand
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system is constructed for fifth-grade primary students (ages 10–11) transitioning from basic motor skills to fluid handwriting, orthography, and self-directed revision. The tone balances playful exploration with academic confidence: encouraging, pedagogical, accessible, and structured without being babyish. The UI personality takes cues from detective inquiry—investigating letters, tracking trajectories, and uncovering legibility secrets—personified by a friendly robot mentor.

Visually, the system adopts a **Tactile-Playful Modern** aesthetic:
- **Clean surfaces & generous margins** to eliminate cognitive overload and sensory fatigue.
- **Physical tactile affordances**: Chunky buttons, defined outlines, and physical notebook metaphors (the tripartite handwriting line: Sky, Grass, Earth).
- **Gamified clarity**: Crisp badge containers, star rewards, and prominent touch-friendly feedback elements engineered for tablets, touch displays, and laptops alike.

## Colors

The palette organizes interface functions through distinct, purposeful roles while protecting educational spatial anchors:

- **Primary (`#4F46E5` - Robotic Indigo)**: Used for primary navigation, current mission focus, detective identity accents, and high-priority interactive buttons.
- **Secondary (`#38BDF8` - Sky Cyan)**: Denotes contextual clues, drawing overlays, and technological gadget elements.
- **Tertiary (`#FBBF24` - Reward Star Amber)**: Reserved strictly for achievement stars, celebration bursts, badges, and progress milestones.
- **Neutral (`#0F172A` - Ink Slate)**: High-contrast ink tone for crisp typography on paper-white containers.

### Pedagogical Renglón Tokens (Non-Negotiable)
The handwriting guidelines depend on an invariable tripartite color system:
- **Cielo (`#38BDF8` / `#E0F2FE`)**: Guides uppercase letters and ascending stems (`b`, `d`, `t`, `l`, `h`).
- **Pasto (`#22C55E` / `#DCFCE7`)**: The vital base track where the majority of lowercase characters dwell (`a`, `c`, `e`, `m`, `n`, `o`).
- **Tierra (`#B45309` / `#FEF3C7`)**: Anchors descending tails into the ground (`p`, `q`, `g`, `j`, `y`).

## Typography

The type system pairs **Quicksand** (display, headings, key labels) with **Nunito Sans** (body instructions, checklists, feedback dialogues). 

- **Quicksand** brings friendly geometry with rounded stroke terminals that visually mirror handwriting motion and robot character geometry without distorting stroke proportions.
- **Nunito Sans** ensures open counters and balanced ascenders/descenders, maintaining pristine legibility during prolonged reading of instructions or checklist criteria on touch tablets.
- Letter spacing is slightly relaxed on interactive labels to facilitate finger targeting and fast scanning for 10-year-olds.

## Layout & Spacing

The layout operates on a **12-column responsive fluid grid** with strict whitespace governance to prevent visual clutter (`evitar interfaces saturadas`):

- **Breakpoints**: Mobile (`< 640px`), Tablet (`640px – 1024px`), Desktop (`> 1024px`).
- **Canvas Focus**: Interactive handwriting surfaces (SVG trace paths and Canvas workbenches) occupy a dedicated container with a minimum 480px height on desktop and full viewport-width minus margins on tablets.
- **Component Padding & Gaps**:
  - `space-xs` (4px): Micro gaps between icons and badge text.
  - `space-sm` (8px): Form checklist offsets and tag chip insets.
  - `space-md` (16px): Standard internal padding for list items, feedback speech bubbles, and interactive controls.
  - `space-lg` (24px): Card interior paddings, module card grid gaps.
  - `space-xl` (40px): Section breaks between mission cards, canvas workspace headers, and footer revision tools.

## Elevation & Depth

Visual hierarchy uses tactile physical layering rather than dark or dramatic drop shadows, maintaining a paper-like classroom clarity:

- **Base Layer (Level 0)**: Page backdrop in soft paper mist (`#F8FAFC`).
- **Card Containers (Level 1)**: Pure white (`#FFFFFF`) rounded surfaces framed with a crisp low-contrast 2px border in `#E2E8F0` and a subtle tactile offset shadow (`0 4px 0 #CBD5E1`).
- **Interactive Tactile Buttons (Level 2)**: Chunky bevel appearance achieved with a solid 4px bottom border offset (`box-shadow: 0 4px 0 #3730A3` for indigo buttons). On active/press states, the shadow translates to `0 1px 0` with a 3px downward translation, giving immediate physical feedback to young learners.
- **Modal Dialogues & Detective Inspect Overlays (Level 3)**: Supported by soft ambient diffused halos (`0 12px 32px -4px rgba(15, 23, 42, 0.12)`) and light backdrop scrim (`rgba(15, 23, 42, 0.4)`).
- **Z-Index Layering on Drawing Canvases**:
  - *Z-0*: Guide bands (Cielo, Pasto, Tierra fills and boundary rules).
  - *Z-1*: Letter trace path guide (dotted outlines, start-point indicator circles).
  - *Z-2*: Active user stroke canvas (real-time vector/brush rendering).
  - *Z-3*: Floating robot mentor hints and undo/redo floating controls.

## Shapes

The design system adopts **Level 2 (Rounded)** geometries:
- Standard elements (inputs, mission cards, checklist items): `0.5rem` (8px).
- Larger containers, speech bubbles, and modal frames: `1rem` (16px) via `rounded-lg`.
- Hero interaction cards, badge chips, and canvas frames: `1.5rem` (24px) via `rounded-xl`.
- Interactive action buttons and status pills: fully pill-shaped (`9999px`) to invite natural fingertip tapping.

## Components

### 1. Primary & Secondary Action Buttons
- **Touch target**: Minimum 52px height on mobile/tablet; 48px on desktop.
- **Primary**: Background `#4F46E5`, text `#FFFFFF`, rounded pill (`rounded-full`), font `label-lg`, bottom offset border `4px solid #3730A3`. Active state eliminates bottom offset to simulate physical push.
- **Secondary / Action**: Background `#38BDF8`, text `#0F172A`, bottom border `4px solid #0284C7`.
- **Icon integration**: Lucide icon aligned to the left of the label with `space-sm` gap.

### 2. The Interactive Guideline Canvas (Renglón Tridimensional)
- A 3-banded horizontal container with 1.5rem rounded outer frame.
- **Top Third (Cielo)**: Tint `#E0F2FE` with a dashed separator `#38BDF8`.
- **Middle Third (Pasto)**: Tint `#DCFCE7` with a solid baseline stroke `#22C55E` (2px).
- **Bottom Third (Tierra)**: Tint `#FEF3C7` with a solid ground baseline stroke `#B45309` (2px).
- Margin icons: Micro visual hints on the left gutter (cloud icon for Cielo, blade-of-grass icon for Pasto, acorn/earth icon for Tierra).

### 3. Mission & Module Cards
- White background (`#FFFFFF`), `1rem` border radius, `2px solid #E2E8F0` border.
- Includes a dedicated status tag at top-right:
  - **Pendiente**: Slate background `#F1F5F9`, text `#64748B`.
  - **En progreso**: Indigo background `#EEF2FF`, text `#4F46E5`.
  - **Completada**: Green background `#DCFCE7`, text `#15803D` with a checkmark badge.
- Mission number badge rendered in a soft circle chip at the top left.

### 4. Detective Checklist ("Mi lista de revisión")
- Card items with interactive tap area of 48px height minimum.
- Custom square checkbox with `0.375rem` radius, 2px border `#94A3B8`.
- Checked state: Vibrant `#22C55E` fill with bold white checkmark and smooth cross-out transition on label text.

### 5. Detective Escribot Hint Bubble
- Speech balloon container with `rounded-xl`, soft paper fill (`#FFFFFF`), bordered with `#38BDF8` (2px).
- Includes directional tail pointing toward the mascot portrait.
- Accompanied by audio prompt toggle icon button (`Lucide: Volume2`) for auditory reinforcement.

### 6. Star Reward Badges
- Hexagonal or circular pill badges with star icon (`#FBBF24`), solid gold outline, and subtle playful scale bounce on unlock.