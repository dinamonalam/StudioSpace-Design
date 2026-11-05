# StudioSpace Backend API — Express & MongoDB Server

The backend REST API for **StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform**.

---

## 🚀 API Features

- **Double-Booking Collision Prevention (Challenge 2)**:
  MongoDB compound index `{ studioId: 1, bookingDate: 1, status: 1 }` preventing overlapping slots:
  `existing.startTime < requested.endTime && existing.endTime > requested.startTime`
  Returns `409 Conflict` on overlap.
- **JWT Authentication via HTTPOnly Cookies (Challenge 1)**:
  Mutation endpoints protected by `requireAuth` middleware. Session cookies securely issued and cleared on logout.
- **Strict Zod Body Validation**:
  Every mutation validated against strict Zod schemas (`registerSchema`, `loginSchema`, `studioSchema`, `bookingSchema`).
- **Resilient Multi-Mode Database Handler**:
  Seamlessly connects to MongoDB Atlas / local `mongod` when online, while providing zero-downtime, non-blocking in-memory repository fallback pre-seeded with studios and examiner accounts when offline.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js & Express.js
- **Language**: TypeScript (`tsc` & `tsx watch`)
- **Database**: MongoDB & Mongoose 8
- **Authentication**: JWT (`jsonwebtoken`), `bcryptjs`, `cookie-parser`
- **Validation**: `zod`

---

## 📡 Core API Endpoints

### Auth Endpoints (`/api/auth`)
- `POST /api/auth/register`: Register new user with password criteria validation
- `POST /api/auth/login`: Login user and set HTTPOnly JWT cookie
- `POST /api/auth/google`: Google OAuth user synchronization
- `GET /api/auth/me`: Retrieve authenticated user session (Protected)
- `POST /api/auth/logout`: Clear session cookie

### Studio Endpoints (`/api/studios`)
- `GET /api/studios`: Search, filter by category/price/amenity, sort, and paginate
- `GET /api/studios/:id`: Get single studio facility
- `GET /api/studios/my-listings`: Get studios listed by current host (Protected)
- `POST /api/studios`: List new studio workspace (Protected, validated via Zod)
- `PUT /api/studios/:id`: Update studio specifications (Protected, ownership authorization)
- `DELETE /api/studios/:id`: Delete studio listing (Protected, ownership authorization)

### Booking Endpoints (`/api/bookings`)
- `POST /api/bookings`: Reserve studio slot with Double-Booking collision check (Protected, Zod validated)
- `GET /api/bookings/my-bookings`: Retrieve user reservations (Protected)
- `PATCH /api/bookings/:id/cancel`: Cancel reservation (Protected)

### Wishlist Endpoints (`/api/wishlists`)
- `GET /api/wishlists`: Get list of favorited studio IDs for user (Protected)
- `POST /api/wishlists/:studioId`: Atomically toggle favorite status (Protected)

---

## 🧪 Examiner Test Credentials

- **Host**: `host@studiospace.io` / `Password123`
- **Creator**: `creator@studiospace.io` / `Password123`

