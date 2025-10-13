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

✅ Login is fully integrated with the database - use email OR username!

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
│   ├── api/               # Backend endpoints
│   └── dashboard/         # Dashboard pages
├── components/            # React components
├── contexts/              # React Context providers
├── lib/                   # Business logic & utilities
└── types/                 # TypeScript types

prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Seed script
```

---

## 🔐 Features

- ✅ Authentication system (JWT-based)
- ✅ PostgreSQL database with Prisma
- ✅ Role-based access control (ADMIN, TEACHER, STUDENT)
- ✅ Dashboard with sidebar navigation
- ✅ Bakaláři integration (testing interface, admin-only)
- ✅ Multi-language support (CS, EN, SK, RU, UK)
- ✅ Theme system (Modern/Classic, Light/Dark)
- ✅ Audit logging for security

---

## 📚 Documentation

- **project_status.md** - Current project status, changelog, and development notes

---

## 🧑‍💻 Tech Stack

- **Next.js 15.5** - React framework
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Prisma 6** - Database ORM
- **PostgreSQL 14+** - Database
- **Tailwind CSS 4** - Styling
- **Jose** - JWT tokens
- **Bcrypt** - Password hashing

---

## 🎯 Next Steps

1. Implement logout functionality
2. Connect real Bakaláři API (requires school credentials)
3. Implement Microsoft OAuth login
4. Add remaining dashboard features
5. Implement token refresh endpoint

---

## 📄 License

Private project for SPŠD IT program.
