# UI Context

## General

Use Figma file by this path: https://www.figma.com/design/eo1tZ4KuuWzJWGPhdqjJa5/Movie-App-w_-React?node-id=2-2. And follow this rules carefully, using pixel perfect approach.

## Figma using

Read the Figma node [INSERT NODE ID] using the Figma MCP server. Convert this exact node into a functional React component using Tailwind CSS.

Strict Pixel-Perfect Rules:

    Do not estimate: Extract the exact hex codes, padding, margin, width, height, and border-radius from the Figma node properties.

    Arbitrary Tailwind Values: If a Figma value does not perfectly match a standard Tailwind utility (e.g., if padding is 15px instead of 16px), you MUST use Tailwind arbitrary values (e.g., p-[15px], text-[17px], bg-[#1A1A24]) to ensure 1:1 pixel perfection.

    Flexbox & Grid: Mirror Figma's Auto Layout perfectly. If the layout is vertical with an 18px gap, output flex flex-col gap-[18px].

    Typography: Pay exact attention to line-height and letter-spacing (tracking). Use arbitrary values for these as well (e.g., leading-[24px]).

    Component Structure: Write the code as a clean, functional React component with clearly named wrappers.

## Theme

[Dark only. No light mode. The design language is a dark, cinematic movie-discovery workspace — near-black background with a faint purple wash, layered card surfaces one or two steps lighter than the background, a primary purple accent used sparingly (headline highlight, logo, active state), and a secondary pink/magenta accent used for the primary call-to-action button on the detail page.]

## Styles

[Use only Tailwind CSS with already exists styles from /src/index.css. Do not use custom variables if it already have in index.css. Do not use hardcoded HEX colors]

## Layout Patterns

**Home Page Pattern (detailed):**

1. **Logo** — centered horizontally at the very top, alone, no nav
   bar around it on this screen.
2. **Hero block** — centered on the page's horizontal axis: fanned
   poster stack, then centered two-line headline (accent word inline),
   then centered subheadline, then centered pill search input.
3. **Trending section** — left-aligned label "Trending" followed by a
   horizontal row of 6 poster thumbnails, each with a large
   translucent rank number (1–6) layered behind/overlapping it,
   increasing left to right.
4. **Popular section** — left-aligned label "Popular" followed by a
   4-column grid of movie cards (3 rows visible = 12 per page), equal
   width/height, consistent gaps.
5. **Pagination** — centered at the bottom: left arrow, "current /
   total" label, right arrow.
   **Vertical rhythm**: generous, consistent spacing between the five
   blocks above, noticeably larger than spacing within a single block.

**Movie Detail Page Pattern (detailed):** _(new)_

1. **Header row** — top of the page, two-column layout:
   - Left: entity **title** ("Squid Game 2") on its own line, with a
     **meta line** directly beneath it in `--text-secondary`
     ("2024 · PG-13 · 2h 46m").
   - Right, aligned to the top and pinned to the right edge of the
     same row: the **rating badge** and the **trend badge** sit
     side-by-side.
2. **Media gallery row** — directly below the header, a two-column
   image row of unequal widths:
   - Left (narrower): **portrait poster** image, `rounded-xl`.
   - Right (wider, roughly double the poster's width): **backdrop /
     banner** image, `rounded-xl`, with the **trailer overlay button**
     anchored to its bottom-left corner.
   - Both images share the same height and top/bottom alignment.
3. **Genres + CTA row** — below the media gallery, one row split into
   two ends:
   - Left: label "Genres" (`--text-secondary`) followed inline by a
     row of **genre pills**.
   - Right: the **CTA button** ("Visit Homepage →"), aligned to the
     right edge of the row, vertically centered with the genre pills.
4. **Detail info list** — below the Genres/CTA row, a stack of
   **detail rows**, each using the same fixed-width label column so
   all values start at the same horizontal position:
   - `Overview` — the only row whose value wraps across multiple
     lines (a full paragraph); label sits at the top of the row rather
     than vertically centered, to align with the first line of text.
   - `Release date`, `Countries`, `Status`, `Language`, `Budget`,
     `Revenue`, `Tagline`, `Production Companies` — each a single line
     of value text, one row per field, in that fixed order.
   - Row spacing is smaller than the spacing between the four major
     page blocks (header, media, genres/CTA, detail list), giving the
     detail list a denser, tabular rhythm.
     **Shared structural rule across both pages**: each page is built from
     a small number of major vertical blocks with generous spacing between
     them; within a block, related elements (label + value, icon + text,
     image + overlay) sit close together with minimal spacing.

## Icons

[Lucide React. Stroke-based icons only.

- `h-4 w-4` — inline icons (search icon inside input, star rating icon, pagination chevrons)
- `h-5 w-5` — standalone buttons (pagination arrow buttons]
