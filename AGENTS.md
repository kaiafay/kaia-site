# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

This is a Next.js 16 (App Router) personal portfolio/blog site. Single package (not a monorepo). No database — all content is file-based (MDX for blog, JSON for structured data). The only external service is **Resend** (email), used by three API routes under `app/api/`.

### Running the dev server

```bash
RESEND_API_KEY=re_dummy CONTACT_EMAIL=test@example.com npm run dev
```

The `RESEND_API_KEY` and `CONTACT_EMAIL` env vars must be set or the Resend client will throw at module load time. Dummy values are fine for local development — pages render normally; only form submissions will fail without real credentials.

### Building

```bash
RESEND_API_KEY=re_dummy CONTACT_EMAIL=test@example.com npm run build
```

The same env vars are required at build time because the API route modules are evaluated during static generation.

### Linting (known issue)

`npm run lint` (`eslint .`) does **not** work out of the box. ESLint and its companion packages (`eslint-config-next`, `@eslint/eslintrc`) are not listed in `package.json` dependencies. Additionally, the `eslint.config.mjs` uses `FlatCompat` to wrap `next/core-web-vitals`, which triggers a "Converting circular structure to JSON" error with `eslint-config-next` v16. This is a [known Next.js 16 issue](https://github.com/vercel/next.js/issues/85244). To fix, the config should migrate away from `FlatCompat` to native flat config imports.

### Content validation

```bash
npm run validate
```

Runs Zod schema validation on JSON content files (`now.json`, `stats.json`, `projects.json`, `uses.json`, `gallery.json`). This also runs as part of `npm run build`.

### No automated tests

The codebase has no test framework or test files. Validation is limited to TypeScript type-checking (during build) and content validation (`npm run validate`).

### Key npm scripts

See `package.json` — `dev`, `dev:clean`, `build`, `start`, `lint`, `validate`.
