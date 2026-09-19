# Skill: Remember

## Mandate

Retain the active project model during this product-catalog task.

## Persistent Context

- This is a single Next.js 16 App Router repository, not a TurboRepo or an `apps/admin` workspace.
- `data/products-500.json`, `data/categories.json`, and `data/reviews.json` are local fixture sources.
- Next.js route handlers in `app/api/` provide the application backend API.
- The public catalog will support text search, category, minimum rating, price filtering, sorting, and pagination.
- The API response for a product collection is `{ data, meta }` with page metadata.
- `api/` contains client endpoint wrappers, `hooks/` contains React Query hooks, `types/` contains barrel-exported contracts, and `components/pages/home/` contains catalog UI.
- Use `@/` aliases for cross-folder imports and never import fixture JSON from client components.
