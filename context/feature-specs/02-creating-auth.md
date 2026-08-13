# Sign In / Sign Up Implementation Plan

TL;DR

Add a frontend-only authentication flow now (Sign In / Sign Up) that uses localStorage for a quick prototype, and include a second, production-ready option that integrates with a remote database and Google OAuth (AppWrite). This document follows the project constraints in `AGENTS.md` and the repository's current architecture and describes UI, functionality (two versions), database schema, migration path, and verification steps.

## Context

- Follow `AGENTS.md` ordering and update `context/progress-tracker.md` after implementing any changes.
- Current app uses React + TypeScript + Vite + Tailwind + React Router DOM. Routes are in `src/App.tsx`.
- The codebase is frontend-first and currently contains no backend APIs per `context/architecture-context.md`.

## High-level goals

- Present `Sign In` as the first page for unauthenticated users.
- Allow `Sign Up` to create new accounts (Name, Email, Password, Confirm Password).
- Validate inputs and show friendly error messages.
- After successful authentication, route the user to Home page (`/`).
- Provide two delivery options:
  - Version A: frontend-only using `localStorage` (fast prototype)
  - Version B: remote persistence + Google OAuth using AppWrite (production-ready)

## UI

- New pages:
  - [src/pages/SignInPage.tsx](src/pages/SignInPage.tsx)
  - [src/pages/SignUpPage.tsx](src/pages/SignUpPage.tsx)
- Shared components/elements:
  - [src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx) — route guard
  - [src/elements/Spinner.tsx](src/elements/Spinner.tsx) — reuse existing spinner for async flows
  - Small `FormField` presentational component (optional) at `src/elements/FormField.tsx`
- UX details:
  - `Sign In` form fields: `Email or Name`, `Password`, `Submit` button, `Sign Up` link
  - `Sign Up` form fields: `Name`, `Email`, `Password`, `Confirm Password`, `Submit` button, `Sign In` link
  - Inline validation with clear error messages beneath fields
  - Disable submit while processing and show a spinner
  - On success, redirect to `/` and render a temporary toast or inline success message
  - Add `Logout` button to header only after auth is introduced (e.g., in `HomePage` header)
  - Read [src/index.css] for already exists styles
  - Like inspiration you can use styles(colors, fonts, buttons and else) from [src/pages/MoviePage.tsx]

## Functionality

Implementation is separated into two versions. Keep the code modular so migration from A → B is simple (swap `src/lib/auth.ts` implementation).

Shared pieces (both versions)
- `src/lib/auth.ts` — export an auth API surface used by pages and route guard:
  - `register(user: {name,email,password}): Promise<{ok: boolean, error?: string}>`
  - `login(credentials: {emailOrName,password}): Promise<{ok:boolean, user?:User, error?:string}>`
  - `logout(): void`
  - `getCurrentUser(): User | null`
  - `isLoggedIn(): boolean`
  - `onAuthStateChanged(cb: (user: User|null) => void): () => void` (optional, useful if using context/provider)
- `src/components/ProtectedRoute.tsx` — uses `isLoggedIn()` and `getCurrentUser()` to decide whether to render the route or redirect to `/login`
- `src/App.tsx` changes:
  - Add routes: `/login` → `SignInPage`, `/signup` → `SignUpPage`
  - Wrap `/` (HomePage) and `/movie/:id` (MoviePage) with `ProtectedRoute`

Version A — Frontend-only (localStorage)

Design choices
- Fast to implement; stored data is not secure and is only for demos.
- Keep password storage simple but avoid plaintext where easy: store a hashed value using a client-side hash (e.g., PBKDF2 not available easily — use a lightweight SHA-256 via Web Crypto to avoid storing obvious plaintext). Note: client-side hashing is NOT security — only a small improvement for demo clarity.
- All logic lives in `src/lib/auth.local.ts` implementing the shared interface. Exported symbol alias `src/lib/auth.ts` re-exports from `auth.local.ts` while developing.

Storage shape (localStorage keys)
- `mf_users` — JSON array of user objects:
  - id: string (UUID)
  - name: string
  - email: string (lowercased)
  - passwordHash: string
  - createdAt: ISO date
- `mf_session` — JSON with `userId: string` and `createdAt`

Flow
1. `SignUpPage` validates fields (name non-empty; email format; password min 8; confirm matches) and calls `register()`.
2. `register()` checks for unique email (case-insensitive). If OK, create user, persist to `mf_users`, create `mf_session` (auto-login), and return success.
3. `SignInPage` calls `login()`. `login()` accepts `emailOrName` and looks up user by email or name, verifies hash matches, creates `mf_session`, returns user.
4. `ProtectedRoute` checks `isLoggedIn()` (reads `mf_session` → finds user) and redirects to `/login` if missing.

Validation and UX
- Email validation: RFC-like basic regex (not exhaustive)
- Password: min 8 characters, show helpful messages for weak passwords
- On duplicate email in registration, show a clear error
- On incorrect login, show generic "invalid credentials" message

Testing and verification for Version A
- Unit test helpers (optional) for `auth.local.ts` methods
- Manual tests: register → auto-login → refresh keeps session → logout clears session

Version B — AppWrite + Google OAuth (recommended for production)

Design choices
- Use AppWrite for user accounts and as the database as it integrates well with the existing `appwrite` dependency in `package.json`.
- Move auth implementation to `src/lib/auth.appwrite.ts` and re-export from `src/lib/auth.ts` when deploying.
- Keep the same public API as Version A to minimize UI changes.

AppWrite pieces to configure
- AppWrite project (cloud or self-hosted)
- Create an `users` collection (AppWrite has built-in users/auth but Document collections can hold profile data). Use AppWrite Accounts for authentication.
- Configure OAuth providers (Google) in AppWrite console and obtain client IDs/secrets.

Database structure (AppWrite collections)
- Use AppWrite Accounts for auth (email/password + OAuth). Store profile metadata in a `profiles` collection (documents keyed by AppWrite userId):
  - `$id` (AppWrite document id == userId)
  - `name` string
  - `email` string
  - `createdAt` timestamp
  - `avatarUrl` string (optional)
  - `provider` enum ("email" | "google")
- If you need to store user preferences or favorites, add a `favorites` collection with fields:
  - `ownerId` (user id)
  - `movieId` (Tmdb id or internal id)
  - `createdAt`

Flow (AppWrite + Google)
1. `SignUpPage` calls AppWrite Accounts `create` or `createSession` endpoints. On success, write to `profiles` collection.
2. `SignInPage` calls AppWrite Accounts `createSession`.
3. For Google login, UI triggers AppWrite OAuth flow (redirect to provider). On return, AppWrite manages the session and token.
4. `getCurrentUser()` should call AppWrite `account.get()` or use a cached session token to fetch profile data.
5. `logout()` calls AppWrite `deleteSession('current')` and clears any client-side cached state.

Security considerations
- Do not store raw passwords in client storage. AppWrite handles credentials securely.
- Use HTTPS and environment variables (in Vite, use `VITE_APPWRITE_ENDPOINT`, `VITE_APPWRITE_PROJECT`, etc.)
- For OAuth, register redirect URIs in AppWrite console and Google Cloud Console.

Migration path (A → B)
- Maintain the same `src/lib/auth.ts` API surface. Implement `auth.local.ts` first and `auth.appwrite.ts` later.
- Add a feature-flag or environment switch in `src/lib/auth.ts` to re-export either local or appwrite implementation depending on an env var (e.g., `VITE_AUTH_PROVIDER=local|appwrite`).
- Optionally provide an admin tool or migration script to import `mf_users` into AppWrite users (requires password reset flow — not automatic). Best practice: request users to re-register or send password reset emails.

## Files to Add / Modify

- Add: [src/lib/auth.local.ts](src/lib/auth.local.ts) — Version A implementation
- Add: [src/lib/auth.appwrite.ts](src/lib/auth.appwrite.ts) — Version B implementation
- Modify: [src/lib/auth.ts](src/lib/auth.ts) — single export switching implementation based on env var
- Add: [src/pages/SignInPage.tsx](src/pages/SignInPage.tsx)
- Add: [src/pages/SignUpPage.tsx](src/pages/SignUpPage.tsx)
- Add: [src/components/ProtectedRoute.tsx](src/components/ProtectedRoute.tsx)
- Optionally add: [src/elements/FormField.tsx](src/elements/FormField.tsx)
- Modify: [src/App.tsx](src/App.tsx) — add new routes and wrap protected routes
- Update: `context/progress-tracker.md` — add notes when implementation occurs

## Verification and Tests

- Manual verification checklist:
  1. App shows `/login` when unauthenticated.
  2. `Sign Up` creates a new account and auto-logs in (Version A), redirecting to `/`.
  3. `Sign In` accepts Email or Name + Password and logs in.
  4. `Logout` clears session and redirects to `/login`.
  5. Page refresh retains session (reads from `mf_session` or AppWrite session).
  6. Attempting to access `/` while logged out redirects to `/login`.
  7. Build with `npm run build` succeeds.

- Automated tests (optional): unit tests for `auth.local.ts` logic (register/login/logout) and for `ProtectedRoute` behavior.

## Decisions & Assumptions

- The default for quick iteration is **Version A (localStorage)**.
- If you plan to have real users, devices, or Google auth, use **Version B (AppWrite)**.
- The UI should remain consistent between options; only the `src/lib/auth.ts` implementation should swap.
- Password hashing on the client is only a minor improvement for demo safety; it's not secure for production.

## Further Considerations

1. If you want Google OAuth now, set up an AppWrite project and configure Google provider; I can provide the exact AppWrite SDK calls and env var setup.
2. Consider adding an `AuthContext`/`AuthProvider` if you expect many components to rely on auth state. This will centralize `onAuthStateChanged` handling and make UI updates easier.
3. For styling, reuse the Tailwind tokens in `src/index.css` to keep forms visually consistent with existing components.

---

Save and next steps

- Implement Version A first for a fast prototype. After you approve, I can generate the exact files (`auth.local.ts`, `SignInPage.tsx`, `SignUpPage.tsx`, `ProtectedRoute.tsx`) and update `src/App.tsx`.
- When you decide to move to AppWrite + Google OAuth, I will produce the `auth.appwrite.ts` implementation and a small migration guide.
