# TalkToYourData Frontend

## Stack

- Next.js (App Router, TypeScript)
- TanStack Query (React Query)
- React Context (global state)
- TailwindCSS
- Shadcn UI
- pnpm
- Biome (lint/format)
- Recharts
- Zod
- NextAuth.js
- React Router DOM
- next-intl (i18n)
- Cypress (e2e testing)

## Pages

- VDA (Chat) Page (homepage)
- Login
- Organization Settings
- User Settings
- Organizations (list)


## Getting Started

### Install dependencies

```sh
pnpm install
```

### Development

```sh
pnpm dev
```

### Lint & Format

```sh
pnpm biome
```

### Internationalization (i18n)

This project uses `next-intl` for internationalization support.

- Default locale: Arabic (ar)
- Locale prefix is always included in URLs
- RTL support for Arabic language

The i18n configuration is located in the `src/i18n` directory, with the following key files:
- `locales.ts`: Defines supported languages and their configurations
- `routing.ts`: Sets up internationalized routing with next-intl

### Testing

Cypress is installed as a dependency for end-to-end testing.

```sh
# Currently no Cypress scripts are configured in package.json
```
