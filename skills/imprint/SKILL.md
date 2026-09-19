# Skill: Imprint

## Mandate

Implement compact, typed product-catalog features for this Next.js application.

## Patterns

### API routes

- Build `GET` handlers in `app/api/<resource>/route.ts` with Next.js App Router APIs.
- Read local JSON only on the server.
- Validate and normalize URL query parameters before filtering.
- Apply search, category, minimum rating, price range, sorting, and pagination in a deterministic order.
- Return `{ data, meta }` for paginated product collections and a typed error response for invalid requests.

### Client API and hooks

- Put typed endpoint calls in `api/` and export them through `api/index.ts`.
- Put React Query hooks in `hooks/` and export them through `hooks/index.ts`.
- Include every normalized filter, sort, page, and limit value in the products query key.
- Reset pagination to page `1` whenever a search, filter, price range, rating, or sort value changes.
- Preserve the prior page while the next page loads when the query library supports it.

### Components

- Keep the page container responsible for filter state and query orchestration.
- Keep cards, filter controls, result summaries, and pagination controls presentational and typed through props.
- Keep desktop catalog filters in a sidebar and compose mobile filters through the existing shadcn Sheet primitive when the layout requires a compact control surface.
- Reuse `components/pages/home/product-card.tsx` for catalog product grids unless the product presentation itself changes.
- Import local shadcn primitives from `@/components/ui/<component>`.
- Use accessible labels and disable pagination actions when no valid next or previous page exists.

### Types

- Define domain contracts in dedicated `types/*.types.ts` files.
- Export types only through `@/types`.
- Use `import type` for type-only dependencies.
