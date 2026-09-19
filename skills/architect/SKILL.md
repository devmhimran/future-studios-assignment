# Skill: Architect

## Mandate

Plan changes for this single Next.js App Router product-catalog application before implementation.

## Guardrails

- Treat `data/products-500.json`, `data/categories.json`, and `data/reviews.json` as the local source of truth.
- Place HTTP endpoints in `app/api/<resource>/route.ts`; do not use `pages/api` or external backend folders.
- Keep fixture access, query parsing, filtering, sorting, and pagination in server-only route-handler helpers.
- Keep public route files thin by composing feature containers from `components/pages/home/`, `components/pages/shops/`, or `components/pages/product-details/`.
- Use `app/(public)/shops/page.tsx` for catalog browsing and `app/(public)/shops/[slug]/page.tsx` for product details.
- Keep catalog query state in the page container; split filter controls, mobile filter sheets, result grids, cards, and pagination into nearby feature components.
- Define reusable product, category, filter, and pagination contracts in `types/`, then export them from `types/index.ts`.
- Use `api/` for client endpoint wrappers, `hooks/` for React Query hooks, and `lib/` for shared infrastructure and server helpers.

## Output

For architecture requests, provide a concise manifest:

`Manifest = { filesToCreate: string[], filesToUpdate: string[], dataFlow: string[] }`
