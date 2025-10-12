# 🔧 SPŠD IT Web - Setup Guide

Complete guide to set up secure authentication with Microsoft OAuth and PostgreSQL.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Microsoft Azure AD Setup](#microsoft-azure-ad-setup)
4. [Environment Variables](#environment-variables)
5. [Dependencies Installation](#dependencies-installation)
6. [Database Migration](#database-migration)
7. [Testing](#testing)
8. [Production Deployment](#production-deployment)

---

## 1. Prerequisites

Before starting, ensure you have:

- ✅ Node.js 18+ installed
- ✅ PostgreSQL 14+ installed (or access to cloud PostgreSQL)
- ✅ Azure AD account with admin access
- ✅ Git installed

---

## 2. Database Setup

### Option A: Local PostgreSQL

```bash
# Install PostgreSQL (macOS)
brew install postgresql@14
brew services start postgresql@14

# Create database
psql postgres
CREATE DATABASE spsd_itweb;
CREATE USER spsd_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE spsd_itweb TO spsd_user;
\q
```

### Option B: Cloud PostgreSQL (Recommended)

**Supabase** (Free tier available):
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string from Settings → Database

**Railway** (Free tier available):
1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy connection string from Variables tab

---

## 3. Microsoft Azure AD Setup

### Step 1: Create App Registration

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**

### Step 2: Configure App

**Name**: `SPŠD IT Web`

**Supported account types**: Choose one:
- **Single tenant** (only @sps-mot.dopravni.cz) - Recommended
- **Multitenant** (any Microsoft account)

**Redirect URI**:
- Type: `Web`
- URI: `http://localhost:3000/api/auth/callback` (development)
- URI: `https://your-domain.com/api/auth/callback` (production)

### Step 3: Get Client ID

1. After creation, go to **Overview**
2. Copy **Application (client) ID** → This is your `MICROSOFT_CLIENT_ID`
3. Copy **Directory (tenant) ID** → This is your `MICROSOFT_TENANT_ID`

### Step 4: Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Description: `SPŠD IT Web Secret`
4. Expires: 24 months (recommended)
5. Click **Add**
6. **IMPORTANT**: Copy the **Value** immediately (shown only once)
   - This is your `MICROSOFT_CLIENT_SECRET`

### Step 5: Configure API Permissions

1. Go to **API permissions**
2. Click **Add a permission** → **Microsoft Graph** → **Delegated permissions**
3. Add these permissions:
   - ✅ `openid`
   - ✅ `profile`
   - ✅ `email`
   - ✅ `User.Read`
4. Click **Grant admin consent** (if you have admin rights)

### Step 6: Configure Authentication

1. Go to **Authentication**
2. Under **Implicit grant and hybrid flows**:
   - ✅ ID tokens
3. Under **Advanced settings**:
   - Allow public client flows: **No**
4. Save changes

---

## 4. Environment Variables

### Step 1: Copy Example File

```bash
cp .env.example .env
```

### Step 2: Fill in Values

Open `.env` and update:

```env
# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database (from Step 2)
DATABASE_URL="postgresql://spsd_user:your_password@localhost:5432/spsd_itweb"

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_SECRET="generated-secret-here"
JWT_REFRESH_SECRET="another-generated-secret-here"

# Microsoft OAuth (from Step 3)
MICROSOFT_CLIENT_ID="your-client-id-from-azure"
MICROSOFT_CLIENT_SECRET="your-client-secret-from-azure"
MICROSOFT_TENANT_ID="your-tenant-id-or-common"
MICROSOFT_REDIRECT_URI="http://localhost:3000/api/auth/callback"

# Encryption Key (generate with: openssl rand -hex 32)
ENCRYPTION_KEY="generated-64-char-hex-string"
```

### Generate Secrets

```bash
# Generate JWT secret
openssl rand -base64 32

# Generate another for refresh
openssl rand -base64 32

# Generate encryption key
openssl rand -hex 32
```

---

## 5. Dependencies Installation

### Install Required Packages

```bash
npm install
```

### Additional Required Dependencies

If not already in package.json, install:

```bash
# Core authentication
npm install @prisma/client bcryptjs jose zod

# Dev dependencies
npm install -D prisma @types/bcryptjs

# Optional: for better validation
npm install validator
```

---

## 6. Database Migration

### Step 1: Generate Prisma Client

```bash
npx prisma generate
```

### Step 2: Push Schema to Database

```bash
# For development
npx prisma db push

# For production (creates migrations)
npx prisma migrate dev --name init
```

### Step 3: Verify Database

```bash
# Open Prisma Studio to view database
npx prisma studio
```

You should see tables:
- ✅ users
- ✅ sessions
- ✅ audit_logs
- ✅ password_reset_tokens

---

## 7. Testing

### Step 1: Start Development Server

```bash
npm run dev
```

### Step 2: Test Microsoft Login

1. Go to `http://localhost:3000/login`
2. Click **"Přihlásit se přes Microsoft"**
3. Login with your @sps-mot.dopravni.cz email
4. Should redirect to dashboard
5. **First time**: Popup should show generated password
6. **Copy and save** the password!

### Step 3: Test Password Login

1. Logout
2. Go to login page
3. Enter username (part before @) and the generated password
4. Should login successfully

### Step 4: Test Forgot Password

1. Logout
2. Click **"Zapomněli jste heslo?"**
3. Use Microsoft login to reset
4. New password should be generated and shown

---

## 8. Production Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add MICROSOFT_CLIENT_ID
# ... add all other env variables
```

**Important**: Update redirect URI in Azure:
- Add: `https://your-domain.vercel.app/api/auth/callback`

### Database Migrations in Production

```bash
# Generate migration files
npx prisma migrate deploy

# Or use Vercel build command:
"build": "prisma generate && prisma migrate deploy && next build"
```

---

## 🔐 Security Checklist

Before going to production:

- [ ] All JWT secrets are 32+ characters
- [ ] Encryption key is 64 hex characters
- [ ] `NODE_ENV=production` in production
- [ ] Database uses SSL connection
- [ ] Azure AD redirect URIs include only your domains
- [ ] Client secret will expire (set reminder)
- [ ] Regular backups configured for database
- [ ] Audit logs are monitored
- [ ] Rate limiting is enabled
- [ ] HTTPS is enforced (no HTTP)

---

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Microsoft Graph API](https://docs.microsoft.com/en-us/graph)
- [Azure AD OAuth](https://docs.microsoft.com/en-us/azure/active-directory/develop)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

---

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Test connection
npx prisma db pull
```

**Fix**: Check DATABASE_URL format and credentials

### Microsoft OAuth Error: "redirect_uri_mismatch"

**Fix**: Ensure redirect URI in Azure matches exactly (including http/https)

### Token Error: "Invalid signature"

**Fix**: Regenerate JWT_SECRET and restart server

### User Already Exists Error

**Fix**: Check if email/username is unique in database

---

## 🤝 Support

For help:
- Check [GitHub Issues](https://github.com/yourusername/spsd_ITweb/issues)
- Contact: your-email@sps-mot.dopravni.cz
