# Code Standards

## General

- [Principle — e.g. Keep modules small and single-purpose]
- [Principle — e.g. Fix root causes, do not layer workarounds]
- [Principle — e.g. Do not mix unrelated concerns in one
  component or route]

## TypeScript

- [Rule — e.g. Strict mode is required throughout the project]
- [Rule — e.g. Avoid any — use explicit interfaces or narrowly
  scoped types]
- [Rule — e.g. Validate unknown external input at system
  boundaries before trusting it]

## Styling

- [Rule — e.g. Use CSS custom property tokens — no
  hardcoded hex values]
- [Rule — e.g. Follow the border radius scale defined
  in ui-context.md]
- [Do not change index.css and App.css files, you should use this files for styles, and if it is so neccessery you could add variables into index.css without changes of old content]

## API

- [Rule — e.g. Do not do API because I should do it by myself]

## Data and Storage

- [Rule — e.g. Metadata belongs in the database]
- [Rule — e.g. Large generated content belongs in file
  or blob storage]
- [Rule — e.g. Do not store large content directly in
  the database]

## File Organization

- `/src/components` — [Should contain components]
- `/src/elements` — [Should contain reusable elements like MovieCard]
- `/src/assets/images` — [Should contain images]
