# Architecture Context

## Stack

| Layer       | Technology                                | Role                                                      |
| ----------- | ------------------------------------------ | ----------------------------------------------------------|
| Framework   | React 18 + TypeScript                      | UI rendering and component logic                          |
| Build tool  | Vite                                       | Dev server, bundling, GitHub Pages build output           |
| Routing     | Manual (`pushState` / `popstate` in `App.tsx`) | Client-side navigation between `/` and `/movie` — no router library is installed for this project |
| UI          | Tailwind CSS, tokens from `/src/index.css` | Styling, using existing theme tokens only (see `ui-context.md`) |
| Icons       | Lucide React                               | All icons across both pages                                |
| Data        | Static/mock movie data (in-repo, no API)   | Populates trending/popular/detail content until a real API is scoped |
| Deployment  | GitHub Pages via GitHub Actions            | Static hosting for the built app                           |

## Invariants

- Routing stays dependency-free: do not add `react-router` or
  `react-router-dom` unless this file is updated first to reflect that
  decision.
- No backend/API calls are made from this app — all data is local
  until `project-overview.md`/this file explicitly say otherwise.
- Components live under `/src/components`, reusable UI pieces under
  `/src/elements`, per `code-standards.md`.

## Page Map

- `/` — HomePage (Logo, Hero, Trending, Popular, Pagination)
- `/movie` — MoviePage (movie detail view)
