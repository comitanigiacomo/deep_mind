# Portfolio

Source code for my personal website: a minimal, interactive space showcasing my software projects, skills, homelab architecture, and research notes.

**Live:** [portfolio.jack-lab.dev](https://portfolio.jack-lab.dev)

## Stack

- **Core:** React 18, Vite
- **UI & 3D:** CSS modules-free global styles, React Three Fiber, GSAP
- **Content:** bilingual (EN/IT) translations and blog posts stored as typed data modules
- **Infra:** Docker, Nginx (unprivileged), self-hosted Debian

## Project structure

```
src/
├── components/        # Reusable UI and effects
│   ├── icons/         # Inline SVG icons
│   └── ui/            # Small shared controls (theme, language)
├── context/           # Theme and language providers + hooks
├── data/              # Blog posts and shared category metadata
├── hooks/             # Cross-cutting React hooks
├── i18n/              # Translation catalog
├── lib/               # Pure helpers (metadata, repo stats, text, scroll)
├── pages/             # One module per portfolio section
└── test/              # Vitest setup
scripts/               # Build-time generators (sitemap)
```

Rules of thumb:

- `lib/` contains pure functions with no React dependency, so they are unit-testable.
- `hooks/` contains reusable React behaviour only.
- `components/ui/` contains presentational controls without business logic.
- `pages/` compose sections; they do not own shared state.

## Development

Requires Node.js 22 or newer.

```bash
git clone https://github.com/comitanigiacomo/deep_mind.git
cd deep_mind
npm ci
npm run dev
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Generate `sitemap.xml`, then build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint over the whole repository |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run check` | Lint, test, and build in one go |

## Performance and accessibility notes

- The 3D keyboard (three.js) is lazily imported and mounted only when the skills
  section approaches the viewport; three.js lives in its own build chunk and is
  warmed once the browser is idle, so it is usually cached before the user
  scrolls there.
- `public/keyboard.glb` is optimised offline (keycap textures resized to 512 px
  and converted to WebP with `@gltf-transform/cli`), which cuts it from 656 kB
  to 276 kB without visible quality loss.
- A terminal-style loader fills the keyboard area while the chunk and the model
  download; the canvas fades in only once the scene reports it is ready.
- The production bundle is split into stable vendor chunks for long-term caching.
- Animations respect `prefers-reduced-motion`, and the custom cursor is disabled
  automatically on touch devices and when reduced motion is requested.
- Navigation is a real disclosure widget: keyboard accessible, closable with
  `Escape`, and functional at every breakpoint.
- Document metadata (title, description, canonical, Open Graph) is generated from
  a single source of truth in `src/lib/site.js`.

The model can be regenerated after editing the source `.glb`:

```bash
npx @gltf-transform/cli resize public/keyboard.glb /tmp/keyboard-512.glb --width 512 --height 512
npx @gltf-transform/cli webp /tmp/keyboard-512.glb /tmp/keyboard-webp.glb --quality 78
mv /tmp/keyboard-webp.glb public/keyboard.glb
```

## Deployment

The image is a multi-stage build: Node 22 compiles the assets, and the runtime
stage serves them from `nginxinc/nginx-unprivileged` as a non-root user.

```bash
docker compose up -d --build
```

The container listens on port `8080` internally and is published on `8090`.

The runtime enforces a read-only root filesystem, drops all Linux capabilities,
and disables privilege escalation. Security headers, gzip, and cache policies are
defined in `nginx.conf`.

## Continuous integration

`.github/workflows/ci.yml` runs lint, unit tests, and the production build on
every push to `main` and on every pull request.

## License

MIT
