# StudioSpace

A peer-to-peer marketplace where creators book photo studios, film stages, podcast rooms, and music suites by the hour.

**Live Site:** https://client-gray-iota-24.vercel.app  
**Server API:** https://studiospace-server-hzs8.onrender.com


## Features

- **Double-booking prevention:** overlapping slots are rejected with HTTP 409 and a clear message
- **JWT auth with HTTPOnly cookies:** protected routes return 401/403 for unauthorized access
- **Search and filters:** by name, city, category, equipment, and price, with sorting options
- **Studio CRUD:** hosts can add, edit, and delete listings, with ImgBB image upload
- **PDF booking invoice:** download a printable invoice from My Bookings
- **Wishlist and light/dark theme:** saved studios persist in MongoDB
- **Session persistence:** private pages stay logged in after a refresh

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Swiper, Sonner
- **Backend:** Node.js, Express.js, TypeScript, Zod
- **Database:** MongoDB Atlas, Mongoose
- **Auth:** JWT, bcryptjs, HTTPOnly cookies
- **Hosting:** Vercel (client), Render (server)

## Examiner Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| Studio Host | host@studiospace.io | Password123 |
| Creator | creator@studiospace.io | Password123 |

The login page has one-click "Fill Host" and "Fill Creator" buttons.

## Local Setup

```bash
git clone https://github.com/dinamonalam/StudioSpace-Design.git
cd StudioSpace-Design
npm install && npm install --prefix client && npm install --prefix server
```

Create `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_key
```

Create `server/.env`:
```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/studiospace
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

Run both apps:
```bash
npm run dev
```
Client: http://localhost:3000 · Server: http://localhost:5000

> If MongoDB isn't running, the server falls back to in-memory mode with seeded data.
