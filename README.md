# TalkToYourData Frontend

## Stack

- Next.js (App Router, TypeScript)
- TanStack Query (React Query)
- React Context (global state)
- TailwindCSS
- Shadcn UI
- pnpm
- Biome (lint/format)
- Highcharts (+ highcharts-react-official)
- Zod
- NextAuth.js
- React Router DOM

## Pages

- Login
- Organization Settings
- User Settings
- Organizations (list)
- VDA (Chat) Page (chat history, chat input, messages, narrative, chart demo)

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
pnpm biome check . --write
```

## Notes

- Uses TanStack Query and React Context for state management.
- Shadcn UI for accessible, themeable components.
- Highcharts demo included in VDA page.
- NextAuth.js ready for integration.
- React Router DOM is set up for client-side navigation in the (app) group.
