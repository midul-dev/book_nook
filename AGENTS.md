<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# BookNook Agent Guide & Architecture Reference

This document serves as the guide for AI agents and developers working on the **BookNook** codebase.

---

## 🏗️ Project Architecture

- **Framework**: Next.js 16.4.3 (App Router with Turbopack)
- **React**: React 19.3.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4, Base UI (`@base-ui/react`), Lucide React icons
- **State**: React Context API (`BorrowContext`)
- **Authentication**: Better-Auth (`better-auth` + `@better-auth/mongo-adapter`), Google OAuth, custom JWT token wrappers (`jwtAuthTokenClient`, `jwtAuthTokenServer`)
- **Database**: MongoDB Native Client
- **Notifications**: Sonner (`toast`)

---

## 📁 Directory Structure

```
book_nook/
├── public/                 # Static assets (hero images, icons, placeholders)
├── src/
│   ├── app/                # Next.js App Router route segments
│   │   ├── (auth)/         # Auth route group (sign-in, sign-up, user-profile)
│   │   ├── add-books/      # Book contribution form page & layout
│   │   ├── all-books/      # Book catalog & dynamic [bookId] details page
│   │   ├── api/auth/       # Better-Auth API route handler
│   │   ├── my-books/       # User contributed books dashboard & dialogs
│   │   ├── my-borrows/     # User borrowed books loans dashboard & dialogs
│   │   ├── favicon.ico     # BookNook custom brand favicon
│   │   ├── icon.svg        # Vector SVG favicon
│   │   ├── icon.tsx        # Dynamic Next.js icon generator
│   │   ├── layout.tsx      # Root layout with Navbar, Footer, Providers
│   │   ├── loading.tsx     # Global route loading boundary
│   │   ├── not-found.tsx   # Custom 404 page with Back to Home button
│   │   └── page.tsx        # Home landing page
│   ├── assets/             # Internal image imports
│   ├── components/
│   │   ├── home/           # Landing page sections (hero-banner, workflow, etc.)
│   │   ├── layout/         # Shared Navbar and Footer components
│   │   └── ui/             # Reusable UI primitives (dialog, button, loading-spinner)
│   ├── context/            # Global React Contexts (BorrowContext)
│   ├── lib/                # Auth client/server, MongoDB utils, JWT helpers
│   └── types/              # Shared TypeScript definitions (IBook, BookCategory)
```

---

## 💡 Important Rules for Agents

### 1. Responsive Design Standards
- **Small Mobile First**: Support viewports down to `<360px` without horizontal scroll (`overflow-x-hidden` on root body).
- **iOS Safari Zoom Prevention**: Always use `text-base sm:text-sm` for input fields (`<input>` and `<textarea>`) to prevent iOS Safari auto-zooming on focus.
- **Base UI Dialogs**:
  - The base `DialogFooter` in `src/components/ui/dialog.tsx` has default negative margins (`-mx-4 -mb-4`).
  - When customizing dialog footers, always neutralize these negative margins using `mx-0 mb-0 p-0 border-0 bg-transparent` or appropriate padding so the footer does not shift 16px to the left.
  - Dialog popups must include `max-h-[88dvh] flex flex-col` with `overflow-y-auto` on the form container to avoid viewport clipping on short mobile devices.

### 2. Route Titles & Metadata
- Every route must declare a title following the format: `BookNook | [Page Name]`.
- Server Component pages export `metadata: Metadata = { title: "..." }`.
- Client Component pages (`"use client"`) declare their metadata in a colocated `layout.tsx` and optionally set `document.title` on mount via `useEffect`.

### 3. Swiper.js Guidelines
- Hero banner uses Swiper React with modules `[Autoplay, Pagination, EffectFade]`.
- Pagination bullets must be styled with `position: static !important; width: auto !important; transform: none !important;` inside a dedicated centering wrapper (`inset-x-0 flex justify-center`) to prevent Swiper's CSS from shifting bullets off-screen.

### 4. Authentication & Data Mutation
- Use `jwtAuthTokenClient()` for client-side API requests (`fetch` with `Bearer ${token}`).
- Use `jwtAuthTokenServer()` for server-side page fetches.
- Always display a `Loader2` spinning indicator alongside button text while mutations (`isBorrowing`, `isSaving`, `isDeleting`, `loading`) are active.

---

## 🧪 Verification Commands

```bash
# Verify TypeScript, linting & production build
npm run build

# Start local development server
npm run dev
```
