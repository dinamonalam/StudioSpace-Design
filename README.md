# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.5_App_Router-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_&_Mongoose-green?logo=mongodb)](https://www.mongodb.com/)

**StudioSpace** is a high-performance, cinematic peer-to-peer marketplace engineered specifically for creators, filmmakers, photographers, audio engineers, and podcasters. Studio hosts can list their creative facilities—ranging from sound stages and daylight cyclorama walls to Dolby Atmos mixing suites and art workshops. Creators can discover, filter by gear, inspect dynamic slot availability, and reserve production hours with transparent pricing and real-time collision prevention.

---

## 🌐 Live Application URLs

- **Client Live Website**: `[Insert your live Vercel URL here]`
- **Server API Live Backend**: `[Insert your live Render/Railway URL here]`

---

## 🚀 Key Standout Features

- **Double-Booking Collision Prevention Engine (Challenge 2)**:
  Verifies incoming reservations against active (`Confirmed` & `Pending`) bookings using MongoDB overlapping queries:
  $$\text{existing.startTime} < \text{requested.endTime} \quad \land \quad \text{existing.endTime} > \text{requested.startTime}$$
  Colliding attempts are caught before database writes and rejected with **HTTP 409 Conflict** and human-readable time conflict details.

- **JWT Authentication via Secure HTTPOnly Cookies (Challenge 1)**:
  Protects all server mutations (`POST /api/studios`, `PUT /api/studios/:id`, `DELETE /api/studios/:id`, `POST /api/bookings`) with secure HTTPOnly cookie validation. Rejecting unauthorized tampering with `401 Unauthorized` and cross-account updates with `403 Forbidden`.

- **Comprehensive Studio Exploration & Multi-Filter Catalog**:
  Interactive search by facility title, district, and city; category filters (*Photo Studio*, *Film Stage*, *Podcast Room*, *Music Suite*, *Art Workshop*); hourly budget sliders; equipment filters; and sorting (*Price: Low to High*, *Price: High to Low*, *Top Rated*, *Newest*).

- **Full Studio CRUD & ImgBB CDN Upload**:
  Hosts can publish, inspect, edit, and delete their workspaces. Integrated with ImgBB CDN image upload API with real-time photographic preview. Listing deletions require confirmation via custom dark-glass modal dialogs (strict zero browser `alert()` policy).

- **Printable PDF Booking Invoice Generator (Optional Feature)**:
  Logged-in creators can generate and download high-resolution official StudioSpace Booking Invoices containing facility specs, booking references, host info, shoot duration, security deposits, and electronic confirmation seals.

- **Persistent Wishlist & Light/Dark Theme Customization (Challenge 3)**:
  Creators can favorite and save studios to MongoDB with heart toggle buttons. Includes instant theme switching between Obsidian Dark (`#17191C`) and Alabaster Light modes via `next-themes`.

- **Zero-Error SPA Persistence & Dynamic Refresh Handling**:
  The application maintains session state across hard page refreshes on private routes (`/dashboard`, `/add-studio`, `/my-listings`, `/my-bookings`, `/studios/edit/[id]`), preventing unwanted redirects to login.

---

## 🛠️ Technology Stack

| Layer | Technologies Selected |
| :--- | :--- |
| **Frontend Framework** | **Next.js 16 (App Router)**, React 19, TypeScript |
| **Styling & Design Tokens** | **Tailwind CSS v4**, `@tailwindcss/postcss`, Obsidian Dark (`#17191C`) & Gold Accent (`#E7A65A`) |
| **Typography** | Playfair Display (Headings) & Inter (Body Text) |
| **Component UI & Icons** | **Lucide React**, Custom Aperture Spotlight SVG, Radix UI primitives |
| **Slider & Carousels** | **Swiper.js** with Autoplay, Fade Effect, and Pagination |
| **Notifications & Modals** | **Sonner Toasts** & Custom Dark-Glass Modal Dialogs (Zero browser `alert()`) |
| **Backend Framework** | **Node.js**, **Express.js**, TypeScript |
| **Database & ODM** | **MongoDB Atlas**, **Mongoose 8** with compound indexes |
| **Validation & Schema** | **Zod 3.24** schema validation middleware |
| **Authentication** | **JWT (jsonwebtoken)**, **HTTPOnly Cookies**, **bcryptjs** |
| **Image Hosting** | **ImgBB API** |
| **Deployment Targets** | **Vercel** (Client) & **Render** (Backend API) |

---

## 🔐 Examiner Test Credentials

Examiner accounts are pre-seeded and ready for instant testing:

| Role | Email Address | Password | Permissions |
| :--- | :--- | :--- | :--- |
| **Studio Host** | `host@studiospace.io` | `Password123` | Can list studios, edit specs, delete facilities, view host dashboard |
| **Creative Director** | `creator@studiospace.io` | `Password123` | Can explore, wishlist spaces, reserve shoot slots, download PDF invoices |

> **Examiner Quick-Fill**: The [Login Page](http://localhost:3000/login) includes one-click **"Fill Host Account"** and **"Fill Creator Account"** buttons for immediate evaluation.

---

## 💻 Local Setup & Installation

### Prerequisites
- Node.js `v20+` or `v24+` installed
- Git installed
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/dinamonalam/StudioSpace-Design.git
cd StudioSpace-Design
```

### 2. Install Dependencies
You can install dependencies for both applications from the root:
```bash
# Install root convenience scripts
npm install

# Install client dependencies
npm install --prefix client

# Install server dependencies
npm install --prefix server
```

### 3. Configure Environment Variables

#### Client Configuration (`client/.env.local`)
Create `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=c1e84df1a48c1e28509804b4070a7f1a
```

#### Server Configuration (`server/.env`)
Create `server/.env`:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/studiospace
JWT_SECRET=studiospace_jwt_secret_creative_key_2026
COOKIE_SECRET=studiospace_cookie_secret_key_2026
```

> **Note on Database**: If a local MongoDB instance is not detected, the server automatically boots in **Resilient In-Memory Mode** pre-loaded with production studios and examiner accounts, allowing full CRUD, booking, and search testing without configuration.

### 4. Run Both Servers Locally

You can launch both servers simultaneously from the root:
```bash
npm run dev
```

Or run them individually in separate terminal tabs:
```bash
# Terminal 1: Client Dev Server
npm run dev:client
# Runs on http://localhost:3000

# Terminal 2: Express Backend Server
npm run dev:server
# Runs on http://localhost:5000
```

---

## 🧪 Testing Guide

1. **Public Exploration**: Open `http://localhost:3000` to inspect the Hero Swiper, Featured Studios, Categories, and Workflow sections.
2. **Category Navigation**: Click any category (e.g. *Film Stages*) to navigate to `/studios` with filters pre-applied.
3. **Authentication**: Go to `/login`, use the examiner quick-fill buttons, and log in.
4. **Studio Management**: Visit `/add-studio`, upload a photo via ImgBB or URL, select equipment amenities, and publish. Manage your space under `/my-listings`.
5. **Collision Detection**: Visit `/studios/[id]`, try booking an already reserved slot to observe the 409 collision toast, then book an available time window.
6. **PDF Receipt**: Navigate to `/my-bookings` and click **"PDF Invoice"** to inspect the printable invoice.

---

## 📄 License & Ownership
Created for the Full-Stack Engineering Module Assignment. Developed with precision by the StudioSpace Team.

