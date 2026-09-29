# Gideon Onyegbula — portfolio

Fullstack Developer (TypeScript). Next.js App Router + TypeScript (strict) + Tailwind CSS v4,
with a lightweight react-three-fiber hero, Framer Motion section reveals, typed content files and
MDX case studies.

---

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in the Resend values
npm run dev                    # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # tsc --noEmit (strict)
```

### Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes (for the form) | API key from <https://resend.com/api-keys> |
| `CONTACT_TO_EMAIL` | yes (for the form) | Inbox that receives submissions |
| `CONTACT_FROM_EMAIL` | yes (for the form) | Verified sender, e.g. `Portfolio <contact@devgideon.me>` |
| `CONTACT_RATE_LIMIT_WINDOW_MS` | no | Sliding-window size in ms (default `900000` = 15 min) |
| `CONTACT_RATE_LIMIT_MAX` | no | Submissions allowed per window per IP (default `5`) |

None of these are prefixed with `NEXT_PUBLIC_`, so none reach the browser. Without the first three
the form returns a 503 with a fallback message pointing at the email address — the rest of the site
is unaffected.

---

## Project structure

```
.
├── app/
│   ├── api/contact/route.ts      # Route Handler: zod → honeypot → rate limit → Resend
│   ├── projects/[slug]/page.tsx  # MDX case-study template (generateStaticParams)
│   ├── privacy/page.tsx          # short privacy note (Terms of Service removed)
│   ├── layout.tsx                # metadata, next/font, JSON-LD, skip link
│   ├── opengraph-image.tsx       # OG card generated with next/og
│   ├── robots.ts, sitemap.ts     # generated, no stale lastmod
│   ├── icon.svg, favicon.ico, apple-icon.png
│   └── globals.css               # design tokens (@theme) + primitives
├── components/
│   ├── hero.tsx, about.tsx, skills.tsx, projects-section.tsx,
│   │   playground.tsx, contact-section.tsx, contact-form.tsx
│   ├── project-card.tsx          # tilt + glare (decoration only)
│   ├── reveal.tsx                # Framer Motion fade/translate, reduced-motion aware
│   ├── site-header.tsx           # sticky nav, focus-trapped mobile menu
│   ├── three/                    # hero-canvas (gate) → hero-scene (R3F) → hero-poster (static)
│   └── mdx/                      # Callout, ArchitectureDiagram, component map
├── content/
│   ├── site.ts, links.ts, skills.ts, projects.ts, playground.ts
│   └── case-studies/*.mdx        # rate-limiter, structura, portfolio-projects-cms
├── lib/
│   ├── capabilities.ts           # reduced-motion / saveData / cores / screen probes
│   ├── rate-limit.ts             # sliding-window limiter (inline — see note)
│   ├── validation.ts             # zod schema shared by client and server
│   ├── mdx.ts, utils.ts
└── public/
    ├── projects/*.webp           # screenshots, optimised and self-hosted
    ├── portrait.webp
    └── resume/gideon-onyegbula-resume.pdf   # PLACEHOLDER file
```

---

## How to add a project

1. Drop an optimised screenshot in `public/projects/` (`.webp`, 1600×900 works well).
2. Add an entry to `content/projects.ts`:

```ts
{
  slug: "naija-chronoscope",           // becomes /projects/naija-chronoscope
  name: "Naija Chronoscope",
  oneLiner: "One sentence, no marketing adjectives.",
  summary: "Longer card copy.",
  role: "[PLACEHOLDER: your role]",
  stack: ["TypeScript", "Next.js"],
  live: "https://…",                   // optional
  repo: "https://github.com/GFrosh/…",
  image: "/projects/naija-chronoscope.webp",
  imageAlt: "What the screenshot actually shows",
  imageWidth: 1600,
  imageHeight: 900,
  freeTierHost: true,                  // adds the "first load may take ~30s" note
  featured: true,
}
```

3. Create `content/case-studies/<slug>.mdx`. The route, sitemap entry and card are generated
   automatically — no other file needs touching.

`featured: false` entries stay out of the featured grid. Small experiments belong in
`content/playground.ts` instead, which renders as a plain list (no cards).

---

## How to disable the 3D scene

The hero is three layers: `hero-canvas.tsx` (decides) → `hero-scene.tsx` (R3F) →
`hero-poster.tsx` (static SVG fallback that ships in the initial HTML).

**Permanently, without removing the dependency** — in `components/three/hero-canvas.tsx`:

```tsx
// {ready && canRender3D ? <HeroScene /> : <HeroPoster />}
<HeroPoster />
```

**To remove three.js entirely** (saves roughly 150 KB gzipped of client JS):

```bash
npm uninstall three @react-three/fiber @react-three/drei @types/three
rm -rf components/three/hero-scene.tsx
```

Then delete the `HeroScene` import in `hero-canvas.tsx`. Nothing else references three.js.

**Per-user conditions** are already handled in `lib/capabilities.ts`. The scene is skipped when any
of these are true, and the static poster renders instead:

- `prefers-reduced-motion: reduce`
- `navigator.connection.saveData`, or effective type `slow-2g` / `2g`
- `navigator.hardwareConcurrency <= 4`
- viewport below 768px, or a touch-only device with no fine pointer

Rendering is additionally paused when the canvas scrolls out of view or the tab is hidden
(`useActiveWhenVisible` feeds the Canvas `frameloop`), and DPR is capped at 1.6.

---

## Performance notes

Measured budget targets, and how the build is arranged to hit them:

| Metric | Target | How |
| --- | --- | --- |
| Lighthouse Performance (mobile) | 95+ | Static rendering, no runtime font requests, 3D behind `next/dynamic` |
| LCP | < 2.5s | Hero text and the SVG poster are in the initial HTML; three.js is not |
| CLS | < 0.1 | `next/font` with size-adjusted fallbacks, fixed image dimensions |
| JS budget | ~120 KB gzipped first-load for `/` | three.js is a separate chunk, fetched only after capability checks pass |

`npm run build` prints the real first-load figures. Run `ANALYZE=true` style checks or inspect the
build output before deploying — do not treat the table above as a measurement.

---

## Accessibility

- Semantic `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` landmarks, plus a skip link.
- Visible focus rings on every interactive element (`:focus-visible`, 2px, offset 3px).
- The mobile menu is a real `<button>` with `aria-label`, `aria-expanded`, `aria-controls`, a focus
  trap and Escape-to-close with focus returned to the toggle.
- Every control is a real `<button>` or `<a>`. No click handlers on `div`s.
- `prefers-reduced-motion` is respected in CSS and in JS (Reveal renders unanimated, the 3D scene
  is never mounted).
- The 3D canvas wrapper is `aria-hidden="true"` — purely decorative.
- All images have descriptive alt text; the honeypot field is `aria-hidden` and `tabIndex={-1}`.

---

## Decisions that differ from the brief

1. **Framer Motion over GSAP ScrollTrigger.** Framer Motion is already the React-native choice for
   declarative `whileInView` reveals, ships a `useReducedMotion` hook that made the accessibility
   requirement a one-liner, and avoids adding a second animation runtime for what is a small set of
   fade/translate transitions. GSAP would only have won if the brief had needed timeline scrubbing
   or complex pinning.
2. **The rate limiter is implemented inline, not imported.** `github.com/GFrosh/Rate-Limiter` is
   Express *middleware* — it exports `(req, res, next)` and reads `req.ip`. A Next.js Route Handler
   receives a Web `Request` and returns a `Response`; there is no `next()` chain to hook. The
   algorithm in `lib/rate-limit.ts` is the same sliding window the package documents (exact
   timestamps per key, pruned per request), with the same header contract, adapted to a
   handler-shaped API.
3. **`.mdx` is parsed by `next-mdx-remote/rsc` at request/build time** rather than through
   `@next/mdx`. This keeps MDX confined to `content/case-studies/` instead of making every route an
   MDX route, so content can be edited without touching the routing layer.
4. **No ESLint step.** Next.js 16 removed the `next lint` command, and pinning a flat-config ESLint
   setup that I could not execute and verify in this environment would have shipped an unverified
   config. `tsc --noEmit` under `strict: true` plus `next build` are the verified gates. Add
   `eslint` + `eslint-config-next` and an `eslint.config.mjs` if you want the extra pass.
5. **Architecture diagrams are HTML, not images.** `components/mdx/architecture-diagram.tsx` renders
   labelled, selectable boxes with arrows, so the diagrams stay readable, translatable and
   screen-reader accessible. Swap in an exported SVG via `next/image` if you would rather have
   pictures.
6. **Favicon `.ico` is 16/32/48px (589 bytes)** rather than a set including large embedded PNGs —
   the 192/512 PNGs are served separately, which keeps the `.ico` well under the 20 KB budget.

---

## Placeholder checklist

Nothing below is fabricated — each entry is a fact that was not supplied and is rendered in the UI
as `[PLACEHOLDER: …]` until you fill it in.

| # | Where | Placeholder | What to do |
| --- | --- | --- | --- |
| 1 | `public/resume/gideon-onyegbula-resume.pdf` | Résumé PDF | Replace the marked placeholder PDF with your real résumé. Path is already wired into the nav and hero. |
| 2 | `content/links.ts`, header, JSON-LD, privacy page | `hello@devgideon.me` | Confirm the address exists and receives mail; it replaces the old Gmail address everywhere. |
| 3 | `content/site.ts`, hero badge, About → Currently | Internships / junior roles / remote | Pick the exact wording for availability. |
| 4 | `content/projects.ts` + `content/case-studies/` | Naija Chronoscope | If it is live, add it as the first featured project and write its case study. |
| 5 | `content/projects.ts` ×3 | Role on Structura / Rate-Limiter / Portfolio-Projects-CMS | e.g. "solo author", "maintainer". |
| 6 | `content/case-studies/rate-limiter.mdx` | Measured result | A real measurement or an honest "not measured yet" — no number is claimed today. |
| 7 | `content/case-studies/structura.mdx` | Measured result | Same. |
| 8 | `content/case-studies/portfolio-projects-cms.mdx` | Measured result | Same. |
| 9 | `content/case-studies/structura.mdx` | Rendering path | Confirm whether Structura shells out to a local PlantUML runtime, calls a PlantUML server, or renders in-process; the diagram assumes a local render step. |
| 10 | `content/case-studies/structura.mdx`, `portfolio-projects-cms.mdx` | "What I'd do next" | Replace my inferred next steps with your real ones. |
| 11 | `content/links.ts` → `X_ENABLED` | X / Twitter | Set `X_ENABLED = true` if `@DevThragg` is active and dev-focused; Instagram stays removed either way. |
| 12 | `app/privacy/page.tsx` | Review date | The date you last reviewed the privacy note. |
| 13 | `content/site.ts` → `url` | Canonical domain | Confirm `https://devgideon.me` is the production domain (it drives canonical, OG, sitemap and JSON-LD). |
| 14 | `.env.local` | Resend values | `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` — the form returns 503 until these are set. |

---

## Deploying to Vercel

1. Push the repo and import it in Vercel — the framework preset is detected automatically.
2. Add the three `RESEND_*` / `CONTACT_*` variables in Project → Settings → Environment Variables.
3. Verify your sending domain in Resend, otherwise sends are rejected in production.
4. Point `devgideon.me` at the deployment and confirm `content/site.ts` → `url` matches.

`app/robots.ts` and `app/sitemap.ts` generate on request, and `app/opengraph-image.tsx` is compiled
during the build — no manual SEO files to keep in sync.
