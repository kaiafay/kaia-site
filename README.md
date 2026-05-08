# Kaia — Personal Website

Welcome—this is my corner of the internet where you can browse what I’m working on, read what’s on my mind, and get in touch.

## Overview

**kaiafay.com** is my personal site: a little writing, project highlights, coaching and contact forms, and a dedicated page for Budget Buddy. Most of the content lives in this repo and updates when I ship changes.

## Why I Built This

I wanted a home base for my projects and freelancing, plus space for blogs and the occasional fun personality piece—somewhere that feels like mine, not scattered across a dozen profiles.

## Live Demo

- **Production:** [https://www.kaiafay.com](https://www.kaiafay.com)

## Features

- **Home** — Hero, about teaser, featured projects, freelance services, “now” section, contact form.
- **Work** — Full project list, landing-page case studies, freelance detail.
- **Blog** — MDX posts with frontmatter, pinned posts, read-time estimates, scroll progress on post pages.
- **About / Uses** — Static pages fed from JSON content.
- **Coaching** — Multi-step application form; submissions emailed via API route.
- **Contact** — General inquiry form with optional interest field.
- **Budget Buddy** (`/budget-buddy`) — Standalone marketing layout (no main site chrome), email capture for beta interest.
- **Theme** — Dark default with optional light mode, persisted in `localStorage`.

## Tech Stack

### Frontend

- Next.js (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 (`app/globals.css`, design tokens as CSS variables)
- Radix UI primitives (checkbox, slot)
- Lucide icons
- `next/image` with optional blur placeholders (helper script uses Sharp)

### Content

- MDX via `next-mdx-remote` + `gray-matter`
- JSON content validated at build time with **Zod** (`scripts/validate-content.ts`, `scripts/content/schemas.ts`)

### Backend / integrations

- Next.js Route Handlers (`app/api/*/route.ts`)
- **Resend** for transactional email

### Observability

- `@vercel/analytics`
- `@vercel/speed-insights`

## Screenshots

Coming soon.
