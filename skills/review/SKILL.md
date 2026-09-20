# Skill: Review

## Mandate

Review product-catalog changes for correct Next.js boundaries, typed API behavior, and reliable search/filter/pagination UX.

## Checklist

- JSON fixture imports occur only in server-side code; no client component imports from `data/`.
- Product routes live under `app/api/` and use route handlers, not `pages/api`.
- Route handlers validate query parameters and return a stable `{ data, meta }` product response.
- Filtering supports search, category, minimum rating, price range, and supported sorting values.
- Pagination totals are calculated after filtering, pages are one-based, and out-of-range navigation is blocked.
- Filter or sort changes reset the requested page to `1`.
- React Query keys include all request parameters and loading transitions do not discard visible results unnecessarily.
- App imports use `@/` aliases; type imports use `@/types`; UI primitives use `@/components/ui`.
- Home, shops catalog, and product-detail route composition is separate from API, hook, and server filtering responsibilities.
- Desktop catalog layouts use a sidebar without duplicating query state; mobile filter sheets consume the same filter-control contract.
- Generated code is strictly typed and contains no comments or dead code.
