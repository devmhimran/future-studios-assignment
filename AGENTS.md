# Project Context

This repository is a single Next.js 16 App Router application for browsing a local product catalog. Product, category, and review fixtures live in `data/`; Next.js route handlers expose them as HTTP APIs; the public page consumes those APIs to provide search, filters, sorting, and pagination.

## Code Rules

- Write compact, production-ready TypeScript with strict types.
- Do not add comments, JSDoc, inline explanations, or commented-out code.
- Use existing shadcn components from `@/components/ui` before creating a new primitive.
- Keep server-only fixture reads and filtering logic out of client components.
- Preserve existing user changes. Do not rewrite unrelated files.

## Repository Structure

```text
app/
  (public)/page.tsx                  Public product-search page
  api/products/route.ts              Product collection API
  api/categories/route.ts            Category collection API
  globals.css                        Global Tailwind styles
  layout.tsx                         Root layout and providers
api/
  index.ts                           Client API modules and barrel exports
components/
  pages/home/                        Product-search page container and views
  forms/                             Reusable search and filter controls
  providers/                         React Query and application providers
  shared/                            Reusable application-level components
  ui/                                Local shadcn primitives
config/env.ts                        Environment access
data/                                Local product, category, and review fixtures
hooks/                               React Query hooks and barrel exports
lib/                                 HTTP client, server query helpers, and utilities
types/                               Domain contracts and barrel exports
```

Create a file only when its responsibility cannot belong in an existing nearby module. Keep route handlers thin: parse and validate request parameters, call a server-side helper, and return `Response.json`.

## Import Conventions

- Use `@/` for all application imports: `@/api`, `@/components/ui/button`, `@/hooks`, `@/lib`, `@/types`, and `@/config/env`.
- Use relative imports only within the same tightly coupled feature folder, such as sibling UI parts under `components/pages/home/`.
- Import domain contracts only from `@/types`, never from a concrete type file.
- Import public API modules only from `@/api` and hooks only from `@/hooks`.
- Use `import type` for type-only imports.
- JSON fixture imports belong only in server-side modules or route handlers. Never import `data/*.json` into a client component.

## Product API Contract

`GET /api/products` reads `data/products-500.json` and supports optional `search`, `category`, `rating`, `minPrice`, `maxPrice`, `sort`, `page`, and `limit` query parameters.

- Search is case-insensitive across title, brand, description, and tags.
- `category` is a category slug; `rating` is a minimum rating; price bounds are inclusive.
- Supported sort values are `featured`, `price-asc`, `price-desc`, `rating-desc`, and `newest`.
- `page` and `limit` are validated positive, one-based integers.
- Return `{ data, meta }`, with `meta.page`, `meta.limit`, `meta.total`, and `meta.totalPages`.

`GET /api/categories` returns the category fixture for filter controls. Invalid query values must be normalized or rejected consistently; never trust query strings as typed input.

## UI and Data Flow

1. The API reads JSON fixtures and applies search, category, rating, price, sort, then pagination.
2. The client keeps filter state in the page container and requests APIs through `api/` and `hooks/`.
3. Any filter or sort change resets page `1`.
4. Pagination uses `meta.totalPages` and cannot request an invalid page.
5. Product cards remain presentational and receive typed product props.

Use React Query for remote client data. Include all normalized query parameters in the query key and preserve visible results during page transitions.

## Local Skills

- **Architect:** Plan App Router and data-flow changes before creating files.
- **Imprint:** Implement typed APIs, query hooks, and catalog UI features.
- **Review:** Audit import boundaries, route contracts, state resets, and pagination behavior.
- **Remember:** Retain the fixture schema, API contract, and project conventions through the task.
