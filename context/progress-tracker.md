# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- In Progress — fixing Figma-fidelity issues on HomePage/MoviePage

## Current Goal

- Resolve open issues in `current-issues.md` so HomePage and MoviePage
  match the Figma spec (feature-spec 01-creating-homepage.md)

## Completed
 
- HomePage implementation with Logo, Hero, Trending, Popular, and Pagination blocks.
- MoviePage implementation following Figma specs and `ui-context.md`.
- Basic routing in `App.tsx` using `popstate` and `pushState` for `/` and `/movie`.
- Refactored `Popular.tsx` to use `MovieCard` element.
- Added navigation logic to `MovieCard` and `TrendingCard`.
- Optimized re-renders for `Popular.tsx` by wrapping `MovieCard` in `React.memo`, consolidating fetch state in `HomePage.tsx`, and using stable `EMPTY_MOVIES` array constant reference.

- Added Auth UI: `SignInPage`, `SignUpPage`, `AuthLayout`, and `FormField`.
- Added routes for `/login` and `/signup` in `src/App.tsx`.
- Implemented auth functionality using localStorage, React Hook Form, and AuthContext:
  - Created `src/context/AuthContext.tsx` with sign up, sign in, and logout logic
  - Created `src/components/ProtectedRoute.tsx` and `src/components/PublicRoute.tsx` for route guards
  - Integrated React Hook Form into `SignInPage` and `SignUpPage` for client-side validation
  - Updated `src/App.tsx` to wrap routes with auth guards and AuthProvider
  - Added password hashing using Web Crypto API
- Added logout button with Lucide React icon to HomePage and MoviePage:
  - Fixed position in top-right corner (15px margins)
  - Calls logout and redirects to `/login`
  - Light text color matching theme
- Installed lucide-react package for icon library
- Added Zod validation schemas for TMDB movie list and movie detail
  responses in `src/lib/api.ts`, with `Movie` and `MovieDetails`
  types inferred from schemas.
- Integrated validated API results into `HomePage` and `MoviePage`
  React Query flows, including clearer error states when API response
  parsing fails.
- Replaced the default Vite README with a full project report covering
  the project idea, detailed features, stack table, routes,
  configuration, structure, development commands, and future
  improvement ideas.
- Updated `index.html` to use the AVIF favicon asset instead of the
  SVG favicon.
- Installed shadcn/ui with the Vega preset and added the Select
  primitive:
  - Configured `@/*` import aliases in TypeScript and Vite.
  - Added `components.json`, `src/components/ui/select.tsx`,
    generated shadcn support files, and required dependencies.
  - Preserved the app's existing dark movie theme and DM Sans font
    while adding shadcn design tokens needed by Select.
  - Cleaned up the placeholder `MovieListSelect` component so strict
    TypeScript builds pass.
- Updated shadcn/ui design tokens in `src/index.css` to use the
  movie app's existing dark theme colors, translucent lavender
  surfaces, and light text treatment without changing unrelated page
  styles.
- Fixed the movie-list Select's selected-value foreground so it stays
  legible against the dark trigger surface.
- Integrated Zustand for global search, filter, and discovery state:
  - Installed `zustand` dependency.
  - Created `src/store/store.ts` (`useFilterStore`) managing `searchTerm`, `listMode` (`"popular" | "top_rated" | "now_playing" | "upcoming"`), `currentPage`, and their respective actions (`setSearchTerm`, `setListMode`, `setCurrentPage`, `resetFilters`).
  - Automatically resets pagination (`currentPage: 1`) upon changing search query or category list mode.
  - Refactored `Hero`, `MovieListSelect`, `Popular`, and `HomePage` to consume store state and actions directly, eliminating prop-drilling.
  - Preserves user search term, active category filter, and current page position when navigating between `HomePage` (`/`) and `MoviePage` (`/movie/:id`).


## In Progress

- Logo sizing does not match Figma spec (too large) — see `current-issues.md` #1
- Page is not horizontally centered — see `current-issues.md` #2
- Overall design deviates from Figma HomePage (node-id 89001-1372) and
  MoviePage (node-id 89001-1822) — see `current-issues.md` #3

## Next Up

- Once current issues are resolved and verified against Figma, mark
  feature-spec 01 as fully complete and move to the next feature spec.

## Open Questions

- None

## Architecture Decisions

- Lightweight browser history navigation (`pushState` / `popstate`) used for routing between `/` (HomePage) and `/movie` (MoviePage).

## Session Notes

- Home page is served at `/`; static movie detail page is available at `/movie`.
- `npm run build` succeeds without errors.
- Do not mark a phase "Completed" while `current-issues.md` still has
  unresolved entries — clear that file (or move entries here as
  Completed) before flipping this status.

- Dev routing note: the app uses `HashRouter` (see `src/App.tsx`). Use
  hash-based URLs in development, for example:

  - `http://localhost:5173/#/signup` to open the Sign Up page
  - `http://localhost:5173/#/login` to open the Sign In page

  Visiting `http://localhost:5173/signup` (no `#`) will load the
  default route because `HashRouter` ignores the pathname. If you
  prefer clean URLs (`/signup`), switch to `BrowserRouter` and
  ensure the dev/production server is configured to serve
  `index.html` for client-side routes.
