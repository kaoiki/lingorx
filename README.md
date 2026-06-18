# LingoRx

A gamified language learning dashboard built with Vue 3, Vite, and Nuxt UI.

## Tech Stack

- **Vue 3** — Composition API + TypeScript
- **Vite** — Build tool
- **Nuxt UI 4** — UI component library
- **Tailwind CSS 4** — Utility-first CSS framework
- **Vue Router** — Client-side routing

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
src/
├── layouts/
│   ├── default.vue     # Default layout (TopNavBar + content + Footer)
│   └── blank.vue       # Blank layout for login/register pages
├── components/
│   ├── TopNavBar.vue   # Navigation bar with avatar dropdown
│   └── AppFooter.vue   # Footer with copyright and links
├── pages/
│   ├── index.vue       # Dashboard
│   ├── login.vue       # Login page
│   └── register.vue    # Register page
├── App.vue
└── main.ts
```

## Deploy on Vercel

This project is ready for Vercel deployment. Connect your GitHub repository and Vercel will auto-detect Vite settings.

## License

MIT
