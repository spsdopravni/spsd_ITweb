# SPŠD IT Web

Modern web platform for the IT program at Střední průmyslová škola dopravní (SPŠD) in Prague.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit: **http://localhost:3000**

---

## 🔧 Setup

### 1. Database Setup

```bash
# Create database
psql -U <your-username> -d postgres -c "CREATE DATABASE spsd_itweb;"

# Run migrations
npx prisma migrate dev

# Seed test data
npm run db:seed
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
DATABASE_URL="postgresql://username@localhost:5432/spsd_itweb"
JWT_SECRET="<generate-with-openssl-rand-base64-32>"
JWT_REFRESH_SECRET="<generate-with-openssl-rand-base64-32>"
ENCRYPTION_KEY="<generate-with-openssl-rand-hex-32>"
```

---

## 📝 Test Accounts

After seeding, login with these credentials:

| Email | Username | Password | Role |
|-------|----------|----------|------|
| `admin@spsd.cz` | `admin` | `admin123` | ADMIN |
| `student@spsd.cz` | `student` | `admin123` | STUDENT |
| `teacher@spsd.cz` | `teacher` | `admin123` | TEACHER |

Login accepts either email or username.

---

## 🛠️ Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter

# Database
npm run db:studio    # Open Prisma Studio (http://localhost:5555)
npm run db:migrate   # Run migrations
npm run db:seed      # Seed test data
npm run db:reset     # Reset database (WARNING: deletes data)
```

---

## 📂 Project Structure

```
src/
├── app/                    # Next.js pages & API routes
│   ├── about/             # O oboru
│   ├── curriculum/        # Učební plán
│   ├── projects/          # Public project showcase
│   ├── search/            # Global search
│   ├── login/             # Authentication
│   ├── dashboard/         # Authenticated dashboard
│   │   ├── profile/       # User profile
│   │   └── projects/      # Project CRUD (list, new, [id])
│   └── api/               # Backend endpoints
│       ├── auth/          # Login, logout, refresh, session
│       └── projects/      # Projects CRUD
├── components/            # React components
│   ├── dashboard/         # Dashboard UI
│   ├── layout/            # Navbar, footer, burger menu, dynamic island
│   └── sections/          # Landing page sections
├── contexts/              # React Context providers
├── lib/                   # Business logic & utilities
│   ├── api/               # API helpers
│   ├── auth/              # JWT, password hashing, session
│   ├── db/                # Prisma client
│   ├── hooks/             # Custom React hooks
│   ├── search/            # Search engine
│   ├── theme/             # Theme tokens
│   └── utils/             # Shared utilities
└── types/                 # TypeScript types

prisma/
├── schema.prisma          # Database schema
├── migrations/            # Migration history
└── seed.ts                # Seed script
```

---

## 🔐 Features

- Authentication (JWT with refresh tokens, bcrypt password hashing)
- PostgreSQL database with Prisma ORM
- Role-based access control (ADMIN, TEACHER, STUDENT)
- Dashboard with sidebar navigation
- Project showcase with CRUD for authenticated users
- Multi-language support (CS, EN, SK, RU, UK)
- Theme system (Modern / Classic, Light / Dark)
- Global search across pages and content
- Audit logging for security events

---

## 📚 Documentation

- **DOKUMENTACE.md** — Project documentation (CS)
- **project.md** — Project status and notes

---

## 🧑‍💻 Tech Stack

- **Next.js 16** — React framework
- **React 19.2** — UI library
- **TypeScript 5** — Type safety
- **Prisma 6.17** — Database ORM
- **PostgreSQL 14+** — Database
- **Tailwind CSS 4** — Styling
- **Framer Motion** + **React Spring** — Animations
- **Lucide React** — Icons
- **Jose** — JWT tokens
- **Bcrypt** — Password hashing
- **Zod** — Schema validation

---

## 📄 License

Private project for SPŠD IT program.
