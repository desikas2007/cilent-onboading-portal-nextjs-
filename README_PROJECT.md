# Client Onboarding Portal

A complete, fully functional Client Onboarding Portal web application built with Next.js, TypeScript, React Hook Form, and Tailwind CSS.

## Project Structure

```
client-onboarding-portal/
├── src/
│   ├── app/
│   │   ├── layout.tsx              - Root layout with OnboardingProvider
│   │   ├── page.tsx                - Redirects to /login
│   │   ├── login/
│   │   │   └── page.tsx            - Login page with mock auth
│   │   ├── dashboard/
│   │   │   └── page.tsx            - Dashboard with stats and client table
│   │   └── onboarding/
│   │       ├── layout.tsx          - Onboarding layout with sidebar
│   │       ├── page.tsx            - Redirects to step 1
│   │       ├── client-detail/      - Step 1: Client details form
│   │       ├── upload-forms/       - Step 2: Document uploads
│   │       ├── tds-summary/        - Step 3: TDS reconciliation
│   │       ├── bank-details/       - Step 4: Bank statement upload
│   │       ├── business-expenses/  - Step 5: Expense tracking
│   │       ├── loan-details/       - Step 6: Loan information
│   │       ├── loan-summary/       - Step 7: Amortization schedule
│   │       └── submit/             - Step 8: Final submission
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── FileUpload.tsx
│   │   │   └── ProgressStep.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── OnboardingLayout.tsx
│   │   ├── dashboard/
│   │   │   └── StatsCard.tsx
│   │   └── onboarding/
│   │       ├── SectionHeader.tsx
│   │       └── NavigationButtons.tsx
│   ├── context/
│   │   └── OnboardingContext.tsx    - Global state management
│   ├── hooks/
│   │   ├── useAuth.ts              - Authentication hook
│   │   └── useOnboarding.ts        - Onboarding state hook
│   ├── lib/
│   │   ├── validations.ts          - Zod validation schemas
│   │   ├── utils.ts                - Utility functions
│   │   └── mockData.ts             - Mock data for all pages
│   └── types/
│       └── index.ts                - All TypeScript interfaces
├── public/
├── tailwind.config.ts              - Tailwind configuration
└── tsconfig.json                   - TypeScript configuration
```

## Setup & Installation

### Prerequisites
- Node.js 18+ and npm

### Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd client-onboarding-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000`

## Authentication

### Mock Credentials
- **Username:** `admin`
- **Password:** `password123`

## Features

### Pages & Routes

| Route | Feature | Status |
|-------|---------|--------|
| `/login` | Authentication page with mock login | ✅ Complete |
| `/dashboard` | Stats overview and client table | ✅ Complete |
| `/onboarding/client-detail` | Step 1: Client info and PAN validation | ✅ Complete |
| `/onboarding/upload-forms` | Step 2: 26AS, TIS, AIS uploads | ✅ Complete |
| `/onboarding/tds-summary` | Step 3: TDS reconciliation tables | ✅ Complete |
| `/onboarding/bank-details` | Step 4: Bank statement processing | ✅ Complete |
| `/onboarding/business-expenses` | Step 5: Expense tracking | ✅ Complete |
| `/onboarding/loan-details` | Step 6: Loan information form | ✅ Complete |
| `/onboarding/loan-summary` | Step 7: Amortization schedule | ✅ Complete |
| `/onboarding/submit` | Step 8: Final checklist & submission | ✅ Complete |

### Key Features

✅ **Authentication Guard** - Protected routes requiring login
✅ **State Management** - Context API with sessionStorage persistence
✅ **Form Validation** - React Hook Form + Zod validation
✅ **Dynamic Forms** - Multi-step form with field arrays
✅ **File Upload** - Drag-and-drop file uploads with password protection detection
✅ **Data Tables** - Responsive tables with data from mock API
✅ **Responsive Design** - Works on desktop and tablet (1280px+)
✅ **Type Safety** - Full TypeScript strict mode enabled
✅ **Custom UI** - Tailwind-based components (Button, Input, Card, Badge)
✅ **Sidebar Navigation** - Step-by-step progression tracking
✅ **Mock Data** - Realistic sample data for all sections

## Form Validation

All forms use Zod schemas for validation:

```typescript
// PAN validation
panSchema: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/

// DOB validation
dateOfBirthSchema: Must be 18+ years old

// Loan amounts
Must be positive numbers

// Expense amounts
Must be non-negative
```

## Data Persistence

Form data is automatically saved to `sessionStorage` via the `OnboardingContext`:
- Data persists during browser session
- Clears on logout or final submission
- Manual save option on each page

## Build & Deployment

### Build for production:
```bash
npm run build
npm run start
```

### Lint code:
```bash
npm run lint
```

## Technology Stack

- **Framework:** Next.js 16
- **Language:** TypeScript 5
- **UI:** Tailwind CSS 4
- **Forms:** React Hook Form
- **Validation:** Zod
- **Icons:** lucide-react
- **Components:** Custom Tailwind components

## Color Scheme

The application uses a professional color palette:

```
Primary: #1a1a2e (Dark Gray)
Accent: #4f46e5 (Indigo)
Surface: #f8fafc (Light Gray)
Border: #e2e8f0 (Gray)
Muted: #94a3b8 (Slate)
```

## Mock Data

The application includes comprehensive mock data for:
- 4 sample clients with different statuses
- TDS records and quarterly breakdown
- 3 bank accounts with transactions
- 3 active loans with amortization schedule
- Dashboard statistics across all onboarding stages

All mock data is stored in `/src/lib/mockData.ts`

## Notes

- All data is stored in sessionStorage (frontend only)
- No backend API calls - pure frontend implementation
- Mock authentication allows any user to login as "admin"
- File uploads are simulated (files not actually stored)
- Calculations are estimates (as indicated in UI)

## Future Enhancements

- Backend API integration
- Real file storage
- Actual authentication
- Email notifications
- Document preview
- PDF export
- Advanced reporting

## License

MIT License - Feel free to use this project for personal or commercial purposes.
