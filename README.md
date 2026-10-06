# 🎓 FoundInClass

> **A campus-wide Lost & Found platform that automatically matches lost items with found items using fuzzy string matching.**

FoundInClass solves a common pain point on college campuses: students lose belongings in classrooms, labs, and common areas with no centralized way to reclaim them. The platform lets students report lost or found items, and a scoring algorithm automatically detects matches — reducing manual searching and reuniting items faster.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Application Workflow](#-application-workflow)
- [Database Models](#-database-models)
- [API Reference](#-api-reference)
- [Authentication & Security](#-authentication--security)
- [Project Structure](#-project-structure)
- [Setup & Installation](#-setup--installation)
- [Environment Variables](#-environment-variables)
- [How to Run](#-how-to-run)
- [Future Improvements](#-future-improvements)

---

## 🌟 Project Overview

**FoundInClass** is a full-stack MERN web application designed for college students to:

- Report items they have **lost** on campus
- Report items they have **found** on campus
- Get **automatically matched** when a found item likely corresponds to a lost report
- Track the status of their posts through a personal **dashboard**

The platform homepage also shows live platform-wide statistics (total lost, found, and matched items).

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **User Authentication** | Register, login, and logout with JWT-based sessions |
| **Post a Lost Item** | Submit detailed reports with item name, category, description, location, date, approximate time, verification hint, and optional image |
| **Post a Found Item** | Submit found item reports with the same structured fields and a required image |
| **Automatic Fuzzy Matching** | When a found item is posted, the system automatically scores it against all open lost items using weighted string similarity |
| **Match Status Tracking** | Items move through a defined status lifecycle (`open → matched → verified → ...`) |
| **Personal Dashboard** | Authenticated users see all their own lost and found posts with status indicators |
| **Live Statistics** | Home page displays total found, lost, and matched item counts fetched from the backend |
| **Protected Routes** | `/PostLost`, `/PostFound`, and `/dashboard` require authentication |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 7.x | Build tool & dev server |
| React Router DOM | 7.x | Client-side routing |
| Tailwind CSS | 4.x | Utility-first styling |
| DaisyUI | 5.x | Tailwind component library (dev) |
| Axios | 1.x | HTTP client for API calls |
| React Hook Form | 7.x | Form state management & validation |
| Lucide React | 0.5x | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js + Express | 5.x | HTTP server & REST API |
| MongoDB + Mongoose | 8.x | NoSQL database & ODM |
| JSON Web Token (JWT) | 9.x | Stateless auth tokens |
| bcryptjs | 3.x | Password hashing |
| cookie-parser | 1.x | HTTP cookie parsing |
| cors | 2.x | Cross-Origin Resource Sharing |
| dotenv | 17.x | Environment variable management |
| string-similarity | — | Fuzzy string matching for item pairing |
| nodemon | 3.x | Dev auto-reload |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                   │
│   React + Vite SPA  ·  Tailwind CSS  ·  React Router   │
│   Axios (HTTP)  ·  localStorage (JWT token)             │
└─────────────────────┬───────────────────────────────────┘
                      │  REST API (JSON)
                      │  Bearer Token / HttpOnly Cookie
┌─────────────────────▼───────────────────────────────────┐
│                    EXPRESS SERVER                       │
│   ┌──────────────────────────────────────────────┐      │
│   │  Routes                                      │      │
│   │  /api/auth      → authRoutes                 │      │
│   │  /api/post      → postRoutes                 │      │
│   │  /api/dashboard → userRoutes                 │      │
│   │  /api/home      → userRoutes                 │      │
│   └──────────────────┬───────────────────────────┘      │
│   ┌──────────────────▼───────────────────────────┐      │
│   │  Middleware: verifyToken (JWT)               │      │
│   └──────────────────┬───────────────────────────┘      │
│   ┌──────────────────▼───────────────────────────┐      │
│   │  Controllers + Fuzzy Match Engine            │      │
│   └──────────────────┬───────────────────────────┘      │
└─────────────────────┬───────────────────────────────────┘
                      │  Mongoose ODM
┌─────────────────────▼───────────────────────────────────┐
│                  MongoDB Atlas / Local                   │
│    Collections:  users  ·  postlosts  ·  postfounds     │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Application Workflow

### Posting a Lost Item
1. Authenticated user navigates to `/PostLost`
2. Fills in: item name, category, description, verification hint, date lost, approximate time, location, and optional image (as URL string)
3. Frontend sends `POST /api/post/lost` with Bearer token
4. Backend saves the document with `status: 'open'` and `type: 'lost'`

### Posting a Found Item (with Auto-Matching)
1. Authenticated user navigates to `/PostFound`
2. Fills in all fields (image is required for found items)
3. Frontend sends `POST /api/post/found` with Bearer token
4. Backend saves the document, then immediately calls `matchFoundItem()`
5. **Matching engine** queries all `PostLost` documents with matching `lCategory` and `status: 'open'`
6. Each candidate is scored using weighted fuzzy string comparison:
   - **Item Name** → 40% weight
   - **Location** → 30% weight
   - **Description** → 20% weight
   - **Verification Hint** → 10% weight
7. If the highest score exceeds **70/100**, both items are updated to `status: 'matched'`
8. Match result is returned in the API response

### Dashboard
- Authenticated users visit `/dashboard`
- Frontend calls `GET /api/dashboard/data` (protected)
- Backend returns all lost + found posts belonging to the current user
- Dashboard displays item name, type, category, status stage, location, date, and image

### Home Page Statistics
- Home page fetches `GET /api/home/alldata` (public, no auth required)
- Displays live counts: Found Items, Lost Items, Matched Items

---

## 🗄 Database Models

### `User`
```js
{
  name:     String  // required
  email:    String  // required, unique
  password: String  // required, bcrypt-hashed
}
```

### `PostLost`
```js
{
  lItemName:        String   // required
  lCategory:        String   // required
  lDescription:     String   // required
  lverificationHint:String   // required — used in matching
  lDateLost:        Date     // required
  lApproxTime:      String   // required
  lLocation:        String   // required
  lImage:           String   // optional
  postedBy:         ObjectId // ref: 'User', required
  status:           String   // enum: ['open','matched','verified','Payment','Location_Released','Collect']
  type:             String   // default: 'lost'
}
```

### `PostFound`
```js
{
  fItemName:        String   // required
  fCategory:        String   // required
  fDescription:     String   // required
  fverificationHint:String   // required — used in matching
  fDateFound:       Date     // required
  fApproxTime:      String   // required
  fLocation:        String   // required
  fImage:           String   // required
  postedBy:         ObjectId // ref: 'User', required
  status:           String   // enum: ['open','matched','verified','Location_Released','GetPayment','handover']
  type:             String   // default: 'found'
}
```

#### Item Status Lifecycle

```
Lost Item:   open → matched → verified → Payment → Location_Released → Collect
Found Item:  open → matched → verified → Location_Released → GetPayment → handover
```

---

## 🔌 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/register` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login; returns JWT in body + sets `HttpOnly` cookie |
| `POST` | `/logout` | ❌ | Clears the auth cookie |
| `GET` | `/client` | ✅ | Token verification check |

### Posts — `/api/post`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `POST` | `/lost` | ✅ | Create a lost item report |
| `POST` | `/found` | ✅ | Create a found item report + trigger auto-matching |

### Data — `/api/dashboard` & `/api/home`

| Method | Endpoint | Auth Required | Description |
|--------|----------|:---:|-------------|
| `GET` | `/api/dashboard/data` | ✅ | Fetch the current user's own posts |
| `GET` | `/api/home/alldata` | ❌ | Fetch platform-wide aggregate counts |

> ✅ Auth = requires `Authorization: Bearer <token>` header or `token` cookie

---

## 🔐 Authentication & Security

- **Password hashing**: `bcryptjs` with salt rounds of 10
- **JWT**: Tokens signed with `JWT_SECRET`, expire after **1 hour**
- **Token delivery**: Dual strategy — JWT is set as an `HttpOnly` cookie **and** returned in the response body. The frontend stores it in `localStorage` and sends it as a `Bearer` token for subsequent requests
- **Middleware**: `verifyToken` checks cookies first, falls back to the `Authorization` header. Attaches `{ _id, email }` to `req.user`
- **Cookie config**: `secure: true` + `sameSite: 'none'` in production; `lax` in development
- **CORS**: Strict origin allowlist — only `localhost:5173`, `localhost:5174`, and the `FRONTEND_ORIGIN` env var are permitted
- **Protected routes (frontend)**: `PrivateRoute` component redirects unauthenticated users to `/login`
- **Protected routes (backend)**: `verifyToken` middleware guards all sensitive endpoints

---

## 📁 Project Structure

```
FoundInClass/
├── package.json                  # Root workspace package
│
├── Frontend/                     # React + Vite SPA
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Router setup + AuthStatus context provider
│       ├── index.css
│       ├── api/
│       │   ├── auth.js           # Auth API calls (login, register, logout, client check)
│       │   ├── post.js           # Lost/Found submission API calls
│       │   └── getData.js        # Dashboard + home stats API calls
│       └── Components/
│           ├── context.js        # AuthStatus React context
│           ├── PrivateRoute.jsx  # Route guard (checks localStorage token)
│           ├── Navbar.jsx
│           ├── Footer.jsx
│           ├── NotFound.jsx
│           ├── Home/
│           │   ├── Home.jsx      # Home page shell
│           │   ├── Mid.jsx       # Hero section + live stats
│           │   ├── Login.jsx     # Login form (react-hook-form)
│           │   └── Signup.jsx    # Registration form (react-hook-form)
│           ├── About/            # About page
│           ├── PostLostIteams/
│           │   └── PostLost.jsx  # Lost item submission form
│           ├── PostFound/
│           │   └── PostFound.jsx # Found item submission form
│           └── Dashboard/
│               └── Dashboard.jsx # User's personal item tracker
│
└── server/                       # Express REST API
    ├── server.js                 # App entry — CORS, middleware, routes, DB connect
    ├── fuzzyMatch.js             # Weighted string-similarity scoring engine
    ├── .env                      # Environment variables (gitignored)
    ├── config/
    │   └── mongoDB.js            # Mongoose connection setup
    ├── Models/
    │   ├── UserModel.js          # User schema
    │   ├── postLostSchema.js     # Lost item schema + status enum
    │   └── postFoundSchema.js    # Found item schema + status enum
    ├── Controllers/
    │   ├── authControllers.js    # registerUser, login, logout
    │   ├── postController.js     # LostIteam, FoundIteam (triggers matcher)
    │   ├── foundController.js    # matchFoundItem — auto-matching logic
    │   └── getData.js            # getData (dashboard), fetchAllData (home)
    ├── routes/
    │   ├── authRoutes.js         # /api/auth
    │   ├── postRoutes.js         # /api/post
    │   └── userRoutes.js         # /api/dashboard + /api/home
    └── middleware/
        └── AuthMiddleware.js     # verifyToken — JWT verification middleware
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** v18+
- A **MongoDB** instance — local or [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd FoundInClass
```

### 2. Install backend dependencies
```bash
cd server
npm install
```

### 3. Install frontend dependencies
```bash
cd ../Frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server/` directory:

```env
# MongoDB connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/foundInClass

# JWT signing secret — use a long, random string
JWT_SECRET=your_super_secret_key_here

# Server port (optional, defaults to 4000)
PORT=4000

# Set to "production" for secure cookie behavior
NODE_ENV=development

# Comma-separated list of allowed frontend origins (for CORS in production)
FRONTEND_ORIGIN=https://your-frontend-domain.com
```

Create a `.env` file inside the `Frontend/` directory (optional for local dev):

```env
# Backend API base URL (defaults to http://localhost:4000 if not set)
VITE_API_URL=http://localhost:4000
```

---

## 🚀 How to Run

### Start the backend
```bash
cd server
npm run dev       # development with nodemon (auto-reload)
# or
npm start         # production
```
API server starts at → `http://localhost:4000`

### Start the frontend
```bash
cd Frontend
npm run dev
```
Frontend dev server starts at → `http://localhost:5173`

### Build frontend for production
```bash
cd Frontend
npm run build
# Output in Frontend/dist/
```

---

## 🔮 Future Improvements

- **Real-time notifications** — Notify users via WebSocket or email when their item is matched
- **Cloud image uploads** — Integrate Cloudinary or AWS S3 instead of storing image strings directly
- **Admin panel** — Allow campus staff to manage and verify posts
- **Search & filter** — Let users browse all open items with category and date filters
- **In-app messaging** — Direct chat between the item owner and finder
- **Password reset** — Email-based forgot-password / OTP flow
- **Refresh tokens** — Replace short-lived JWT with a proper refresh token strategy
- **Pagination** — Add cursor-based pagination for dashboard and listings
- **Mobile app** — React Native client for on-the-go item reporting

---

## 📄 License

This project is for educational purposes.
