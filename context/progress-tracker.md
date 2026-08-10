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
