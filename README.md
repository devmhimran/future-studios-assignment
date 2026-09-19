# Future Studios Assignment

A Next.js product catalog backed by local JSON fixtures. The application exposes product and category APIs, including product search, filtering, sorting, and pagination.

## Requirements

- Node.js 20.9 or newer
- pnpm 10.12.4 or newer

## Environment setup

Before installing or running the project, create your local environment file from the example:

```powershell
Copy-Item .env.example .env.local
```

For macOS or Linux:

```bash
cp .env.example .env.local
```

Set the API URL in `.env.local` to the local Next.js API:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/
```

If you run the app on another port, update this value to use that port.

## Install pnpm

If pnpm is not installed, install the version used by this repository:

```bash
npm install --global pnpm@10.12.4
```

Confirm the installation:

```bash
pnpm --version
```

## Install dependencies

```bash
pnpm install
```

## Run locally

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production build

Create and validate the production build:

```bash
pnpm build
```

Run the production server after a successful build:

```bash
pnpm start
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

Run ESLint:

```bash
pnpm lint
```

## API routes

- `GET /api/products` supports `search`, `category`, `rating`, `minPrice`, `maxPrice`, `sort`, `page`, and `limit`.
- `GET /api/products/:slug` returns the complete product detail.
- `GET /api/categories` supports `page` and `limit`.

Example:

```text
/api/products?search=sony&category=electronics&rating=4&sort=price-asc&page=1&limit=12
```

## Data source

The API reads local fixture data from:

- `data/products-500.json`
- `data/categories.json`
- `data/reviews.json`
