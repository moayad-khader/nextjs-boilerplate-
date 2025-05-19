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
- use-intl (i18n)
- Cypress (e2e testing)

## Pages

- VDA (Chat) Page (homepage)
- Login
- Organization Settings
- User Settings
- Home (list)


## Getting Started

This project uses [pnpm](https://pnpm.io/) as the package manager. Make sure you have it installed by running:

```bash
npm install -g pnpm
```

### Development Setup

1. Clone the repository:
```bash
git clone <repo-url>
cd talktoyourdata
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the setup script to create necessary environment variables:
```bash
pnpm setup
```
This script creates a `.env.local` file with:
- `NEXTAUTH_SECRET`: A randomly generated secret for JWT token encryption
- `NEXTAUTH_URL`: Set to http://localhost:3000 for development

4. Start the development server:
```bash
pnpm dev
```

### Authentication

The application uses NextAuth.js for authentication. All routes are protected by a middleware that redirects unauthenticated users to the login page.

#### Authentication Flow
1. **Route Protection:** All pages except login and error pages require authentication
2. **Server-Side Check:** Middleware verifies authentication before rendering any protected page
3. **Automatic Redirect:** If user is not authenticated, they're automatically redirected to the login page
4. **Locale Awareness:** The redirect preserves the user's current locale

#### Public Routes
- Login page: `/{locale}/login`
- Error page: `/{locale}/error`

#### Protected Routes
- All other routes require authentication
- After logout, users are automatically redirected to the login page

### Environment Variables

For **development**:
- Run `pnpm setup` to generate required variables

For **production**:
- `NEXTAUTH_SECRET`: Set this to a secure random string
- `NEXTAUTH_URL`: Set this to your production URL

### Route Structure

The app follows Next.js App Router conventions with internationalization:
- `/[locale]/*` - General locale-specific routes
- `/[locale]/login` - Authentication route
- `/[locale]/error` - Error route

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application
- `pnpm start` - Start the production server
- `pnpm lint` - Run linter
- `pnpm biome` - Run Biome formatting
- `pnpm setup` - Set up environment variables

### Lint & Format

```sh
pnpm biome
```

### Internationalization (i18n)

This project uses `use-intl` for internationalization support.

- Default locale: Arabic (ar)
- Locale prefix is always included in URLs
- RTL support for Arabic language

The i18n configuration is located in the `src/i18n` directory, with the following key files:
- `locales.ts`: Defines supported languages and their configurations
- `i18n.ts`: Configures locales and provides type definitions for `use-intl`.
- `middleware.ts`: Handles internationalized routing using `use-intl/server`.

### Testing

Cypress is installed as a dependency for end-to-end testing.

```sh
# Currently no Cypress scripts are configured in package.json
```