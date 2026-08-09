# Movie Discovery App

## Overview

A React + TypeScript movie discovery web app that lets users browse
trending and popular movies, search by title, and view detailed
information about a specific movie (rating, genres, overview,
production info). Built as a portfolio project to practice
pixel-accurate implementation of a Figma design system, componentized
UI architecture, and lightweight client-side routing without a
routing library.

## Goals

1. Reproduce the Figma design pixel-accurately across the Home page
   and Movie detail page.
2. Build a clean, reusable component/element structure (`MovieCard`,
   `TrendingCard`, etc.) that scales to future feature specs.
3. Keep the codebase simple enough to extend feature-by-feature using
   the spec-driven AI workflow defined in `ai-workflow-rules.md`.

## Core User Flow

1. User lands on the Home page and sees the hero search, trending
   row, and popular grid.
2. User searches for a movie or browses the popular grid, paginating
   through results.
3. User clicks a movie card and navigates to that movie's detail page
   (`/movie`).
4. User reads details (overview, genres, release info) and can click
   "Visit Homepage" to return.

## Features

### Home Page

- Centered logo, hero search bar
- Trending row (6 ranked poster thumbnails)
- Popular grid (12 movies per page, 4 columns)
- Pagination controls

### Movie Detail Page

- Title + meta line, rating/trend badges
- Poster + backdrop image row with trailer overlay button
- Genre pills + CTA button
- Detail info list (release date, countries, status, language, budget,
  revenue, tagline, production companies)

## Scope

### In Scope

- Home page and Movie detail page UI, matching Figma specs
- Client-side navigation between `/` and `/movie` via
  `pushState`/`popstate`
- Static/mock movie data (no live API integration yet, per
  `code-standards.md`)

### Out of Scope

- User authentication or accounts
- Real backend/API integration (explicitly excluded — see
  `code-standards.md` API rule)
- Server-side rendering
- Any page beyond Home and Movie detail (for now)

## Success Criteria

1. Home page matches the Figma frame (node-id `89001-1372`) at the
   spacing, sizing, and layout level described in `ui-context.md`.
2. Movie detail page matches the Figma frame (node-id `89001-1822`).
3. `npm run build` passes with no errors, and navigation between the
   two pages works without a full page reload.
