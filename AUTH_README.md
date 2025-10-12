# 🔐 Authentication System - SPŠD IT Web

Secure, modular authentication system with Microsoft OAuth integration for SPŠD students.

---

## ✨ Features

### 🎯 Core Features

- **Microsoft OAuth Login** - Primary authentication method
- **Password-Based Login** - Alternative after first OAuth
- **Auto-Generated Passwords** - Secure passwords on first login
- **Forgot Password** - Reset via Microsoft OAuth
- **JWT Tokens** - HttpOnly cookies with refresh tokens
- **Rate Limiting** - Protection against brute force
- **Account Lockout** - After 5 failed attempts
- **Audit Logging** - Track all auth events
- **Session Management** - Multiple device support

### 🛡️ Security Features

- ✅ **SQL Injection Prevention** - Prisma ORM with parameterized queries
- ✅ **CSRF Protection** - State validation in OAuth flow
- ✅ **XSS Protection** - HttpOnly cookies, input sanitization
- ✅ **Password Hashing** - Bcrypt with 12 rounds
- ✅ **JWT Validation** - Signed tokens with expiration
- ✅ **Rate Limiting** - Prevent brute force attacks
- ✅ **Audit Logging** - Track all security events
- ✅ **Account Lockout** - Automatic after failed attempts

---

## 🏗️ Architecture

### System Flow

```
┌──────────────────────────────────────────────────────────────┐
│                   AUTHENTICATION FLOW                         │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  FIRST LOGIN (Microsoft OAuth):                              │
│  1. User → Click "Microsoft Login"                           │
│  2. Redirect → Microsoft OAuth (Azure AD)                    │
│  3. Microsoft → Validates @sps-mot.dopravni.cz               │
│  4. Callback → Parse email, extract username                 │
│  5. New User? → Generate secure password                     │
│  6. Database → Save user + hashed password                   │
│  7. Popup → Show password to user (one time only)            │
│  8. Session → Create JWT tokens → HttpOnly cookies           │
│  9. Redirect → Dashboard                                     │
│                                                               │
│  SUBSEQUENT LOGINS (2 options):                              │
│  A. Microsoft OAuth (always available)                       │
│  B. Username + Password (faster, after first login)          │
│                                                               │
│  FORGOT PASSWORD:                                            │
│  1. User → Click "Forgot Password"                           │
│  2. Microsoft OAuth → Authenticate                           │
│  3. Generate → New secure password                           │
│  4. Popup → Show new password                                │
│  5. Database → Update password hash                          │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
spsd_ITweb/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── microsoft/route.ts    # OAuth initiation
│   │   │       ├── callback/route.ts     # OAuth callback
│   │   │       ├── login/route.ts        # Password login
│   │   │       └── logout/route.ts       # Logout
│   │   ├── login/page.tsx               # Login page
│   │   └── dashboard/page.tsx           # Protected dashboard
│   │
│   ├── components/
│   │   └── auth/
│   │       ├── PasswordPopup.tsx        # Show generated password
│   │       └── ForgotPasswordModal.tsx  # Password reset modal
│   │
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── microsoft-oauth.ts       # OAuth configuration
│   │   │   └── jwt.ts                   # Token management
│   │   ├── db/
│   │   │   └── prisma.ts                # Database client
│   │   └── utils/
│   │       ├── password-generator.ts    # Password generation
│   │       └── email-parser.ts          # Email parsing
│   │
│   └── contexts/
│       └── AuthContext.tsx              # Auth state management
│
├── prisma/
│   └── schema.prisma                    # Database schema
│
├── .env.example                         # Environment template
├── SETUP.md                             # Setup guide
└── AUTH_README.md                       # This file
```

---

## 📊 Database Schema

### User Model

```prisma
model User {
  id                  String    @id @default(cuid())

  // Microsoft OAuth
  microsoftId         String    @unique
  email               String    @unique
  username            String    @unique
  displayName         String?

  // Password (generated after first login)
  passwordHash        String
  passwordGeneratedAt DateTime  @default(now())
  passwordChangedAt   DateTime?

  // Security
  failedLoginAttempts Int       @default(0)
  lockedUntil         DateTime?
  lastLogin           DateTime?

  // Relations
  sessions            Session[]
  auditLogs           AuditLog[]
}
```

### Session Model

```prisma
model Session {
  id           String   @id @default(cuid())
  userId       String
  accessToken  String   @unique
  refreshToken String   @unique
  expiresAt    DateTime
  ipAddress    String?
  userAgent    String?
}
```

### Audit Log Model

```prisma
model AuditLog {
  id          String      @id @default(cuid())
  userId      String?
  action      AuditAction
  description String?
  ipAddress   String?
  success     Boolean
  createdAt   DateTime    @default(now())
}
```

---

## 🔑 Email Formats

### Supported Email Formats

```
Valid domains:
- @sps-mot.dopravni.cz
- @mot.sps-dopravni.cz

Examples:
- Barat70671@sps-mot.dopravni.cz          → username: "barat70671"
- agata.stovickova@mot.sps-dopravni.cz   → username: "agata.stovickova"
- jan.novak123@sps-mot.dopravni.cz       → username: "jan.novak123"
```

### Username Extraction

```typescript
Email: "Barat70671@sps-mot.dopravni.cz"
↓
Username: "barat70671" (normalized to lowercase)
↓
Display Name: "Barat 70671"
```

---

## 🔐 Password Security

### Password Generation

```typescript
// Generated passwords:
- Length: 12-16 characters
- Contains: A-Z, a-z, 0-9
- Excludes: Similar chars (i, l, 1, L, o, 0, O)
- Example: "Xp9mK2vL4bRn"
```

### Password Hashing

```typescript
// Bcrypt with 12 rounds
const passwordHash = await bcrypt.hash(password, 12);
```

### Password Strength

- **Weak**: < 8 chars, no variety
- **Medium**: 8-11 chars, some variety
- **Strong**: 12-15 chars, good variety
- **Very Strong**: 16+ chars, full variety

---

## 🚀 API Endpoints

### Microsoft OAuth

```
GET  /api/auth/microsoft
→ Redirects to Microsoft login page
→ Generates and stores CSRF state

GET  /api/auth/callback?code=xxx&state=yyy
→ Validates OAuth code and state
→ Creates or updates user
→ Generates password for new users
→ Creates session and sets cookies
→ Redirects to dashboard
```

### Password Login

```
POST /api/auth/login
Body: { username: "barat70671", password: "Xp9mK2vL4bRn" }

→ Validates credentials
→ Checks rate limiting
→ Checks account lockout
→ Verifies password with bcrypt
→ Generates JWT tokens
→ Creates session
→ Sets HttpOnly cookies
→ Returns success + user data
```

### Logout

```
POST /api/auth/logout

→ Verifies access token
→ Deletes session from database
→ Clears all auth cookies
→ Logs audit event
→ Returns success
```

---

## 🍪 Cookie Management

### Access Token Cookie

```
Name: accessToken
HttpOnly: true
Secure: true (production)
SameSite: strict
Max-Age: 900 seconds (15 minutes)
Path: /
```

### Refresh Token Cookie

```
Name: refreshToken
HttpOnly: true
Secure: true (production)
SameSite: strict
Max-Age: 604800 seconds (7 days)
Path: /
```

### Temporary Password Cookie (First Login Only)

```
Name: temp_password
HttpOnly: false (client needs to read)
Secure: true (production)
SameSite: strict
Max-Age: 300 seconds (5 minutes)
Path: /
```

---

## 🎨 UI Components

### PasswordPopup

Shows generated password after first Microsoft login:

```tsx
<PasswordPopup
  password="Xp9mK2vL4bRn"
  username="barat70671"
  isOpen={true}
  onClose={() => setShowPopup(false)}
/>
```

Features:
- ✅ Show/hide password toggle
- ✅ Copy to clipboard
- ✅ Warning message
- ✅ Theme-aware styling
- ✅ Auto-disappears after closing

### ForgotPasswordModal

Password reset interface:

```tsx
<ForgotPasswordModal
  isOpen={true}
  onClose={() => setShowModal(false)}
  onMicrosoftReset={() => handleMicrosoftLogin()}
/>
```

Features:
- ✅ Microsoft OAuth reset (recommended)
- ✅ Email reset (coming soon)
- ✅ Clear instructions
- ✅ Theme-aware styling

---

## 📈 Rate Limiting

### Login Attempts

```
Window: 15 minutes
Max Attempts: 5
Action: Returns 429 Too Many Requests
```

### Account Lockout

```
Failed Attempts: 5
Lockout Duration: 15 minutes
Reset After: Successful login
```

---

## 📝 Audit Logging

### Logged Events

```
✅ LOGIN_SUCCESS
✅ LOGIN_FAILED
✅ LOGOUT
✅ PASSWORD_RESET
✅ MICROSOFT_AUTH_SUCCESS
✅ MICROSOFT_AUTH_FAILED
✅ ACCOUNT_CREATED
✅ SUSPICIOUS_ACTIVITY
✅ RATE_LIMIT_EXCEEDED
```

### Log Entry

```json
{
  "userId": "clxxxxx",
  "action": "LOGIN_SUCCESS",
  "description": "User logged in successfully: barat70671@sps-mot.dopravni.cz",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "success": true,
  "createdAt": "2025-01-15T10:30:00Z"
}
```

---

## 🧪 Testing

### Test Accounts

```
# After first Microsoft login, you get:
Username: barat70671
Password: (shown in popup - copy it!)

# For subsequent logins:
Username: barat70671
Password: (use the copied password)
```

### Test Flows

1. **First Login**:
   ```
   Login Page → Microsoft Button → OAuth → Dashboard → Password Popup
   ```

2. **Password Login**:
   ```
   Login Page → Username/Password Form → Dashboard
   ```

3. **Forgot Password**:
   ```
   Login Page → Forgot Password → Microsoft OAuth → New Password Popup
   ```

4. **Rate Limiting**:
   ```
   5 failed attempts → Account locked for 15 minutes
   ```

---

## 🐛 Common Issues & Solutions

### Issue: "redirect_uri_mismatch"

**Cause**: Redirect URI in Azure doesn't match
**Fix**: Add exact URL to Azure AD app registration

### Issue: "Invalid state"

**Cause**: CSRF token mismatch or expired
**Fix**: Try again, ensure cookies are enabled

### Issue: "Email domain not allowed"

**Cause**: Email not from @sps-mot.dopravni.cz
**Fix**: Use school email only

### Issue: Password popup doesn't show

**Cause**: Cookie blocked or page refreshed
**Fix**: Use "Forgot Password" to generate new one

---

## 📦 Dependencies

### Core

```json
{
  "@prisma/client": "^5.x",
  "bcryptjs": "^2.4.3",
  "jose": "^5.x",
  "zod": "^3.x",
  "next": "^14.x",
  "react": "^18.x"
}
```

### Dev

```json
{
  "prisma": "^5.x",
  "@types/bcryptjs": "^2.4.x",
  "typescript": "^5.x"
}
```

---

## 🚢 Deployment Checklist

- [ ] Database migrated (`npx prisma migrate deploy`)
- [ ] Environment variables set
- [ ] Azure redirect URIs updated
- [ ] JWT secrets are secure (32+ chars)
- [ ] HTTPS enabled
- [ ] Rate limiting configured
- [ ] Audit logs monitored
- [ ] Backup strategy in place

---

## 📞 Support

For issues or questions:
- GitHub Issues: [link]
- Email: your-email@sps-mot.dopravni.cz
- Documentation: See SETUP.md

---

Made with ❤️ for SPŠD students
