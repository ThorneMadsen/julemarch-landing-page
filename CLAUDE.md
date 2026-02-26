# Julemarch -- Copenhagen Christmas Charity March

## Project Overview

Julemarch is a Christmas charity march held in Copenhagen, Denmark. The cause: raising money to bring presents and joy to children who have to spend Christmas in hospitals. This is a **single-page landing site** designed to drive registrations and donations.

- **Language**: All site copy is in **Danish**
- **Format**: Single scroll page with anchor navigation (no routing)
- **Stack**: React 19 + Vite 7 + JSX

## Tech Stack

Already set up:
- React 19, Vite 7, ESLint, `@vitejs/plugin-react-swc`
- Package manager: npm
- Scripts: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`

Additions (no new npm dependencies):
- **CSS Modules** (`.module.css`) -- built into Vite, scoped per component
- **Google Fonts** via `<link>` in `index.html`: Playfair Display (headings) + Inter (body)

Do NOT add: routing, state management libraries, TypeScript, or form libraries.

## Design System

Define all values as CSS custom properties in `src/index.css`.

### Colors

```css
:root {
  --color-primary: #8B1A1A;        /* Deep Christmas red */
  --color-primary-light: #C41E3A;  /* Brighter red for CTAs/hover */
  --color-secondary: #1B4332;      /* Deep forest green */
  --color-secondary-light: #2D6A4F;/* Lighter green for accents */
  --color-gold: #D4A843;           /* Warm gold for highlights */
  --color-cream: #FFF8F0;          /* Warm off-white background */
  --color-snow: #FFFFFF;           /* White for cards */
  --color-text: #2C1810;           /* Dark warm brown for body */
  --color-text-light: #6B5B4F;     /* Lighter brown for secondary text */
  --color-dark-bg: #1A0F0A;        /* Very dark backgrounds */
}
```

### Typography

```css
:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-size-hero: clamp(2.5rem, 5vw, 4.5rem);
  --font-size-h2: clamp(1.75rem, 3vw, 2.5rem);
  --font-size-h3: clamp(1.25rem, 2vw, 1.5rem);
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
}
```

### Spacing (8px base)

```css
:root {
  --space-xs: 0.5rem;     /* 8px */
  --space-sm: 1rem;        /* 16px */
  --space-md: 1.5rem;      /* 24px */
  --space-lg: 2rem;        /* 32px */
  --space-xl: 3rem;        /* 48px */
  --space-2xl: 4rem;       /* 64px */
  --space-section: 5rem;   /* 80px vertical section padding */
}
```

### Layout

- Max content width: `1200px`, centered with `margin: 0 auto`
- Mobile-first breakpoints: `480px`, `768px`, `1024px`
- Section padding: `var(--space-section)` vertical, `var(--space-sm)` horizontal on mobile

### Design Mood

Warm, festive, trustworthy. Think "premium charity invitation" -- not cartoonish. Use subtle decorative elements (snowflakes, stars) sparingly via CSS, not heavy graphics.

## Page Sections

Build these top to bottom. Each is a `<section id="...">` with its own component folder.

### 1. Navbar
Sticky top bar. Julemarch logo/wordmark on left, anchor links to sections in center, "Tilmeld dig nu" CTA button on right. Collapses to hamburger menu on mobile.

### 2. Hero
Full viewport height. Warm gradient or dark overlay background. Large heading (e.g., "Gå med for hospitalsbørn denne jul"), emotional subheading about the cause, prominent "Tilmeld dig" CTA button, and a **countdown timer** to the event date (December 14, 2026).

### 3. About / Mission
Two-column layout (image placeholder + text) on desktop, stacked on mobile. Explains what Julemarch is and the cause it supports. Include 2-3 impact statistics displayed as large styled numbers (e.g., "5.000+ Deltagere", "2M DKK Indsamlet", "12 År").

### 4. Event Details
Card-based grid showing: Dato og Tid, Rute/Lokation (start/slut Rådhuspladsen), Distancer (3km Familie, 7km Standard, 15km Udfordring), Hvad du skal medbringe, Efterfest. Use simple SVG icons for each card.

### 5. Fundraising Progress
Visual thermometer/progress bar. Show current amount raised (DKK 327.450) vs goal (DKK 500.000) and number of donors. Animate the fill on scroll into view using IntersectionObserver.

### 6. How It Works
Three-step horizontal layout: (1) Tilmeld dig, (2) Indsaml/Del, (3) Gå marchen. Simple icons with brief text under each step.

### 7. Testimonials
Grid of 2-3 participant quotes with name, optional photo placeholder, and year of participation. Danish quotes about the experience and impact.

### 8. Gallery
CSS grid of placeholder image boxes from previous events. Use styled colored rectangles with descriptive text labels (e.g., "Foto: Familier der går med lanterner") -- not actual `<img>` tags pointing to missing files.

### 9. Registration Form
Simple client-side form: Navn, E-mail, Distance (dropdown), Holdnavn (optional). "Tilmeld" submit button. No backend -- show a success message on submit. Use controlled components with `useState`.

### 10. Sponsors
Logo grid of sponsor placeholders. Grayscale styled boxes with placeholder company names.

### 11. Footer
Dark background (`var(--color-dark-bg)`). Organization info, social media icon links, contact email, copyright. Cream/gold text.

## Component Architecture

```
src/
  main.jsx                          # Entry point (keep as-is)
  App.jsx                           # Root: imports and stacks all sections
  App.module.css                    # Minimal layout styles for App
  index.css                         # CSS reset, custom properties, global typography
  components/
    Navbar/
      Navbar.jsx
      Navbar.module.css
    Hero/
      Hero.jsx
      Hero.module.css
    About/
      About.jsx
      About.module.css
      StatCard.jsx
    EventDetails/
      EventDetails.jsx
      EventDetails.module.css
      DetailCard.jsx
    FundraisingProgress/
      FundraisingProgress.jsx
      FundraisingProgress.module.css
      ProgressBar.jsx
    HowItWorks/
      HowItWorks.jsx
      HowItWorks.module.css
      Step.jsx
    Testimonials/
      Testimonials.jsx
      Testimonials.module.css
      TestimonialCard.jsx
    Gallery/
      Gallery.jsx
      Gallery.module.css
    RegistrationForm/
      RegistrationForm.jsx
      RegistrationForm.module.css
    Sponsors/
      Sponsors.jsx
      Sponsors.module.css
    Footer/
      Footer.jsx
      Footer.module.css
  hooks/
    useCountdown.js                 # Returns { days, hours, minutes, seconds } to target date
    useScrollReveal.js              # IntersectionObserver hook for scroll-triggered animations
  data/
    content.js                      # ALL text content, stats, testimonials, event details
```

## Coding Conventions

- **Components**: Functional only. Default export for section components, named exports for sub-components.
- **Styling**: CSS Modules (`.module.css`). Never hardcode colors or spacing -- always use CSS custom properties.
- **Content**: All text lives in `src/data/content.js` as exported objects/arrays. Never hardcode strings in JSX.
- **HTML**: Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`. Each `<section>` gets an `id` for anchor links.
- **CSS approach**: Mobile-first. Base styles are mobile, add `@media (min-width: ...)` for larger screens. Use `rem` for sizing. CSS Grid for page layouts, Flexbox for component alignment.
- **Animations**: CSS `@keyframes` and `transition` only. Always respect `prefers-reduced-motion`.
- **Props**: Destructure in function signature. No prop-types.
- **Naming**: camelCase for JS, kebab-case for CSS class names within modules.
- **Images**: Use styled placeholder boxes (colored `<div>` elements with descriptive text) instead of `<img>` tags pointing to missing files. Each placeholder should have a label describing what the real image would show.

## Placeholder Content (Danish)

- **Cause**: Julegaver og glæde til børn der tilbringer julen på hospitalet
- **Event date**: 14. december 2026
- **Location**: Start og slut ved Rådhuspladsen, København
- **Distances**: 3km (Familie), 7km (Standard), 15km (Udfordring)
- **Fundraising goal**: DKK 500.000
- **Amount raised**: DKK 327.450
- **Registered walkers**: 1.247
- **Testimonials**: 2-3 invented Danish quotes from past participants

## Build Order

When implementing, follow this order:
1. Set up `index.css` with CSS reset, custom properties, and global typography
2. Add Google Fonts `<link>` tags to `index.html`, update `<title>` and meta
3. Build `src/data/content.js` with all placeholder content
4. Build Navbar and Hero (establishes the visual identity)
5. Build remaining sections top-to-bottom
6. Add `useCountdown` and `useScrollReveal` hooks
7. Wire up scroll animations last
8. Test responsive design at each breakpoint (480px, 768px, 1024px)

## Accessibility

- All interactive elements keyboard-accessible
- Color contrast meets WCAG AA minimum
- Form inputs have proper `<label>` elements
- Skip-to-content link in Navbar
- Alt text on all images (placeholder descriptions count)
