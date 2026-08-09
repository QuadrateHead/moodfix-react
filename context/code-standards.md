# Code Standards

## General

- Keep components small and single-purpose — one component, one job.
- Fix root causes; do not patch symptoms with one-off CSS overrides
  or inline style hacks.
- Do not mix layout/section components (e.g. `Trending.tsx`) with
  low-level reusable elements (e.g. `MovieCard.tsx`) — sections
  compose elements, they don't duplicate their markup.

## TypeScript

- Strict mode is required throughout the project.
- Avoid `any` — use explicit interfaces/types for movie data, props,
  and API-shaped objects even if the data is currently static/mock.
- Prefer named exports for components; one component per file.

## Styling

- Use Tailwind utility classes with tokens already defined in
  `/src/index.css`. Do not hardcode HEX colors anywhere in JSX or CSS.
- Do not change `index.css` or `App.css` structurally — only add new
  CSS custom properties/tokens if a needed value is genuinely missing,
  and add them without touching existing content.
- Follow spacing, radius, and icon-size rules exactly as defined in
  `ui-context.md` — that file is the source of truth for visual
  values, this file is the source of truth for how code is organized.

## API

- No live API integration in this project's current scope. Use static
  or mock data only. If real API integration becomes in-scope, this
  file and `project-overview.md` must be updated first.

## Data and Storage

- No database or persistence layer in this project's current scope —
  movie data is static/mock, held in-repo (e.g. a `data/` module).
- If persistence is added later, metadata belongs in a database and
  large generated content (images, etc.) belongs in file/blob storage,
  never inlined into component code.

## File Organization

- `/src/components` — page-level and section components (`HomePage`,
  `MoviePage`, `Hero`, `Trending`, `Popular`, `Pagination`)
- `/src/elements` — reusable, composable UI pieces (`MovieCard`,
  `TrendingCard`, `Logo`)
- `/src/assets/images` — static image assets (posters, backdrops,
  icons not covered by Lucide)
