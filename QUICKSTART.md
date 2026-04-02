# Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
cd client-onboarding-portal
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 3. Login
- **Username:** `admin`
- **Password:** `password123`

## What You'll See

### Login Page (`/login`)
- Professional login interface with password toggle
- Mock authentication with hardcoded credentials
- Links to privacy and terms pages

### Dashboard (`/dashboard`)
- 11 statistics cards showing onboarding pipeline status
- Search functionality for clients
- Recent activity table with all clients
- "Start client onboarding" button

### Onboarding Flow (8 Steps)

1. **Client Detail** - PAN validation, DOB, assessment year
2. **Upload Forms** - 26AS, TIS, AIS document uploads
3. **TDS Summary** - Quarterly breakup and TDS records table
4. **Bank Details** - Bank statement upload and account summary
5. **Business Expenses** - Fixed and additional expense tracking
6. **Loan Details** - Multi-loan form with EMI calculations
7. **Loan Summary** - 12-month amortization schedule
8. **Submit** - Final checklist and submission confirmation

## Key Features to Try

✅ **Form Validation** - Try entering invalid PAN (must be: 5 letters, 4 digits, 1 letter)
✅ **Dynamic Forms** - Add multiple expenses or loans
✅ **File Upload** - Try uploading files (mock upload, files simulate being ready)
✅ **Sidebar Navigation** - Click between sections to navigate
✅ **State Persistence** - Refresh page and form data will remain
✅ **Password Protected Files** - Some uploads simulate password protection

## Useful Commands

```bash
# Development
npm run dev        # Start dev server

# Production
npm run build      # Build for production
npm run start      # Start production server

# Linting
npm run lint       # Run ESLint
```

## Project Statistics

- **8 Pages** (1 login + 1 dashboard + 8 onboarding steps)
- **15+ UI Components** (Button, Input, Card, Badge, FileUpload, etc.)
- **12 TypeScript Interfaces** (Client, Loan, TDS, etc.)
- **8 Validation Schemas** with Zod
- **4 Mock Clients** with different statuses
- **3 Mock Bank Accounts** with transaction history
- **3 Mock Loans** with full amortization schedules
- **Full TypeScript Strict Mode**
- **Responsive Design** (Desktop & Tablet)

## Architecture Highlights

### State Management
- React Context API for onboarding state
- sessionStorage persistence
- useOnboarding() hook for easy access

### Form Handling
- react-hook-form for efficient form management
- Zod for type-safe validation
- Field arrays for dynamic forms (loans, expenses)

### Styling
- Tailwind CSS with custom color palette
- Component-based architecture
- Responsive grid layouts

### Type Safety
- Full TypeScript strict mode
- Proper typing for all props and state
- Zod-validated form data

## Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Module not found errors?
```bash
rm -rf node_modules
npm install
```

### TypeScript errors?
```bash
npx tsc --noEmit
```

## Next Steps

1. Explore each page to understand the flow
2. Try the form validations
3. Play with sidebar navigation
4. Check browser console for any issues
5. Review the code structure in `/src`

Enjoy! 🎉
