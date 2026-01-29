# Frontend - Authentication System

This is the frontend application built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Available Pages

- `/` - Welcome/Home page
- `/login` - User login
- `/signup` - User registration
- `/forgot-password` - Password reset request
- `/reset-password/[token]` - Password reset form
- `/verify-email/[token]` - Email verification
- `/dashboard` - Protected dashboard (requires authentication)

## Features

- **Toast Notifications** - Success, error, info, and warning messages
- **Form Validation** - Client-side validation with error display
- **Protected Routes** - Authentication-required pages
- **Responsive Design** - Mobile-friendly interface
- **Orange Theme** - Consistent Emergyn branding

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
├── contexts/         # React contexts (Auth, Toast)
└── lib/              # Utility functions and API client
```

## Components

- `Button` - Reusable button with variants and loading state
- `Input` - Form input with label and error display
- `Logo` - Emergyn branding component
- `ProtectedRoute` - Route protection wrapper
- `Toast` - Notification component

## Contexts

- `AuthContext` - Authentication state management
- `ToastContext` - Toast notification management

## Utilities

- `api.ts` - API client functions
- `utils.ts` - Helper functions (storage, error formatting)
- `validation.ts` - Form validation helpers
