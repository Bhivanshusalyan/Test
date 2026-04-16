# 🌍 TravelVista — Tourism Web Application

A modern, full-stack tourism web application that helps users discover breathtaking travel destinations, hotels, restaurants, and scenic places with a special focus on **"Best View"** recommendations.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 + TypeScript, Vite, Tailwind CSS v3, React Router v6, TanStack Query v5 |
| **Backend** | Node.js + Express.js + TypeScript |
| **Database** | SQLite (via better-sqlite3) |
| **Auth** | JWT (JSON Web Tokens) |
| **Validation** | Zod |
| **Maps** | Leaflet.js + React-Leaflet (OpenStreetMap) |
| **Icons** | Lucide React |

## 📁 Project Structure

```
travelvista/
├── client/                    # React Frontend (Vite)
│   ├── src/
│   │   ├── components/        # UI, layout, auth, places, reviews, map
│   │   ├── pages/             # All page components
│   │   ├── hooks/             # TanStack Query hooks
│   │   ├── services/api/      # Axios API service functions
│   │   ├── context/           # Auth context provider
│   │   └── types/             # TypeScript interfaces
│   ├── tailwind.config.ts
│   └── package.json
├── server/                    # Express Backend
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── routes/            # API route definitions
│   │   ├── middleware/        # Auth, error, validation
│   │   ├── schemas/           # Zod validation schemas
│   │   ├── database/          # SQLite setup, schema, seed
│   │   ├── utils/             # JWT, password helpers
│   │   └── types/             # Backend types
│   ├── .env
│   └── package.json
└── package.json               # Root scripts
```

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm 9+

### Installation

```bash
# Clone the repo
cd travelvista

# Install all dependencies (root + client + server)
npm install
cd server && npm install
cd ../client && npm install
cd ..

# Seed the database
cd server
npx tsx src/database/seed.ts
cd ..
```

### Running Locally

```bash
# Start backend (port 5000)
cd server
npx tsx src/index.ts

# In another terminal, start frontend (port 5173)
cd client
npm run dev
```

Or use the root script:
```bash
npm run dev  # Starts both concurrently
```

Open **http://localhost:5173** in your browser.

## 🔑 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@travelvista.com | password123 |
| User | sarah@example.com | password123 |
| User | marco@example.com | password123 |

## 📡 API Endpoints

### Auth
- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Current user (auth required)

### Places
- `GET /api/places` — List all (search, filter, paginate)
- `GET /api/places/:id` — Place details with reviews
- `GET /api/places/best-view` — Best View places
- `GET /api/places/recommended` — Top rated
- `POST /api/places` — Create (admin only)
- `PUT /api/places/:id` — Update (admin only)
- `DELETE /api/places/:id` — Delete (admin only)

### Reviews
- `GET /api/places/:placeId/reviews` — List reviews
- `POST /api/places/:placeId/reviews` — Add review (auth)
- `PUT /api/reviews/:id` — Update review (auth)
- `DELETE /api/reviews/:id` — Delete review (auth)

### Favorites
- `GET /api/favorites` — List favorites (auth)
- `GET /api/favorites/:placeId/check` — Check if favorited (auth)
- `POST /api/favorites/:placeId` — Add favorite (auth)
- `DELETE /api/favorites/:placeId` — Remove favorite (auth)

## ✨ Features

- 🔐 JWT Authentication (signup, login, protected routes)
- 🗺️ Interactive map with Leaflet.js + OpenStreetMap
- 🌄 Dedicated "Best View" curated section
- 🔍 Search & filter by name, category, tags, rating
- ⭐ Reviews & ratings system with auto-calculated averages
- ❤️ Favorites/bookmarks system
- 🌙 Dark glassmorphism UI with smooth animations
- 📱 Fully responsive mobile-first design
- 🦴 Loading skeletons
- 🍞 Toast notifications
- 🔄 TanStack Query caching & optimistic updates

## 🎨 Design

- Dark mode with glassmorphism cards
- Indigo/purple gradient accents
- Inter & Playfair Display typography
- Micro-animations and hover effects
- Custom scrollbar styling
- Dark-themed Leaflet map tiles

## 📄 License

MIT
