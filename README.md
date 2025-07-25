# Mastersel

A modern Next.js-based admin dashboard application with a focus on product management, orders, and business operations.

## Tech Stack

- **Framework**: Next.js 15 / React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **API**: REST API with Next.js API routes
- **Authentication**: Custom auth middleware
- **Font**: Manrope (Variable font)

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── admin/             # Admin panel routes
│   ├── dashboard/         # Dashboard routes
│   ├── api/               # API routes
│   └── (demo)/            # Demo pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions and API clients
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Helper functions
└── styles/               # Global styles and theme
```

## Key Components

- `sidebar.tsx` - Main desktop navigation sidebar
- `sheet-menu.tsx` - Mobile-responsive navigation menu
- `lib/menu-list.ts` - Navigation menu configuration

## Features

- [ ] Dashboard - Analytics and overview
- [ ] Products - Product management system
- [ ] Orders - Order processing and tracking
- [ ] Balance - Financial management
- [ ] Carriage - Shipping and logistics
- [ ] Invoices - Invoice generation and management
- [ ] Kainodara - Custom business module
- [ ] Settings - Application configuration
- [ ] Admin Panel - System administration

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` - API base URL (default: http://157.230.121.159)
- `APP_URL` - Application URL for metadata
- `PORT` - Development server port (default: 3000)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run registry:build` - Build component registry
- CORS workaround `$ chrome --disable-web-security --user-data-dir="/tmp/ChromeDevSession"`
- change git credentials if needed:

```bash
git config user.name "your name"
git config user.email "your email"
```

## Authentication

The application uses middleware-based authentication with the following route protection:

Protected Routes (require authentication):

- `/dashboard/*`
- `/admin/*`
- `/settings/*`
- `/settings/*`

Public Routes (redirect to dashboard if authenticated):

- `/login`
- `/signup`
- `/forgot-password`

Admin Routes (require admin role):

- `/admin/*`

## Styling

The project uses Tailwind CSS with a custom theme configuration. Key features:

- Dark mode support
- Custom color scheme
- Responsive design
- Component-based styling with shadcn/ui

## API Integration

This project uses a type-safe API integration architecture based on OpenAPI schemas.

To generate API docs use this command:

```sh
npx openapi-generate-html -i api.json api.html
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request# NextJS
