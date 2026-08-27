# MoodFix React

## Project Report

**MoodFix React** is a cinematic movie discovery web application built with React, TypeScript, Vite, and Tailwind CSS. The project is designed as a portfolio-level frontend application where users can create a local account, sign in, browse movies, search by title, explore trending results, and open a detailed movie page with richer production information.

The main idea behind the project is simple: give users a clean, dark, movie-focused interface where they can quickly discover something worth watching. The application combines a Figma-inspired visual direction with real movie data from TMDB and lightweight search tracking through Appwrite. It is not only a movie browsing app, but also a practice project for building structured React pages, reusable UI elements, client-side routing, form validation, authentication flow, API validation, and responsive layouts.

## Project Idea

The project focuses on solving a common browsing problem: people often want to find a movie quickly, but many discovery interfaces feel overloaded. MoodFix keeps the experience direct. The user starts from an authentication screen, enters the app, sees a focused home page, searches for movies, reviews popular results, and opens a movie detail page when something looks interesting.

The visual style is dark and cinematic. Posters, backdrops, ranking cards, badges, and soft purple accents are used to make the interface feel close to a streaming or film discovery product. The project also keeps the codebase modular, so every part of the interface can be improved or replaced later without rewriting the whole app.

## Main Features

- **Authentication flow**
  The app includes Sign In and Sign Up pages protected by client-side routing. A user can create an account with name, email, and password, then sign in using email or name. The current implementation stores users and session data in `localStorage`, with passwords hashed through the browser Web Crypto API. This is useful for a demo or portfolio prototype, while still keeping the auth logic organized in a reusable context.

- **Protected movie experience**
  Home and movie detail pages are protected routes. If a visitor is not signed in, they are redirected to the login page. This makes the app feel closer to a real product, where the discovery experience belongs behind an account-based entry point.

- **Movie search**
  Users can search for movies by title from the home page. The search input is debounced, so the app waits briefly before requesting results instead of making a request on every keystroke. This improves performance and gives the interface a smoother feel during typing.

- **Popular movie grid**
  The home page displays a responsive grid of movies. On large screens it shows more cards per page, while smaller screens reduce the page size so the layout stays usable. Movie data is loaded incrementally from TMDB as the user browses further, rather than all at once. Each movie card presents the core information needed for fast scanning, such as poster artwork, title, rating, language, and release year.

- **Trending movies section**
  The app tracks searched movies through Appwrite and displays trending results based on search count. When users search for a title and results are returned, the app can update the search count for the top result. Trending movies are then read back from Appwrite, sorted by popularity in the app's own search data.

- **Movie detail page**
  Each movie opens into a dedicated detail view. The page shows the title, release year, age rating label, runtime, score, poster, backdrop, genres, overview, release date, countries, status, language, budget, revenue, tagline, and production companies. The detail page gives the user a fuller report about the selected movie instead of only showing a poster and a short description.

- **Trailer overlay**
  When TMDB returns a YouTube trailer, the detail page can embed it directly inside the backdrop area. The user can play or stop the trailer without leaving the movie page. If no trailer is available, the interface communicates that state through the same control area.

- **API response validation**
  TMDB list and detail responses are validated with Zod before being used by the UI. This gives the project a stronger data boundary, because unexpected API shapes are caught early instead of silently breaking components.

- **Responsive Figma-inspired interface**
  The project follows a dark-only cinematic design system based on the provided Figma direction. The home page uses a centered logo, hero search section, trending row, popular grid, and pagination. The movie page uses a structured report-like layout with a header, media gallery, genre row, CTA, and detailed information list.

- **Pagination**
  Movie results are paginated on the client side, with a page size that adapts to screen width so the browsing flow stays comfortable across desktop, tablet, and mobile layouts. Under the hood, TMDB pages (20 movies each) are fetched on demand through `useInfiniteQuery` — only as the user pages far enough to need movies that haven't been loaded yet — instead of pulling a large batch of movies upfront. Total page count is calculated from TMDB's reported result count, so navigation reflects the full dataset even before every page has been fetched.

- **Logout support**
  Authenticated users can log out from the main app screens. Logging out clears the active local session and returns the user to the public authentication flow.

## Stack

| Stack | Usage |
| --- | --- |
| React | Builds the component-based user interface for pages, sections, forms, and reusable movie elements. |
| TypeScript | Adds strict typing for components, movie data, auth state, API responses, and shared logic. |
| Vite | Provides the development server, fast builds, and frontend tooling for the React app. |
| Tailwind CSS | Handles the dark visual system, spacing, typography, grids, responsive layout, and component styling. |
| React Router DOM | Manages hash-based client-side routes for login, signup, home, and movie detail pages. |
| TanStack React Query | Fetches, caches, and refreshes movie list data, movie detail data, and trending movie data. |
| React Hook Form | Controls authentication forms and client-side validation behavior. |
| Zod | Validates TMDB API responses before the data reaches the UI. |
| TMDB API | Provides movie discovery, search, poster, backdrop, metadata, and video trailer data. |
| Appwrite | Stores and reads search metrics used to build the app's trending movie section. |
| LocalStorage | Stores demo user accounts and the active session for the current frontend-only auth implementation. |
| Lucide React | Provides icon components for interface actions such as logout and other UI controls. |
| ESLint | Helps maintain code quality and consistent TypeScript/React rules during development. |
| shadcn/ui | Helps to implement the Select UI component |

## Routes

| Route | Purpose |
| --- | --- |
| `#/login` | Public Sign In page for existing users. |
| `#/signup` | Public Sign Up page for creating a local demo account. |
| `#/` | Protected Home page with search, trending movies, popular movies, and pagination. |
| `#/movie/:id` | Protected Movie Detail page for one selected TMDB movie. |

## Data and Configuration

The app depends on environment variables for external services:

```env
VITE_TMDB_API_KEY=your_tmdb_bearer_token
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_TABLE_ID=your_appwrite_table_id
```

TMDB is required for real movie search and detail data. Appwrite is optional for the interface to load, but trending search metrics will stay empty unless Appwrite is configured.

## Project Structure

```text
src/
  components/      Page sections, route guards, layout pieces, and shared app controls
  context/         Authentication provider and shared auth state
  elements/        Small reusable UI elements such as cards, fields, and spinner
  lib/             API, Appwrite, and service-level logic
  pages/           Main route pages: Home, Movie Detail, Sign In, and Sign Up
  assets/          Static SVG and image assets

context/           Project planning, architecture notes, UI rules, and progress tracking
public/            Public static assets
```

## Development Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## What Could Be Added Later

- **Production authentication**
  Replace the localStorage demo auth with Appwrite authentication, OAuth login, secure sessions, password reset, and verified user profiles.

- **Favorites and watchlist**
  Add a personal watchlist where signed-in users can save movies, remove them later, and filter by watched or unwatched status.

- **User ratings and notes**
  Let users rate movies, write private notes, and keep a personal viewing history.

- **Genre and advanced filters**
  Add filters for genre, year, rating, language, runtime, country, and streaming availability to make discovery more precise.

- **Movie recommendations**
  Build a recommendation section based on user searches, saved movies, favorite genres, or TMDB similar movie data.

- **Better trending analytics**
  Expand the Appwrite search metrics into a fuller analytics model with time windows, daily trends, most searched genres, and user-specific trends.

- **Real profile page**
  Add a profile screen where users can edit account details, manage preferences, review saved movies, and log out from all devices.

- **Testing**
  Add unit tests for auth logic and API parsing, plus component tests for protected routes, forms, search behavior, and movie detail states.

- **Error and empty-state polish**
  Improve failed API states, missing poster states, unavailable trailer states, and loading skeletons so the app feels more complete under imperfect network conditions.

- **Pagination fetch tuning**
  Refine how local page size and TMDB's fixed 20-per-page boundary line up, so background page fetches trigger as late as possible without ever leaving the user waiting on an empty grid.

- **Deployment workflow**
  Add a production deployment setup for GitHub Pages, Vercel, Netlify, or another static hosting provider with documented environment variable configuration.

## Current Status

MoodFix React is currently a working frontend movie discovery application with authentication, protected routes, TMDB-powered movie data, Appwrite-backed trending metrics, and a dark Figma-inspired UI. The project is still in active refinement, especially around final Figma fidelity and production readiness.