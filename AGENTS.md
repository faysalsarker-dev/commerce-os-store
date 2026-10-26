<!-- BEGIN:nextjs-agent-rules -->

# Next.js version

This project uses Next.js 16. Before changing framework behavior, check the matching documentation installed at `node_modules/next/dist/docs/`; do not assume conventions from older Next.js versions.

<!-- END:nextjs-agent-rules -->

# Project guide

## Structure

- `src/app/` contains the App Router: the root layout is in `layout.tsx`; `(pages)/page.tsx` is the home page; `(pages)/products/[slug]/` contains the product-detail route.
- `src/components/modules/` holds home and product UI; `src/components/sections/` holds larger page sections; `src/components/shared/` and `src/components/ui/` hold shared and primitive UI.
- `src/data/` contains the current product and category data. `src/types/` contains shared TypeScript types; `src/lib/` contains small utilities.
- Use the existing `@/` alias for imports and follow neighboring files' component and styling conventions.

## Data and application state

- The application currently uses mock/local data and has no API integration. Product and category content is defined in `src/data/`.
- Keep changes consistent with these local data sources. Do not assume a backend or add API calls unless the task explicitly requests an integration.
- Treat mock records as presentation data, not verified or persisted commerce data.

## Validation

- `npm run lint` runs ESLint.
- `npm run build` runs the Next.js production build.
- There is no test script currently defined in `package.json`.
