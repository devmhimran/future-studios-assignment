# Future Studios Assignment

A Next.js 16 App Router product catalog backed by local JSON fixtures. The application exposes product and category APIs with search, filtering, sorting, pagination, and full server-side rendering with React Query hydration.

## Requirements

- Node.js 20.9 or newer
- pnpm 10.12.4 or newer

## Setup

### 1. Environment variables

Copy the example env file:

```bash
# macOS / Linux
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
```

`.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_BASE_SITE_URL=http://localhost:3000
```

### 2. Install dependencies

```bash
npm install --global pnpm@10.12.4
pnpm install
```

### 3. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Production build

```bash
pnpm build && pnpm start
```

### 5. Lint

```bash
pnpm lint
```

---

## Architecture

```
app/
  (public)/
    page.tsx                         Home page (SSR + hydration)
    checkout/page.tsx                Checkout (metadata only)
    shops/
      page.tsx                       Catalog (SSR + hydration)
      [slug]/page.tsx                Product detail (SSR + hydration)
  api/
    products/route.ts                Product collection API
    products/[slug]/route.ts         Product detail API
    categories/route.ts              Category collection API
  globals.css                        Tailwind theme
  layout.tsx                         Root layout + providers

components/
  pages/
    home/                            Home page sections and cards
    shops/                           Catalog grid, filters, pagination
    product-details/                 Product detail sub-components
    checkout-page/                   Checkout form and success screen
  providers/                         React Query + app providers
  shared/                            Navbar, footer, cart sheet, lightbox
  ui/                                shadcn primitives (button, field, input, etc.)

data/                                JSON fixtures (products, categories, reviews)
hooks/                               React Query hooks (useGetAllProducts, useGetCategories, useGetProductBySlug)
lib/                                 HTTP client, query helpers, utilities
store/                               Zustand cart store (localStorage persistence)
types/                               Domain contracts (Product, Category, Meta, Response, etc.)
api/                                 Client-side API modules (productAPI, categoriesAPI)
config/                              Environment config
```

### Data flow

```
JSON fixtures
  --> API route handlers (filter, sort, paginate)
    --> Server component prefetches via React Query
      --> HydrationBoundary passes dehydrated state to client
        --> Client hooks (useGetAllProducts, etc.) read from cache
          --> Components render
```

---

## API Routes

| Route | Description |
|---|---|
| `GET /api/products` | Product list with search, filter, sort, paginate |
| `GET /api/products/[slug]` | Single product with related products + category |
| `GET /api/categories` | Category list |

### Query parameters (`/api/products`)

| Param | Type | Description |
|---|---|---|
| `search` | string | Case-insensitive match on title, brand, description, tags |
| `category` | string | Category slug filter |
| `rating` | number | Minimum rating |
| `minPrice` | number | Minimum price (inclusive) |
| `maxPrice` | number | Maximum price (inclusive) |
| `sort` | string | `featured` / `price-asc` / `price-desc` / `rating-desc` / `newest` |
| `page` | number | Page number (1-based) |
| `limit` | number | Items per page (max 100) |

All APIs return `{ data, meta }` where `meta` contains `page`, `limit`, `total`, `totalPages`.

### Example

```
/api/products?search=sony&category=electronics&rating=4&sort=price-asc&page=1&limit=12
```

---

## Server vs Client Components

This project uses a clear boundary between server and client rendering.

### Server Components (default)

All page files (`app/(public)/*/page.tsx`) are **server components**. They:

- Run only on the server during SSR or at build time
- Read `searchParams` and `params` directly (Next.js 16 async APIs)
- Prefetch data via `getQueryClient().prefetchQuery()`
- Dehydrate state into `<HydrationBoundary>` for client handoff
- Generate dynamic `metadata` and JSON-LD structured data
- Never use hooks, browser APIs, or event handlers

### Client Components

Components marked `'use client'` live under `components/`. They:

- Receive hydrated data from server prefetch via React Query hooks
- Use `useSearchParams`, `useRouter`, `useState`, `useEffect` for interactivity
- Handle user input (search, filters, pagination, cart actions)
- Run in the browser after hydration

### Why this split

| Concern | Server | Client |
|---|---|---|
| Data fetching | `prefetchQuery` | `useQuery` (reads cache) |
| SEO metadata | `generateMetadata` | N/A |
| JSON-LD | `<script type="application/ld+json">` | N/A |
| Interactivity | N/A | `useState`, `useEffect`, event handlers |
| URL state | Reads `searchParams` | `router.replace()` with `{ scroll: false }` |
| Form validation | N/A | `react-hook-form` + `zod` |
| Cart state | N/A | Zustand with `localStorage` persistence |

---

## Performance Decisions

### What is used

**React Query SSR Hydration** -- The biggest optimization. Server components prefetch data and dehydrate it into the page HTML. Client components immediately read from cache instead of making network requests. This eliminates client-side loading waterfalls on initial page load.

**`keepPreviousData`** -- All React Query hooks use `placeholderData: keepPreviousData`. This preserves the current page data while a new page loads (e.g., during pagination), preventing layout shift and empty states.

**Debounced search** -- Search inputs use `useDebouncedCallback` with a 350ms delay. This prevents an API call on every keystroke, reducing unnecessary re-renders and network requests.

**Skeleton loading states** -- Every data-dependent section has a skeleton placeholder (`ProductDetailsSkeleton`, `ShopProductsGrid` loading state, `ProductsSection` loading state). This provides visual stability during data transitions.

**Image loading strategy** -- Above-the-fold images (hero section) use `priority` with explicit `sizes`. Below-the-fold product thumbnails use `loading="lazy"`. This optimizes LCP without over-fetching.

**Suspense boundary** -- The root layout wraps content in `<Suspense fallback={<Loading />}>` for streaming SSR, allowing the shell to render while server components resolve.

**`router.replace({ scroll: false })`** -- Filter/sort changes update the URL without triggering a scroll jump, maintaining the user's position in the product grid.

### What is not used (and why)

**`React.memo()`** -- Not used. The product grid and list components are relatively simple and React Query's cache already prevents unnecessary re-renders. The overhead of wrapping components in `memo()` would not provide meaningful gains at this scale.

**`useMemo` / `useCallback`** -- Used only where necessary: `FieldError` deduplicates error messages, carousel event handlers avoid re-creation. Most computed values (query strings, filtered lists) are cheap to recompute and don't warrant memoization.

**Code splitting (`next/dynamic`)** -- Not used. The app is a single product catalog with moderate component count. The initial bundle is small enough that lazy loading would add complexity without measurable benefit.

**Virtualization** -- Not used. Product lists paginate (max 100 items per page) rather than infinite-scroll, so DOM node count stays manageable.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui v2 (Base UI primitives) |
| Data fetching | TanStack React Query v5 |
| Forms | react-hook-form + zod |
| State | Zustand (cart, localStorage persistence) |
| Icons | Lucide React |
| Carousel | Embla Carousel |
| Lightbox | react-spring-lightbox |
| Toasts | Sonner |
| Navigation | nextjs-toploader |

---

## Working Demo

The application runs at [http://localhost:3000](http://localhost:3000) after `pnpm dev`.

### Pages

| Route | Description |
|---|---|
| `/` | Home with hero, category browser, filtered product grid, pagination |
| `/shops` | Full catalog with sidebar filters, search, sort, pagination |
| `/shops/[slug]` | Product detail with image gallery, lightbox, features, related products, add-to-cart |
| `/checkout` | Order summary, shipping form, payment selection, order success with confetti |

### Key features to test

- **Search** -- Type in the search bar; results update after 350ms debounce
- **Category filter** -- Click a category on home or use the sidebar on `/shops`
- **Price / rating filters** -- Narrow results by minimum price, maximum price, or rating
- **Sorting** -- Featured, price (asc/desc), rating, newest
- **Pagination** -- Navigate between pages; previous data stays visible during transitions
- **Cart** -- Add products from detail page; cart drawer slides in with item count in navbar
- **Checkout** -- Fill shipping form (validated with zod), select payment, submit order
- **Order success** -- Confetti animation on successful order placement
- **Image lightbox** -- Click a product image to open fullscreen gallery with navigation
- **SEO** -- View source on any page to see dynamic `<title>`, OpenGraph tags, and JSON-LD structured data
