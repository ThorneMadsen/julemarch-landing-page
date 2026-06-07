# Julemarch '26 — Landing Site

A single-page risograph-poster landing site for **Julemarch '26**, a Copenhagen
Christmas charity march from Helsingør to Rigshospitalet, benefiting Smilfonden.
All copy is in Danish.

Built with **React 18 + Vite**.

---

## Getting started

```bash
npm install
npm run dev      # start the dev server (hot reload) → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

---

## Project structure

```
.
├── index.html            # Vite entry. Fonts + paper-grain/warmth overlays + #root.
├── vite.config.js        # Vite + @vitejs/plugin-react
├── package.json
└── src/
    ├── main.jsx          # Entry: mounts <App>, plus the "t" key Tweaks toggle
    ├── App.jsx           # The whole site — every section component + Tweaks wiring
    ├── tweaks-panel.jsx  # Reusable in-app Tweaks panel (useTweaks + controls)
    └── styles.css        # All styling (design tokens + every section)
```

`App.jsx` holds each section as a component (`Hero`, `What`, `Praktisk`,
`Gallery`, `FAQ`, `Sponsors`, `FinalCTA`, `Foot`) and renders the
`<TweaksPanel>`.

---

## The Tweaks panel

The panel lets you live-edit the palette, paper grain, and hero layout/background.
In the original design tool it was toggled by the host; in this standalone repo
there's no host, so **press the `t` key** to show/hide it.

Available tweaks (defined at the bottom of `App.jsx`):

| Section | Control | Key | Options |
|---------|---------|-----|---------|
| Palette | Riso-palette swatches | `palette` | 4 curated 5-color palettes |
| Tekstur | Papirgrain slider | `grain` | 0–100% |
| Hero | Layout | `heroLayout` | `stacked` / `left` / `split` |
| Hero | Baggrund | `heroBg` | `paper` / `green` / `slate` / `ink` |

`useTweaks` keeps values in React state. (The host-persistence `postMessage`
calls inside `tweaks-panel.jsx` are harmless no-ops outside the design tool.)

> If you don't need the live editor in production, you can delete
> `tweaks-panel.jsx`, drop the `<TweaksPanel>` block from `App.jsx`, and hardcode
> the defaults from the `TWEAK_DEFAULTS` object.

---

## Design tokens

All tokens are CSS custom properties in `:root` (`src/styles.css`). The palette
is also re-applied at runtime by `applyPalette` in `App.jsx`, so these are the
defaults.

### Color — default "Cream + brick & forest" riso palette

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#ece2c8` | Page background; light text on dark panels |
| `--paper-2` | `#e2d6b7` | Secondary paper (photo placeholders) |
| `--ink` | `#1a1f1a` | Primary text, dark panels, borders (via `color-mix`) |
| `--red` | `#c54a3b` | Primary accent / CTA, brick red |
| `--green` | `#4f6b3c` | Forest green accent + tinted hero |
| `--ochre` | `#c98a2a` | Stat numbers, gold accents on dark panels |
| `--slate` | `#2e4a6f` | Cold blue accent + alt tinted hero |

Muted text and borders are derived with `color-mix(in oklab, var(--ink) N%, transparent)`
so everything recolors with the palette — keep that pattern when extending.

### Type

| Token | Family | Use |
|-------|--------|-----|
| `--serif` | Instrument Serif (italic display) | Hero title, headings, stats, quotes |
| `--sans` | Bricolage Grotesque | Body copy, manifest |
| `--mono` | JetBrains Mono | Eyebrows, labels, nav, CTA — uppercase, wide tracking |

Hero title scales `clamp(72px, 13vw, 200px)`; section titles `clamp(36px, 5vw, 56px)`.

### Texture

- `.paper-grain` — fixed fractal-noise SVG overlay, `mix-blend: multiply`, opacity = `--grain` (default `0.32`).
- `.paper-warmth` — fixed radial ochre/green gradients over the paper.

---

## The tinted hero

The hero background is a tweak (`heroBg`). Logic is in `Hero({ layout, bg })`
(`App.jsx`) + the `/* Tinted hero */` block in `styles.css`:

- `bg` other than `paper` adds the `tinted` class and a `data-bg` attribute.
- `.hero[data-bg="…"]` sets `--hero-bg`, derived from palette vars, e.g.
  `color-mix(in oklab, var(--green) 80%, var(--ink) 20%)`.
- `.hero.tinted` sets `--hero-fg: var(--paper)` and recolors meta/sub/title/foot
  against the dark panel. The brick-red CTA is left as-is so it pops.

Default is `green`.

---

## Assets

No external image assets — all imagery is CSS placeholders in the Gallery
(striped, color-tinted divs with mono labels). Replace the `.photo` elements with
real `<img>` tags when photography is available. Fonts load from Google Fonts.
