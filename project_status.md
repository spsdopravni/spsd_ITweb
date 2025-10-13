# SPSD IT Web - Project Status

> Last Updated: 2025-10-13 (Admin-Only Testing Interface Implemented)
> Status: Active Development
> Current Branch: `main`

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Rules & Guidelines](#project-rules--guidelines)
4. [Current State](#current-state)
5. [Features Implemented](#features-implemented)
6. [Project Structure](#project-structure)
7. [Recent Changes](#recent-changes)
8. [Pending Features & TODOs](#pending-features--todos)
9. [Known Issues](#known-issues)
10. [Development Notes](#development-notes)

---

## Project Overview

**SPSD IT Web** is a comprehensive web platform for the IT program at Střední průmyslová škola dopravní (SPŠD) in Prague. The platform serves as a central hub for students, providing access to curriculum information, student projects, authentication, and various integrations with school systems.

### Key Goals
- Provide modern, accessible interface for IT students
- Integrate with school systems (Bakaláři, Moodle)
- Support multiple languages (CS, EN, SK, RU, UK)
- Offer both classic and modern UI themes
- Secure authentication via Microsoft OAuth
- Track student progress and grades

---

## Technology Stack

### Core Framework
- **Next.js 15.5.2** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.x** - Type safety throughout

### Styling & UI
- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Framer Motion 12.23.22** - Advanced animations
- **@react-spring/web 10.0.1** - Physics-based animations
- **Lucide React 0.542.0** - Icon library

### Authentication & Security
- **Prisma 6.17.1** - Database ORM (PostgreSQL)
- **Jose 6.1.0** - JWT token management
- **bcryptjs 3.0.2** - Password hashing
- **Zod 4.1.12** - Schema validation

### Database
- **PostgreSQL 14+** - Primary database
- **Prisma Client** - Type-safe database access

---

## Project Rules & Guidelines

These are the established patterns and conventions that **MUST** be followed throughout the project. Consistency is key to maintainability.

### 1. Architecture & Modularization 🏗️

#### Feature-Based Organization
- **Rule**: Organize code by feature, not by file type
- **Example**: All auth-related code lives in `src/app/api/auth/`, `src/components/auth/`, `src/lib/auth/`
- **Why**: Makes features easier to understand, modify, and potentially extract

#### Separation of Concerns
- **Components** (`src/components/`) - Pure UI, no business logic
- **Contexts** (`src/contexts/`) - Global state management
- **Lib** (`src/lib/`) - Business logic, utilities, integrations
- **Hooks** (`src/hooks/`) - Reusable stateful logic
- **Types** (`src/types/`) - Shared TypeScript interfaces and types
- **API Routes** (`src/app/api/`) - Backend endpoints

#### Component Modularization Rules
```
✅ DO: Break large components into smaller, focused ones
✅ DO: Extract reusable logic into custom hooks
✅ DO: Co-locate related components (e.g., dynamic-island/ subfolder)
✅ DO: Create index.ts files for clean imports

❌ DON'T: Create monolithic components over 300 lines
❌ DON'T: Mix business logic with UI rendering
❌ DON'T: Create deep component hierarchies (max 3-4 levels)
```

#### Module Boundaries
- **Public Pages** → Can use any component, context, or utility
- **Components** → Can use other components, hooks, and utilities
- **Utilities** → Must be pure functions, no component imports
- **API Routes** → Can use lib/, prisma, but NO component imports

---

### 2. File Organization & Naming 📁

#### Directory Structure Rules

```
src/
├── app/                        # Next.js App Router (pages & API routes)
│   ├── (routes)/              # Public pages (page.tsx)
│   └── api/                   # API endpoints (route.ts)
├── components/                # React components
│   ├── [feature]/             # Grouped by feature
│   └── ui/                    # Reusable UI primitives
├── contexts/                  # React Context providers
├── hooks/                     # Custom React hooks
├── lib/                       # Business logic & utilities
│   ├── [feature]/             # Feature-specific logic
│   └── utils/                 # Generic utilities
└── types/                     # TypeScript type definitions
```

#### Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| **Components** | PascalCase | `DynamicIsland.tsx` |
| **Pages** | lowercase | `page.tsx`, `layout.tsx` |
| **API Routes** | lowercase | `route.ts` |
| **Utilities** | camelCase | `searchEngine.ts` |
| **Hooks** | camelCase with `use` prefix | `useCommandPalette.ts` |
| **Contexts** | PascalCase with `Context` suffix | `AuthContext.tsx` |
| **Types** | PascalCase | `SearchResult`, `TokenPayload` |
| **Interfaces** | PascalCase with `I` prefix (optional) | `NavItem`, `IUser` |
| **Constants** | SCREAMING_SNAKE_CASE | `ACCESS_TOKEN_EXPIRY` |
| **Functions** | camelCase | `generateTokenPair()` |

#### File Naming Rules
```
✅ DO: Use descriptive, specific names
   - DashboardSidebar.tsx (not Sidebar.tsx)
   - microsoft-oauth.ts (not oauth.ts)

✅ DO: Use plural for collections
   - hooks/ (contains multiple hooks)
   - components/ (contains multiple components)

✅ DO: Match file name to primary export
   - File: SearchBar.tsx → Export: SearchBar

❌ DON'T: Use abbreviations unless widely known
   - searchEngine.ts (not srchEng.ts)
   - authentication.ts (not auth.ts, unless in auth/ folder)

❌ DON'T: Use index.tsx for components (use specific names)
   - DynamicIsland.tsx (not index.tsx)
   - Exception: index.ts for re-exports is OK
```

---

### 3. Code Style & Conventions ✍️

#### TypeScript Rules

**Strict Mode**: Always enabled
```json
{
  "strict": true,
  "noEmit": true,
  "esModuleInterop": true
}
```

**Type Annotations**
```typescript
✅ DO: Annotate function parameters and return types
export async function generateAccessToken(payload: TokenPayload): Promise<string> {
  // ...
}

✅ DO: Define interfaces for all data structures
interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  role?: string;
}

✅ DO: Use type inference for simple variables
const count = 0; // Type inferred as number

❌ DON'T: Use 'any' type (use 'unknown' if necessary)
const data: any = await fetch(); // ❌ BAD
const data: unknown = await fetch(); // ✅ GOOD

❌ DON'T: Use @ts-ignore (fix the error instead)
```

#### Code Formatting

```typescript
// ✅ Good: Destructure props, early returns, clear logic
interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function Modal({ isOpen, onClose, title }: Props) {
  if (!isOpen) return null; // Early return

  return (
    <div className="modal">
      <h2>{title}</h2>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

// ❌ Bad: No types, nested logic, unclear
export function Modal(props) {
  return (
    <>
      {props.isOpen && (
        <div className="modal">
          <h2>{props.title}</h2>
          <button onClick={props.onClose}>Close</button>
        </div>
      )}
    </>
  );
}
```

#### Import Organization

```typescript
// Order: External → Internal → Types
import React, { useState, useEffect } from 'react'; // External
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/Button'; // Internal (aliased)
import { useAuth } from '@/contexts/AuthContext';
import { searchEngine } from '@/lib/search/searchEngine';

import type { SearchResult } from '@/types/search'; // Types last
```

#### Comments & Documentation

```typescript
/**
 * JSDoc for public functions
 *
 * Handles user login with username and password.
 * Validates credentials, checks rate limits, and generates JWT tokens.
 *
 * @param username - The user's username
 * @param password - The user's password
 * @returns Token pair with access and refresh tokens
 * @throws {Error} If credentials are invalid
 */
export async function login(username: string, password: string): Promise<TokenPair> {
  // Inline comments for complex logic
  // Check rate limiting before attempting login
  if (!checkRateLimit(ip)) {
    throw new Error('Rate limit exceeded');
  }

  // ... rest of implementation
}

// ✅ DO: Comment WHY, not WHAT
// Rate limiting prevents brute force attacks
const maxAttempts = 5;

// ❌ DON'T: Obvious comments
// Set maxAttempts to 5
const maxAttempts = 5;
```

---

### 4. Component Development Rules ⚛️

#### Component Structure

```typescript
'use client'; // Mark client components explicitly

import React, { useState, useEffect } from 'react'; // Imports
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import type { User } from '@/types/user';

// 1. Type definitions
interface Props {
  userId: string;
  onUpdate?: (user: User) => void;
}

// 2. Component definition
export function UserProfile({ userId, onUpdate }: Props) {
  // 3. Hooks (in consistent order)
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 4. useEffect hooks
  useEffect(() => {
    // Load user data
  }, [userId]);

  // 5. Event handlers
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      // Update logic
      onUpdate?.(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 6. Early returns
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return null;

  // 7. Main render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

#### Component Rules

```typescript
✅ DO: Use functional components with hooks
✅ DO: Mark client components with 'use client'
✅ DO: Keep components under 200-300 lines
✅ DO: Extract complex logic into custom hooks
✅ DO: Use early returns for error/loading states
✅ DO: Destructure props in function signature
✅ DO: Provide default props when appropriate

❌ DON'T: Use class components (deprecated)
❌ DON'T: Fetch data directly in components (use hooks/contexts)
❌ DON'T: Mutate props or state directly
❌ DON'T: Create inline functions in render (use useCallback)
❌ DON'T: Forget to handle loading and error states
```

#### Client vs Server Components

```typescript
// ✅ Server Component (default in Next.js 15)
// - No 'use client' directive
// - Can fetch data directly
// - No hooks, no browser APIs
export default async function Page() {
  const data = await fetchData(); // Direct data fetching
  return <div>{data}</div>;
}

// ✅ Client Component
// - Requires 'use client' directive
// - Can use hooks, state, browser APIs
// - Interactive features
'use client';

export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

---

### 5. State Management Rules 📊

#### State Management Hierarchy

1. **Local State** (useState) - Component-specific, not shared
2. **Custom Hooks** - Reusable logic with state
3. **Context API** - Global state (auth, theme, language, preferences)
4. **URL State** (useSearchParams) - Shareable state via URL
5. **LocalStorage** - Persisted preferences

#### Context Usage Rules

```typescript
// ✅ DO: Create typed contexts
interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ DO: Provide custom hooks for contexts
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// ✅ DO: Wrap app in providers at root level (app/layout.tsx)
export default function RootLayout({ children }) {
  return (
    <PreferencesProvider>
      <LanguageProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </LanguageProvider>
    </PreferencesProvider>
  );
}

❌ DON'T: Put too much state in context (causes re-renders)
❌ DON'T: Create contexts for non-global state
❌ DON'T: Use context for high-frequency updates
```

#### State Persistence

```typescript
// ✅ DO: Persist user preferences in localStorage
useEffect(() => {
  localStorage.setItem('theme', theme);
}, [theme]);

// ✅ DO: Check for SSR before accessing localStorage
useEffect(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferences');
    // ...
  }
}, []);

❌ DON'T: Store sensitive data in localStorage (use httpOnly cookies)
❌ DON'T: Store large amounts of data (use database)
```

---

### 6. API & Backend Rules 🔌

#### API Route Structure

```typescript
// src/app/api/[feature]/[action]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db/prisma';

// 1. Validation schema
const requestSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(8),
});

// 2. HTTP method handler
export async function POST(request: NextRequest) {
  try {
    // 3. Parse and validate input
    const body = await request.json();
    const validation = requestSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      );
    }

    // 4. Business logic
    const result = await processRequest(validation.data);

    // 5. Audit logging (for sensitive operations)
    await prisma.auditLog.create({
      data: {
        action: 'ACTION_NAME',
        success: true,
        // ...
      },
    });

    // 6. Return response
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    // 7. Error handling
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

#### API Rules

```typescript
✅ DO: Validate ALL inputs with Zod
✅ DO: Use proper HTTP status codes (200, 201, 400, 401, 403, 404, 429, 500)
✅ DO: Log all security-related actions (login, logout, password change)
✅ DO: Implement rate limiting on sensitive endpoints
✅ DO: Return consistent error format
✅ DO: Use try-catch for error handling

❌ DON'T: Trust client input (always validate)
❌ DON'T: Expose internal error details to client
❌ DON'T: Return 200 for errors
❌ DON'T: Log sensitive data (passwords, tokens)
```

#### Database Access Rules

```typescript
// ✅ DO: Use Prisma for all database operations
import { prisma } from '@/lib/db/prisma';

const user = await prisma.user.findUnique({
  where: { id: userId },
});

// ✅ DO: Use transactions for multi-step operations
await prisma.$transaction(async (tx) => {
  await tx.user.update({ ... });
  await tx.auditLog.create({ ... });
});

// ✅ DO: Handle database errors gracefully
try {
  await prisma.user.create({ data });
} catch (error) {
  if (error.code === 'P2002') {
    // Handle unique constraint violation
  }
}

❌ DON'T: Use raw SQL queries (use Prisma's type-safe API)
❌ DON'T: Expose Prisma errors directly to client
❌ DON'T: Forget to handle constraint violations
```

---

### 7. Security Rules 🔒

#### Authentication & Authorization

```typescript
✅ DO: Always validate JWT tokens server-side
✅ DO: Use HttpOnly cookies for tokens (not localStorage)
✅ DO: Implement refresh token rotation
✅ DO: Set appropriate token expiration times
✅ DO: Hash passwords with bcrypt (12+ rounds)
✅ DO: Implement rate limiting on auth endpoints
✅ DO: Lock accounts after failed login attempts
✅ DO: Log all authentication events

❌ DON'T: Store passwords in plain text
❌ DON'T: Store tokens in localStorage (XSS risk)
❌ DON'T: Send tokens in URL parameters
❌ DON'T: Use weak JWT secrets (min 32 characters)
❌ DON'T: Trust client-side validation only
```

#### Input Validation & Sanitization

```typescript
// ✅ DO: Validate on both client AND server
import { z } from 'zod';

const userSchema = z.object({
  username: z.string()
    .min(3)
    .max(20)
    .regex(/^[a-z0-9._]+$/), // Only allowed characters
  email: z.string().email(),
  password: z.string().min(8),
});

// ✅ DO: Sanitize user input before display
function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, ''); // Basic XSS prevention
}

❌ DON'T: Trust ANY user input
❌ DON'T: Use eval() or similar dangerous functions
❌ DON'T: Render user input as raw HTML
```

#### CSRF & Security Headers

```typescript
// ✅ DO: Use CSRF tokens for OAuth (state parameter)
const state = crypto.randomUUID();
// Store state in session/cookie, validate on callback

// ✅ DO: Set secure cookie attributes
response.cookies.set('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 900, // 15 minutes
});

// ✅ DO: Implement Content Security Policy
// (Set in next.config.ts or middleware)
```

#### Sensitive Data Handling

```typescript
✅ DO: Store secrets in environment variables
✅ DO: Never commit .env files to git
✅ DO: Encrypt sensitive data at rest
✅ DO: Use HTTPS in production

❌ DON'T: Log passwords, tokens, or sensitive data
❌ DON'T: Return sensitive data in API responses
❌ DON'T: Store API keys in code
```

---

### 8. Styling Rules 🎨

#### Tailwind CSS Conventions

```typescript
// ✅ DO: Use Tailwind utility classes
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ✅ DO: Use custom CSS variables for brand colors
<div className="bg-[var(--spsd-navy)] text-white">

// ✅ DO: Group related classes logically
<button className="
  px-4 py-2                    // Spacing
  bg-blue-600 hover:bg-blue-700 // Colors
  text-white font-semibold      // Typography
  rounded-lg shadow-md          // Visual effects
  transition-colors duration-200 // Animations
">

// ✅ DO: Use responsive modifiers
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

❌ DON'T: Use inline styles (except for dynamic values)
❌ DON'T: Create custom CSS classes unless necessary
❌ DON'T: Mix Tailwind with traditional CSS modules
```

#### Theme Implementation

```typescript
// ✅ DO: Check theme context for conditional styling
const { theme, classicMode } = usePreferences();

if (theme === 'classic') {
  return (
    <div className={classicMode === 'light'
      ? 'bg-white text-gray-900'
      : 'bg-slate-900 text-white'
    }>
  );
}

// ✅ DO: Use CSS variables for theme colors
:root {
  --spsd-navy: #002b4e;
  --spsd-red: #c81e1c;
  --spsd-orange: #e95d41;
}

// ✅ DO: Provide both classic and modern variants
{theme === 'modern' ? <ModernHero /> : <ClassicHero />}
```

#### Responsive Design

```typescript
✅ DO: Mobile-first approach (default styles for mobile)
✅ DO: Use Tailwind breakpoints (sm, md, lg, xl, 2xl)
✅ DO: Test on actual devices, not just browser
✅ DO: Ensure touch targets are at least 44x44px

❌ DON'T: Use fixed widths (use responsive units)
❌ DON'T: Forget to test on mobile devices
❌ DON'T: Use hover effects as only interaction method
```

---

### 9. Documentation Rules 📚

#### Code Documentation

```typescript
/**
 * JSDoc for all exported functions
 *
 * @param {string} param - Description
 * @returns {Promise<Type>} Description
 * @throws {Error} When something fails
 */

// Inline comments for complex logic
// Why: Explain the reason, not the what
```

#### README Files

```
✅ DO: Create README.md for complex features
   - AUTH_README.md explains authentication system
   - Each major feature should have documentation

✅ DO: Include:
   - Overview of the feature
   - Architecture diagrams
   - Usage examples
   - API documentation
   - Setup instructions
   - Common issues & solutions
```

#### File Headers

```typescript
/**
 * Feature Name - Brief Description
 *
 * Longer explanation of what this file does,
 * why it exists, and how it fits into the system.
 *
 * @module lib/auth/jwt
 */
```

---

### 10. Testing Rules (Future) 🧪

#### Testing Strategy (To Be Implemented)

```typescript
// Unit tests for utilities
describe('generatePassword', () => {
  it('should generate a password of specified length', () => {
    const password = generatePassword(16);
    expect(password).toHaveLength(16);
  });
});

// Integration tests for API routes
describe('POST /api/auth/login', () => {
  it('should return 401 for invalid credentials', async () => {
    const response = await POST({ ... });
    expect(response.status).toBe(401);
  });
});

// E2E tests for critical flows
describe('Authentication Flow', () => {
  it('should allow user to login with Microsoft', async () => {
    // Test full OAuth flow
  });
});
```

#### Testing Rules (When Implemented)

```
✅ DO: Write tests for all utilities
✅ DO: Test API routes with different inputs
✅ DO: Test error handling paths
✅ DO: Maintain >80% code coverage
✅ DO: Mock external dependencies

❌ DON'T: Test implementation details
❌ DON'T: Write brittle tests
❌ DON'T: Skip error cases
```

---

### 11. Git & Version Control Rules 🔀

#### Commit Messages

```bash
# ✅ Good commit messages
feat: Implement Coming Soon component and Dashboard Sidebar
fix: Resolve theme switching bug in Dynamic Island
refactor: Extract search logic into custom hook
docs: Update authentication setup guide
style: Format code with Prettier
test: Add unit tests for password generator

# ❌ Bad commit messages
update
fix bug
changes
wip
```

#### Commit Format

```
<type>: <description>

[optional body]

[optional footer]
```

**Types**:
- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring (no behavior change)
- `style` - Code formatting, no logic change
- `docs` - Documentation only
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

#### Branching Strategy

```bash
main              # Production-ready code
└── feature/*     # New features
└── fix/*         # Bug fixes
└── refactor/*    # Refactoring work

# ✅ Good branch names
feature/dashboard-grades
fix/auth-token-expiry
refactor/search-engine

# ❌ Bad branch names
dev
test
my-branch
```

#### Pull Request Rules

```
✅ DO: Write descriptive PR titles and descriptions
✅ DO: Reference related issues
✅ DO: Request code review before merging
✅ DO: Ensure tests pass (when implemented)
✅ DO: Update documentation if needed

❌ DON'T: Push directly to main (use PRs)
❌ DON'T: Merge without review
❌ DON'T: Include unrelated changes
```

---

### 12. Performance Rules ⚡

#### Optimization Guidelines

```typescript
// ✅ DO: Use Next.js Image component for images
import Image from 'next/image';
<Image src="/logo.png" width={200} height={50} alt="Logo" />

// ✅ DO: Lazy load heavy components
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Spinner />
});

// ✅ DO: Memoize expensive calculations
const expensiveResult = useMemo(() => {
  return performExpensiveCalculation(data);
}, [data]);

// ✅ DO: Use useCallback for event handlers passed as props
const handleClick = useCallback(() => {
  // Handle click
}, [dependencies]);

❌ DON'T: Import entire libraries (use tree-shaking)
import _ from 'lodash'; // ❌ Imports everything
import { debounce } from 'lodash'; // ✅ Imports only debounce

❌ DON'T: Fetch data in loops
❌ DON'T: Create functions inside render
❌ DON'T: Use inline object/array literals in JSX
```

---

### 13. Accessibility Rules ♿

```typescript
✅ DO: Use semantic HTML
<button>, <nav>, <main>, <article>, <header>, <footer>

✅ DO: Add ARIA labels when necessary
<button aria-label="Close modal" onClick={onClose}>
  <X />
</button>

✅ DO: Ensure keyboard navigation works
<div role="button" tabIndex={0} onKeyDown={handleKeyDown}>

✅ DO: Provide alt text for images
<img src="/logo.png" alt="SPŠD IT Program Logo" />

✅ DO: Maintain color contrast ratios (WCAG AA minimum)

❌ DON'T: Use divs for buttons
❌ DON'T: Rely solely on color to convey information
❌ DON'T: Disable keyboard navigation
❌ DON'T: Skip heading levels (h1 → h3 is bad, use h1 → h2 → h3)
```

---

## Rule Enforcement Checklist

Before committing code, verify:

- [ ] TypeScript compiles without errors (`npm run build`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Code follows naming conventions
- [ ] Components are properly typed
- [ ] API routes validate input with Zod
- [ ] Security best practices followed
- [ ] Responsive design implemented
- [ ] Theme variants work correctly
- [ ] Comments explain complex logic
- [ ] No console.logs left in production code
- [ ] Sensitive data not exposed
- [ ] Error handling implemented

---

## When to Break the Rules

Rules can be broken when:
1. Performance absolutely requires it (document why)
2. External library constraints force different patterns
3. Temporary workaround for urgent bug (add TODO comment)
4. Prototyping/experimentation (mark clearly, refactor before merge)

**Always document why you're breaking a rule.**

---

## Current State

### Build Status
- **Development**: ✅ Running
- **Build**: ✅ Passing
- **Deployment**: ⚠️ Not configured yet

### Git Status
- **Current Branch**: `main`
- **Last Commit**: `f44b154` - "feat: Implement Coming Soon component and Dashboard Sidebar"
- **Uncommitted Changes**: None (clean working tree)

### Database
- **Schema**: ✅ Defined in Prisma
- **Migration**: ⚠️ Needs to be run
- **Connection**: ⚠️ Requires environment setup

---

## Features Implemented

### 1. Authentication System ✅

**Status**: Fully implemented, needs testing

**Components**:
- Microsoft OAuth 2.0 integration
- Password-based login (after OAuth)
- Automatic password generation
- JWT access & refresh tokens
- Session management
- Rate limiting & account lockout
- Audit logging
- Password reset flow

**Files**:
- `src/app/api/auth/microsoft/route.ts` - OAuth initiation
- `src/app/api/auth/callback/route.ts` - OAuth callback handler
- `src/app/api/auth/login/route.ts` - Password login
- `src/app/api/auth/logout/route.ts` - Logout handler
- `src/app/api/auth/change-password/route.ts` - Password change
- `src/lib/auth/microsoft-oauth.ts` - OAuth configuration
- `src/lib/auth/jwt.ts` - Token management
- `src/components/auth/PasswordPopup.tsx` - Password display popup
- `src/components/auth/ForgotPasswordModal.tsx` - Password reset UI

**Documentation**: See `AUTH_README.md` and `SETUP.md`

### 2. Theme System ✅

**Status**: Fully functional

**Features**:
- **Classic Theme**: Traditional, clean design with light/dark modes
  - Light mode: White background, SPŠD navy/red colors
  - Dark mode: Dark slate background, professional styling
- **Modern Theme**: Futuristic, animated, glassmorphic design
  - Particle effects, gradient overlays
  - Advanced animations with Framer Motion

**Implementation**:
- Theme switching via Dynamic Island
- Context-based state management
- Per-component theme variants
- Smooth transitions between themes

**Files**:
- `src/lib/theme/ThemeConfig.ts` - Theme definitions
- `src/lib/theme/useTheme.ts` - Theme hook
- `src/contexts/PreferencesContext.tsx` - User preferences

### 3. Internationalization (i18n) ✅

**Status**: Fully implemented

**Supported Languages**:
- 🇨🇿 Czech (CS) - Primary
- 🇬🇧 English (EN)
- 🇸🇰 Slovak (SK)
- 🇷🇺 Russian (RU)
- 🇺🇦 Ukrainian (UK)

**Implementation**:
- JSON-based translation files in `public/locales/`
- Context API for language switching
- Language selector in Dynamic Island

**Files**:
- `public/locales/cs.json` - Czech translations (651 keys)
- `public/locales/en.json` - English translations (651 keys)
- `public/locales/sk.json`, `ru.json`, `uk.json` - Other languages
- `src/contexts/LanguageContext.tsx` - Language provider

### 4. Navigation System ✅

**Status**: Fully functional

**Features**:
- **Dynamic Island** (iOS-inspired)
  - Compact mode (default)
  - Expanded mode (with menu)
  - Search mode
  - Theme switcher
  - Language selector
  - Smooth animations
- **Mobile Navigation**
  - Burger menu for small screens
  - Responsive mobile navbar
  - Touch-optimized

**Files**:
- `src/components/layout/DynamicIsland.tsx` - Main component
- `src/components/layout/dynamic-island/CompactMode.tsx`
- `src/components/layout/dynamic-island/ExpandedMode.tsx`
- `src/components/layout/dynamic-island/SearchMode.tsx`
- `src/components/layout/dynamic-island/ThemeMode.tsx`
- `src/components/layout/dynamic-island/LanguageMode.tsx`
- `src/components/layout/MobileBurgerMenu.tsx`

### 5. Search System ✅

**Status**: Implemented, needs content indexing

**Features**:
- Full-text search engine
- Category filtering
- Result highlighting
- Search history
- Multi-language support

**Files**:
- `src/lib/search/searchEngine.ts` - Search logic (440 lines)
- `src/components/search/SearchBar.tsx`
- `src/components/search/SearchFilters.tsx`
- `src/components/search/SearchResults.tsx`
- `src/app/search/page.tsx` - Search results page

### 6. Public Pages ✅

**Status**: Content complete

**Pages**:
- **Home** (`/`) - Landing page with hero, timeline, CTA
- **Curriculum** (`/curriculum`) - Study program details with table
- **About** (`/about`) - School information
- **Projects** (`/projects`) - Student projects showcase
- **Privacy Policy** (`/privacy`) - GDPR compliance
- **Terms of Service** (`/terms`) - Legal terms
- **Search** (`/search`) - Search interface
- **404 Not Found** - Custom error page

### 7. Dashboard System ✅

**Status**: Core structure complete, data integration pending

**Main Dashboard** (`/dashboard`) ✅:
- Welcome message
- Quick stats cards
- Recent activity feed
- Navigation to sub-sections

**Sidebar Navigation** ✅:
- Collapsible sections (Bakaláři, Moodle)
- Nested navigation with sub-items
- Active state highlighting
- Theme-aware styling
- Smooth expand/collapse animations

**Bakaláři Integration** ✅:
- **Structure**: Complete modular system
- **Pages Created**:
  - `/dashboard/bakalari/grades` - Grade overview with filters
  - `/dashboard/bakalari/schedule` - Weekly schedule display
  - `/dashboard/bakalari/tasks` - Homework and assignments
  - `/dashboard/bakalari/communication` - Teacher messaging
  - `/dashboard/bakalari/attendance` - Absence tracking
  - `/dashboard/bakalari/payments` - School fees
- **API Client**: Full-featured Bakaláři client (400+ lines)
- **Type System**: Complete type definitions (500+ lines)
- **API Routes**: Template structure in `/api/bakalari/`
- **Status**: UI complete, API integration pending credentials

**Moodle Integration** ⚠️:
- **Structure**: Route structure created
- **Type System**: Complete type definitions (400+ lines)
- **Status**: Pages to be implemented (similar to Bakaláři)

**Components**:
- `src/app/dashboard/layout.tsx` - Dashboard layout with sidebar
- `src/app/dashboard/page.tsx` - Main dashboard page
- `src/components/dashboard/DashboardSidebar.tsx` - Advanced navigation sidebar
- `src/components/dashboard/ComingSoon.tsx` - Placeholder component

### 8. Database Schema ✅

**Status**: Schema defined, needs migration

**Models**:
- **User** - Student/teacher accounts
  - Microsoft OAuth data
  - Password hash
  - Security settings (lockout, failed attempts)
  - Role (STUDENT, TEACHER, ADMIN)
- **Session** - Active login sessions
  - Access/refresh tokens
  - Device information
- **AuditLog** - Security event logging
  - Login/logout events
  - Data access tracking
- **PasswordResetToken** - Password reset tokens (for future email-based reset)

**File**: `prisma/schema.prisma`

---

## Project Structure

```
spsd_ITweb/
├── prisma/
│   └── schema.prisma                 # Database schema
│
├── public/
│   └── locales/                      # Translation files
│       ├── cs.json
│       ├── en.json
│       ├── sk.json
│       ├── ru.json
│       └── uk.json
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/auth/                 # Auth API routes
│   │   │   ├── microsoft/route.ts
│   │   │   ├── callback/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── change-password/route.ts
│   │   ├── dashboard/                # Dashboard pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   ├── grades/page.tsx
│   │   │   ├── schedule/page.tsx
│   │   │   ├── bakalari/page.tsx
│   │   │   ├── moodle/page.tsx
│   │   │   └── communication/page.tsx
│   │   ├── login/page.tsx            # Login page
│   │   ├── about/page.tsx
│   │   ├── curriculum/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── search/page.tsx
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── not-found.tsx             # 404 page
│   │
│   ├── components/
│   │   ├── auth/                     # Auth components
│   │   │   ├── PasswordPopup.tsx
│   │   │   └── ForgotPasswordModal.tsx
│   │   ├── dashboard/                # Dashboard components
│   │   │   ├── DashboardSidebar.tsx
│   │   │   └── ComingSoon.tsx
│   │   ├── dialogs/
│   │   │   └── WelcomeDialog.tsx
│   │   ├── layout/                   # Layout components
│   │   │   ├── DynamicIsland.tsx
│   │   │   ├── dynamic-island/       # Island sub-components
│   │   │   ├── MobileNavbar.tsx
│   │   │   ├── MobileBurgerMenu.tsx
│   │   │   ├── ModernFooter.tsx
│   │   │   ├── ClassicFooter.tsx
│   │   │   └── ClientLayout.tsx
│   │   ├── search/                   # Search components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   └── SearchResults.tsx
│   │   ├── sections/                 # Page sections
│   │   │   ├── ModernHero.tsx
│   │   │   ├── ClassicHero.tsx
│   │   │   ├── ProgramTimeline.tsx
│   │   │   ├── CallToAction.tsx
│   │   │   └── ...
│   │   └── ui/                       # UI utilities
│   │       ├── ThemeTransition.tsx
│   │       └── UnifiedBackground.tsx
│   │
│   ├── contexts/                     # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── LanguageContext.tsx
│   │   ├── PreferencesContext.tsx
│   │   ├── SearchContext.tsx
│   │   └── CommandPaletteContext.tsx
│   │
│   ├── hooks/
│   │   └── useCommandPalette.ts
│   │
│   ├── lib/
│   │   ├── auth/                     # Auth utilities
│   │   │   ├── microsoft-oauth.ts
│   │   │   └── jwt.ts
│   │   ├── db/
│   │   │   └── prisma.ts             # Prisma client
│   │   ├── search/
│   │   │   └── searchEngine.ts
│   │   ├── theme/                    # Theme system
│   │   │   ├── ThemeConfig.ts
│   │   │   ├── useTheme.ts
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── email-parser.ts
│   │       └── password-generator.ts
│   │
│   └── types/
│       └── search.ts
│
├── .env.example                      # Environment template
├── AUTH_README.md                    # Auth documentation
├── SETUP.md                          # Setup guide
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── next.config.ts                    # Next.js config
├── tailwind.config.js                # Tailwind config (v4 - CSS-based)
└── project_status.md                 # This file
```

---

## Recent Changes

### Documentation Cleanup & .gitignore Update (2025-10-13)

**Title**: Cleaned Up Redundant Documentation and Updated .gitignore

**Changes**:
- **Removed 6 redundant/verbose documentation files**:
  - ❌ `AUTH_README.md` - Too detailed for current implementation state
  - ❌ `BAKALARI_CONNECTION_GUIDE.md` - Premature, feature not yet implemented
  - ❌ `DATABASE_SETUP.md` - Too verbose, info consolidated
  - ❌ `LOGIN_GUIDE.md` - Outdated, login API not implemented
  - ❌ `QUICK_START.md` - Redundant with README
  - ❌ `SETUP.md` - Redundant, overlapping content
- **Created Clean Documentation Structure**:
  - ✅ `README.md` - Single, concise entry point with essentials
  - ✅ `project_status.md` - Current status, changelog, detailed notes (kept)

**Rationale**:
- Too many docs create confusion
- Information was duplicated across multiple files
- Some guides were for unimplemented features
- Simplified to 2 essential files only

**Documentation Now**:
- `README.md` - Quick start, setup, commands, tech stack
- `project_status.md` - Project status, rules, architecture, changelog

**Updated .gitignore**:
- ✅ Organized into logical sections
- ✅ Added database file patterns (*.db, *.sql, *.dump)
- ✅ Added IDE/editor folders (.vscode/, .idea/, etc.)
- ✅ Added security files (*.key, *.pem, credentials.json)
- ✅ Added test scripts (test-login.sh)
- ✅ Added backup patterns (*.backup, *.bak, *.old)
- ✅ Better environment variable handling
- ✅ Temporary files and cache directories
- ✅ OS-specific files (.DS_Store, Thumbs.db)

**Files Removed**: 6
**Files Kept**: 2
**Files Updated**: 1 (.gitignore)

---

### Database Login Integration (2025-10-13)

**Title**: Integrated Login System with PostgreSQL Database

**Major Changes**:
- **Login API Fully Functional**:
  - `/api/auth/login` endpoint now verifies against database
  - Accepts both email and username for login
  - Uses bcrypt to verify passwords
  - Generates JWT tokens (access + refresh)
  - Stores sessions in database
- **AuthContext Updated**:
  - Removed mock authentication (`admin`/`admin`)
  - Now calls real API endpoint
  - Handles API errors properly
  - Stores user data in localStorage + context
- **Security Features**:
  - Password verification with bcrypt
  - Account lockout after 5 failed attempts (15 min)
  - Rate limiting (5 attempts per IP per 15 min)
  - Audit logging for all login attempts
  - JWT tokens in httpOnly cookies
  - Session management in database
- **Testing**:
  - Created test script (`test-login.sh`)
  - Verified all login scenarios work
  - Confirmed audit logs are created
  - Admin, student, and teacher logins tested

**Working Credentials**:
| Login | Password | Role |
|-------|----------|------|
| `admin@spsd.cz` or `admin` | `admin123` | ADMIN |
| `student@spsd.cz` or `student` | `admin123` | STUDENT |
| `teacher@spsd.cz` or `teacher` | `admin123` | TEACHER |

**Files Modified**:
- `src/app/api/auth/login/route.ts` - Updated to accept email or username
- `src/contexts/AuthContext.tsx` - Replaced mock auth with real API calls
- `QUICK_START.md` - Updated with working credentials
- `LOGIN_GUIDE.md` - Created comprehensive login documentation

**Files Added**:
- `LOGIN_GUIDE.md` - Complete login system documentation
- `test-login.sh` - API testing script

**Testing Results**: ✅ All tests passing
- Admin login with email: ✅
- Admin login with username: ✅
- Student login: ✅
- Wrong password rejection: ✅
- Non-existent user rejection: ✅
- Audit logs created: ✅

---

### Local Database Setup (2025-10-13)

**Title**: Complete Local PostgreSQL Database Configuration

**Major Changes**:
- **PostgreSQL Database Setup**:
  - Created `spsd_itweb` database locally
  - Ran initial Prisma migrations successfully
  - All 5 tables created (users, sessions, audit_logs, password_reset_tokens, migrations)
- **Environment Configuration**:
  - Created `.env` file with secure secrets
  - Generated JWT_SECRET, JWT_REFRESH_SECRET, and ENCRYPTION_KEY
  - Configured DATABASE_URL for local PostgreSQL
- **Database Seeding**:
  - Created `prisma/seed.ts` script
  - Added 3 test users (admin, student, teacher)
  - All users use password: `admin123` for local testing
  - Admin user has ADMIN role for Bakaláři testing interface access
- **NPM Scripts Added**:
  - `npm run db:migrate` - Run Prisma migrations
  - `npm run db:seed` - Seed database with test data
  - `npm run db:studio` - Open Prisma Studio GUI
  - `npm run db:reset` - Reset database completely
- **Documentation**:
  - Created `DATABASE_SETUP.md` with complete setup guide
  - Includes troubleshooting, commands, and next steps

**Test Users**:
| Email | Username | Password | Role |
|-------|----------|----------|------|
| admin@spsd.cz | admin | admin123 | ADMIN |
| student@spsd.cz | student | admin123 | STUDENT |
| teacher@spsd.cz | teacher | admin123 | TEACHER |

**Files Added**:
- `.env` - Environment variables (not in git)
- `prisma/seed.ts` - Database seeding script
- `prisma/migrations/20251013082807_init/` - Initial migration
- `DATABASE_SETUP.md` - Setup documentation

**Files Modified**:
- `package.json` - Added database management scripts and Prisma seed config

**Dependencies Installed**:
- `tsx` - TypeScript execution for seed script
- `@types/bcryptjs` - Type definitions for bcrypt

**Database Status**: ✅ Fully operational and seeded

---

### Admin-Only Testing Interface (2025-10-13)

**Title**: Implemented Admin-Only Access Control for Bakaláři Testing Interface

**Major Changes**:
- **Added Role-Based Access Control (RBAC)** to Bakaláři grades page
  - API route now checks for admin role before allowing access
  - Non-admin users receive 403 Forbidden response
  - Audit logging for unauthorized access attempts
- **Client-Side Access Control**:
  - Page checks user role from AuthContext
  - Access denied UI for non-admin users with informative message
  - Clear explanation that it's a testing interface
- **Visual Testing Interface Indicators**:
  - Prominent "Testing Interface" banner for admin users
  - "READ-ONLY" badge to emphasize no edit capabilities
  - Styled consistently with modern and classic themes
  - Shield icon and gradient backgrounds for visual distinction
- **Security Features**:
  - JWT token verification with role check
  - Database query to verify user role from source of truth
  - Unauthorized access attempts logged to audit_log table
  - IP address and user agent tracking for security monitoring

**Files Modified**:
- `src/app/api/bakalari/grades/route.ts` - Added admin role check with audit logging
- `src/app/dashboard/bakalari/grades/page.tsx` - Added access control UI and testing banner

**Lines Modified**: ~150
**Security Level**: Enhanced (Admin-only with audit logging)

---

### Latest Development Session (2025-10-13)

**Title**: Dashboard Restructure & Bakaláři Integration Base

**Major Changes**:
- **Restructured Dashboard Sidebar** with collapsible sections
  - Bakaláři section with 6 sub-items (Známky, Rozvrh, Úkoly, Komunikace, Docházka, Platby)
  - Moodle section with 5 sub-items (Kurzy, Úkoly, Kalendář, Zprávy, Notifikace)
  - Smooth expand/collapse animations
- **Created Complete Bakaláři Integration Base**:
  - Type definitions (`src/types/bakalari.ts` - 500+ lines)
  - API Client (`src/lib/bakalari/bakalari-client.ts` - 400+ lines)
  - 6 dashboard pages with filters and UI ready for data
  - API route structure (`src/app/api/bakalari/`)
  - Comprehensive documentation (`src/lib/bakalari/README.md`)
- **Created Moodle Type Definitions**:
  - Complete type system (`src/types/moodle.ts` - 400+ lines)
- **Updated ComingSoon Component**:
  - Added technical details support
  - Shows API endpoint, data source, estimated completion
- **Build**: ✅ All code compiles successfully

**Files Added**:
- `src/types/bakalari.ts`
- `src/types/moodle.ts`
- `src/lib/bakalari/bakalari-client.ts`
- `src/lib/bakalari/README.md`
- `src/app/dashboard/bakalari/grades/page.tsx`
- `src/app/dashboard/bakalari/schedule/page.tsx`
- `src/app/dashboard/bakalari/tasks/page.tsx`
- `src/app/dashboard/bakalari/communication/page.tsx`
- `src/app/dashboard/bakalari/attendance/page.tsx`
- `src/app/dashboard/bakalari/payments/page.tsx`
- `src/app/api/bakalari/grades/route.ts`

**Files Modified**:
- `src/components/dashboard/DashboardSidebar.tsx` - Complete rewrite with nested navigation
- `src/components/dashboard/ComingSoon.tsx` - Added technical details prop

**Lines Added**: ~2,500
**Lines Modified**: ~300

---

### Previous Commits

#### Commit: `f44b154`
**Date**: Recent
**Title**: feat: Implement Coming Soon component and Dashboard Sidebar

**Changes**:
- Added `ComingSoon` component for placeholder pages
- Implemented full Dashboard Sidebar with navigation
- Dashboard layout now includes proper routing

---

#### Commit: `2cee8e0`
**Title**: feat: add Privacy, Terms, and Projects pages with structured content and responsive design

**Changes**:
- Added Privacy Policy page (`/privacy`)
- Added Terms of Service page (`/terms`)
- Added Projects showcase page (`/projects`)
- All pages fully responsive and multilingual

---

#### Commit: `2bee465`
**Title**: Refactor ProgramTimeline component and update curriculum data

**Changes**:
- Refactored ProgramTimeline for better maintainability
- Updated curriculum data with latest course information
- Added curriculum table with 4-year breakdown

---

#### Commit: `ded685f` (Major refactor)
**Title**: refoldering from web to root

**Changes**:
- **MAJOR**: Moved all files from `web/` subdirectory to root
- Restructured project for cleaner organization
- Added authentication system (Microsoft OAuth + JWT)
- Added Prisma schema for database
- Added authentication documentation (AUTH_README.md, SETUP.md)
- Added 10,000+ lines of new code
- Implemented complete auth flow
- Added dashboard pages (placeholders)
- Enhanced translations (651 keys per language)

**Files Changed**: 96 files
**Lines Added**: ~10,000
**Lines Removed**: ~1,500

---

#### Commit: `b8db459`
**Title**: Refactor sections to support light and dark themes, update styles, and enhance responsiveness

**Changes**:
- Added classic dark/light theme support
- Refactored section components for theme compatibility
- Enhanced responsive design

---

### Key Milestones

1. **Initial Setup** (`f2dd8f9`) - Next.js, TypeScript, Tailwind
2. **Dynamic Navigation** (`29993d1`, `938b83f`, `3c87ff6`) - Implemented Dynamic Island
3. **Theme System** (`b8db459`) - Classic & Modern themes
4. **Major Refactor** (`ded685f`) - Auth system, database, restructure
5. **Content Pages** (`2cee8e0`) - Privacy, Terms, Projects
6. **Dashboard Start** (`f44b154`) - Dashboard sidebar & Coming Soon

---

## Pending Features & TODOs

### High Priority

#### 1. Microsoft OAuth Setup ⚠️
**Status**: Code implemented, Azure setup pending
**Action Required**: User will handle Azure AD app registration
**Notes**:
- Requires Microsoft 365 admin access
- Need to configure redirect URIs
- Generate client ID and secret
- See `SETUP.md` section 3 for instructions

#### 2. Database Setup & Migration ⚠️
**Status**: Schema defined, needs migration
**TODO**:
- [ ] Set up PostgreSQL database (local or cloud)
- [ ] Configure `DATABASE_URL` in `.env`
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Run `npx prisma generate`
- [ ] Test database connection

#### 3. Environment Variables 🔴
**Status**: Not configured
**TODO**:
- [ ] Copy `.env.example` to `.env`
- [ ] Generate JWT secrets: `openssl rand -base64 32`
- [ ] Generate encryption key: `openssl rand -hex 32`
- [ ] Add Microsoft OAuth credentials (after Azure setup)
- [ ] Add database URL
- [ ] Set `NEXT_PUBLIC_APP_URL`

**Required Variables**:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="postgresql://..."
JWT_SECRET="..."
JWT_REFRESH_SECRET="..."
MICROSOFT_CLIENT_ID="..."
MICROSOFT_CLIENT_SECRET="..."
MICROSOFT_TENANT_ID="..."
MICROSOFT_REDIRECT_URI="http://localhost:3000/api/auth/callback"
ENCRYPTION_KEY="..."
```

### Medium Priority

#### 4. Bakaláři Integration 🚧
**Status**: Foundation complete, needs credentials & data connection

**COMPLETED** ✅:
- [x] Type definitions for all Bakaláři data models
- [x] API Client with all methods
- [x] Dashboard pages with UI and filters
- [x] API route structure
- [x] Documentation (setup, usage, troubleshooting)
- [x] Sidebar navigation with sub-items

**TODO**:
- [ ] **API Configuration**
  - Set up Bakaláři API credentials
  - Add environment variables
  - Configure authentication strategy
- [ ] **Data Connection**
  - Store user Bakaláři credentials (encrypted)
  - Implement token refresh logic
  - Connect API routes to client
- [ ] **UI Implementation**
  - Replace ComingSoon with real data
  - Add loading states
  - Implement error handling
  - Add data refresh functionality
- [ ] **Features per Page**:
  - **Grades**: Display grades, averages, charts, export
  - **Schedule**: Weekly view, substitutions, export to calendar
  - **Tasks**: Assignment list, due dates, submission status
  - **Communication**: Message inbox, send messages, attachments
  - **Attendance**: Absence records, statistics, excuse requests
  - **Payments**: Payment list, status, history, instructions

#### 5. Moodle Integration 🔲
**Status**: Types defined, implementation pending

**COMPLETED** ✅:
- [x] Type definitions for Moodle data models
- [x] Sidebar structure with sub-items

**TODO**:
- [ ] Create Moodle API client (similar to Bakaláři)
- [ ] Create dashboard pages for:
  - Courses
  - Assignments
  - Calendar
  - Messages
  - Notifications
- [ ] Set up API routes
- [ ] Implement Moodle authentication
- [ ] Connect UI to data

#### 6. Dashboard Features 🚧
**Status**: Core pages remaining

**TODO**:
- [ ] **Profile Page** (`/dashboard/profile`)
  - User information display
  - Password change form
  - Settings management
  - Avatar upload
  - Bakaláři account connection
  - Moodle account connection

#### 7. Search Indexing 🔍
**Status**: Engine implemented, needs content

**TODO**:
- [ ] Index all public pages
- [ ] Index curriculum data
- [ ] Index project data
- [ ] Add search suggestions
- [ ] Implement search analytics

#### 8. Responsive Testing 📱
**Status**: Designed responsive, needs testing

**TODO**:
- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test on tablets
- [ ] Test Dynamic Island on mobile
- [ ] Test dashboard on mobile
- [ ] Fix any mobile-specific issues

### Low Priority

#### 9. Performance Optimization ⚡
**TODO**:
- [ ] Implement image optimization
- [ ] Add lazy loading for components
- [ ] Optimize bundle size
- [ ] Add caching strategies
- [ ] Implement service worker

#### 10. Testing 🧪
**TODO**:
- [ ] Set up Jest/Testing Library
- [ ] Write unit tests for utilities
- [ ] Write integration tests for auth
- [ ] E2E tests with Playwright/Cypress
- [ ] Test coverage > 80%

#### 11. Analytics & Monitoring 📊
**TODO**:
- [ ] Add Google Analytics / Plausible
- [ ] Implement error tracking (Sentry)
- [ ] Add performance monitoring
- [ ] User behavior analytics
- [ ] Dashboard usage metrics

#### 12. Documentation 📚
**TODO**:
- [ ] Add JSDoc comments to functions
- [ ] Create component documentation
- [ ] Add API documentation
- [ ] Create developer guide
- [ ] Add contribution guidelines

#### 13. Additional Features 💡
**TODO**:
- [ ] Command Palette (Cmd+K) - Context exists but not implemented
- [ ] Dark mode persistence
- [ ] Export data functionality
- [ ] Print-friendly views
- [ ] PWA support (offline mode)
- [ ] Push notifications
- [ ] Email notifications
- [ ] Two-factor authentication (2FA)
- [ ] Social sharing
- [ ] Student portfolios

---

## Known Issues

### Critical Issues 🔴
*None currently*

### Major Issues 🟠

1. **Environment Variables Not Set**
   - Application won't start without `.env` file
   - Need to configure all required variables
   - **Impact**: Cannot run application

2. **Database Not Connected**
   - Prisma client will fail without database
   - Need to run migrations
   - **Impact**: Auth and data features won't work

3. **Microsoft OAuth Not Configured**
   - Login will fail without Azure AD setup
   - **Impact**: Primary authentication method unavailable

### Minor Issues 🟡

1. **Tailwind CSS v4**
   - Using beta version (v4)
   - May have breaking changes on stable release
   - **Impact**: Minor, config in CSS instead of JS

2. **Search Index Empty**
   - Search works but has no content
   - **Impact**: Search feature unusable

3. **Bakaláři Integration Incomplete**
   - UI complete but no real data connection
   - Need API credentials and authentication
   - **Impact**: Dashboard shows placeholders only

4. **No Tests**
   - No automated testing setup
   - **Impact**: Harder to catch regressions

---

## Development Notes

### Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Set Up Environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Set Up Database**:
   ```bash
   # Make sure PostgreSQL is running
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Open Browser**:
   - Navigate to `http://localhost:3000`

### Development Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open database GUI
npx prisma generate  # Generate Prisma client
npx prisma migrate   # Run database migrations
```

### Code Style

- **TypeScript** - Strict mode enabled
- **ESLint** - Next.js recommended config
- **Prettier** - (Not configured yet, consider adding)
- **File Naming**:
  - Components: PascalCase (e.g., `DynamicIsland.tsx`)
  - Utils: camelCase (e.g., `searchEngine.ts`)
  - Routes: lowercase (e.g., `route.ts`)

### Best Practices

1. **Authentication**
   - Always validate JWT tokens server-side
   - Use `HttpOnly` cookies for tokens
   - Implement rate limiting
   - Log all auth events

2. **Database**
   - Use Prisma for all database access
   - Never expose sensitive data
   - Always validate input with Zod
   - Use transactions for multi-step operations

3. **UI/UX**
   - Support both themes (classic/modern)
   - Test responsive design
   - Ensure accessibility (a11y)
   - Add loading states

4. **Performance**
   - Use Next.js Image component
   - Implement code splitting
   - Lazy load heavy components
   - Optimize bundle size

### Useful Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion
- **Microsoft Graph API**: https://docs.microsoft.com/graph

### Project-Specific Notes

1. **Tailwind CSS v4**:
   - Config moved to CSS (`@import "tailwindcss";`)
   - Custom colors defined in CSS variables
   - PostCSS plugin: `@tailwindcss/postcss`

2. **SPŠD Color Scheme**:
   - Navy: `#002b4e` (primary)
   - Red: `#c81e1c` (secondary)
   - Orange: `#e95d41` (accent)

3. **Email Parsing**:
   - Supports `@sps-mot.dopravni.cz` and `@mot.sps-dopravni.cz`
   - Username extracted from email (before @)
   - Display name auto-generated

4. **Theme Architecture**:
   - Classic theme has light/dark variants
   - Modern theme has single variant
   - Theme preference saved in localStorage
   - Theme context provides `theme` and `classicMode`

---

## Changelog

### Version 0.1.0 (Current)

**Date**: October 2025

**Added**:
- Initial project setup with Next.js 15 + React 19
- Complete authentication system (Microsoft OAuth + JWT)
- Database schema with Prisma
- Theme system (Classic Light/Dark + Modern)
- Internationalization (5 languages)
- Dynamic Island navigation
- Search engine
- Public pages (Home, Curriculum, About, Projects, Privacy, Terms)
- Dashboard layout and sidebar
- Login page
- Password management UI
- Comprehensive documentation (AUTH_README.md, SETUP.md)

**Changed**:
- Project structure (moved from `web/` to root)

**TODO**:
- Environment setup
- Database migration
- Microsoft OAuth configuration
- Dashboard feature implementation
- Testing setup

---

## Future Roadmap

### Phase 1: MVP Launch (Current)
- ✅ Core UI/UX
- ✅ Authentication system
- ⚠️ Environment setup
- ⚠️ Database setup
- ⚠️ OAuth configuration
- 🔲 Basic dashboard

### Phase 2: Feature Complete
- 🔲 Full dashboard functionality
- 🔲 Bakaláři integration
- 🔲 Moodle integration
- 🔲 Grade tracking
- 🔲 Schedule viewing
- 🔲 Search indexing

### Phase 3: Enhancement
- 🔲 Mobile apps (React Native?)
- 🔲 Push notifications
- 🔲 Advanced analytics
- 🔲 Student portfolios
- 🔲 Teacher portal
- 🔲 Admin dashboard

### Phase 4: Scale
- 🔲 Performance optimization
- 🔲 CDN integration
- 🔲 Load balancing
- 🔲 Monitoring & alerts
- 🔲 Automated testing
- 🔲 CI/CD pipeline

---

## Notes for User

### What You Need to Do

1. **Microsoft OAuth Setup** ⚠️
   - You mentioned you'll implement OAuth on your own
   - Code is ready, just needs Azure AD configuration
   - Follow `SETUP.md` section 3 for step-by-step guide
   - You'll need admin access to your school's Microsoft 365

2. **Environment Variables** 🔴
   - **Critical**: Must set up `.env` before running
   - Use `.env.example` as template
   - Generate secrets with OpenSSL commands provided
   - Add your Microsoft OAuth credentials once you have them

3. **Database** ⚠️
   - Choose PostgreSQL provider (local, Supabase, Railway, etc.)
   - Run Prisma migrations
   - Test connection before proceeding

### What's Working Now

- ✅ All UI components and pages
- ✅ Theme switching
- ✅ Language switching
- ✅ Responsive design
- ✅ Navigation (including nested sidebar)
- ✅ Dashboard structure complete
- ✅ Bakaláři UI & type system
- ✅ Search UI (needs content)
- ✅ Auth code (needs config)

### What's Not Working Yet

- 🔴 Login (needs OAuth + database)
- 🔴 Bakaláři data connection (needs credentials)
- 🔴 Moodle integration (needs implementation)
- 🔴 Search results (needs indexing)
- 🔴 Profile page functionality

---

## Contact & Support

For questions or issues:
- **Repository**: Check git log and commit messages
- **Documentation**: See `AUTH_README.md` and `SETUP.md`
- **This File**: Update this status file as you make changes

---

**Legend**:
- ✅ Complete
- ⚠️ In Progress / Needs Action
- 🔴 Critical / Blocking
- 🟠 Important
- 🟡 Minor
- 🔲 Not Started
- 🚧 Under Construction
- 🔍 Needs Investigation
- 💡 Idea / Future Feature

---

*This file should be updated with every major change to track project progress.*
