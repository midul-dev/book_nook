# 📚 BookNook — Community Library Platform

[![Live Site](https://img.shields.io/badge/Live%20Demo-BookNook-164e38?style=for-the-badge&logo=vercel&logoColor=white)](https://book-nook-a8.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind%20CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> **Live Application URL:** [https://book-nook-a8.vercel.app/](https://book-nook-a8.vercel.app/)

---

## 📖 Project Overview

**BookNook** is a neighborhood-inspired online community library built around a simple trust-driven promise: *add a book from your shelf, borrow a volume to read, and return it for the next reader.* 

The platform offers a unified digital catalog where users can explore curated literature across multiple genres, track real-time copy availability, manage personal loans with zero late fees, and contribute their own books to the neighborhood circulation.

---

## ✨ Key Features

- **Dynamic Interactive Hero Carousel**: Features a responsive Swiper.js slider with autoplay, crossfade transitions, mobile-optimized pill navigation, and direct access to browse books.
- **Real-Time Catalog & Category Filtering**: Browse hundreds of volumes categorized under Fiction, Science, History, Kids, and more with instant category tabs, real-time search, and live on-shelf copy counting.
- **Seamless Borrowing & Return System**: Registered users can borrow physical copies with automated return-date scheduling, out-of-stock protections, and single-click return workflows that immediately restore shelf counts.
- **Personalized Circulation Dashboards**: Dual-view management for readers:
  - **My Books**: Track and manage books you contributed to the shelf, with responsive edit and delete dialogs.
  - **My Borrows**: View active loans with book cover previews, borrow dates, scheduled return dates, and quick return actions.
- **Community Book Contribution**: Simple and intuitive form allowing community members to publish books with title, author, category, copies count, overview synopsis, and cover image.
- **Secure Authentication & Profiles**: Powered by Better-Auth with credentials validation, Google OAuth one-click login, JWT client/server verification, and user profile customization.
- **Modern Responsive UX & Theming**: Fully responsive layout tailored for small phones (<380px), tablets, and desktop displays, featuring instant dark/light theme switching, custom 404 page, and feedback toasts via Sonner.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router & Turbopack)](https://nextjs.org/) |
| **Core Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling & UI** | [Tailwind CSS v4](https://tailwindcss.com/), [@base-ui/react](https://base-ui.com/), [Lucide React](https://lucide.dev/) |
| **Slider & Carousel** | [Swiper.js](https://swiperjs.com/) |
| **Authentication** | [Better-Auth](https://better-auth.com/), Google OAuth, JWT Tokens |
| **Database** | [MongoDB](https://www.mongodb.com/) (Native Driver & Mongo Adapter) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

Follow these steps to run BookNook locally:

### 1. Prerequisites
- **Node.js**: v20 or higher (v22+ recommended)
- **npm**, **pnpm**, or **yarn**
- **MongoDB Database**: Local instance or MongoDB Atlas URI

### 2. Clone the Repository
```bash
git clone https://github.com/midul-dev/book_nook
cd book_nook
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` (or `.env.local`) file in the project root:

```env
# Server API URL
NEXT_PUBLIC_SERVER_URL=https://your-backend-api.com

# Better-Auth Configuration
BETTER_AUTH_SECRET=your_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000

# MongoDB Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/book_nook

# Google OAuth (Optional for Social Login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to explore BookNook.

### 6. Production Build
```bash
npm run build
npm run start
```

---

## 🌐 Live Deployment

The latest version is deployed on Vercel:
👉 **[https://book-nook-a8.vercel.app/](https://book-nook-a8.vercel.app/)**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
