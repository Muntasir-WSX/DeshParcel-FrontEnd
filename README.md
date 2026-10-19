# DeshParcel Frontend

DeshParcel is a modern courier and logistics platform for booking parcels, managing deliveries, tracking shipments, and processing online payments across Bangladesh.

This repository contains the frontend application for DeshParcel. It provides public marketing pages, customer workflows, rider operations, administrative dashboards, payment screens, and an AI-powered customer support assistant. The frontend communicates with the DeshParcel backend through a REST API.

## Contents

- [Product Overview](#product-overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Application Routes](#application-routes)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [How the Main Workflows Work](#how-the-main-workflows-work)
- [Backend API Integration](#backend-api-integration)
- [Running Checks](#running-checks)
- [Deployment](#deployment)
- [Security Notes](#security-notes)
- [Demo Access](#demo-access)
- [License](#license)

## Product Overview

DeshParcel connects customers, delivery riders, and administrators in one logistics platform:

1. Customers create a parcel with sender and receiver information.
2. The platform calculates the delivery charge and creates the parcel through the backend.
3. Customers pay through bKash or SSLCommerz.
4. Riders receive and manage assigned deliveries.
5. Customers and operations teams can monitor parcel status and delivery progress.
6. Administrators manage users, riders, parcels, payments, blogs, and newsletter subscribers.

The public website also explains DeshParcel's services, coverage, delivery pricing, policies, and business offerings.

## Features

### Public website

- Responsive landing page with hero, service, achievement, FAQ, testimonial, and blog sections
- About, services, pricing, coverage, contact, privacy, terms, and cookie pages
- Standard parcel, express delivery, cross-border, and corporate logistics pages
- Parcel tracking by tracking ID
- Rider registration flow
- Responsive navigation with mobile support
- Light and dark theme support
- Smooth scrolling and animated interactions
- Newsletter subscription interface
- Floating Anthony AI support assistant powered by Google Gemini

### Authentication and account management

- Customer registration and login
- Google authentication support
- Forgot-password flow
- Demo login buttons for supported roles
- JWT access-token-based authenticated requests
- Role-aware navigation and dashboard access
- Customer profile viewing and profile image support
- Client-side session state based on the authenticated user's role

### Customer features

- Create a parcel with:
  - Sender and receiver information
  - Delivery address
  - Parcel weight
  - Parcel category
  - Optional parcel image
- View personal parcels and delivery statuses
- Cancel eligible parcels
- Open payment for an unpaid parcel
- View payment history and payment status
- Complete bKash or SSLCommerz payments
- View payment success, failure, and cancellation results
- Track parcel progress through the public tracking page

### Rider features

- Rider dashboard with delivery statistics
- View assigned parcels
- Update parcel delivery status
- Review delivery activity
- View earnings and delivery reports
- Submit bKash cash-out requests

### Admin and operations features

- Overview dashboard with operational statistics and revenue information
- View and manage users
- Approve and manage riders
- View and manage parcels
- Monitor payments and revenue
- Manage blog posts
- Manage newsletter subscribers
- Role-aware dashboard navigation

### AI support assistant

Anthony is a floating customer support assistant available throughout the application. It can answer questions about:

- DeshParcel services
- Delivery coverage
- Dhaka and nationwide delivery charges
- Cash on delivery
- Parcel tracking
- General courier support

The assistant uses the server-side `/api/support` route, which keeps the Gemini API key out of browser requests.

## User Roles

| Role | Main capabilities |
| --- | --- |
| **Customer** | Create parcels, pay delivery charges, track shipments, view payment history, manage profile, and cancel eligible parcels |
| **Rider** | View assigned parcels, update delivery statuses, review earnings, and request cash-outs |
| **Admin** | Manage users, riders, parcels, payments, blogs, newsletter subscribers, and operational statistics |
| **Moderator** | Access the administrative workflow according to the permissions provided by the backend |

The backend remains the source of truth for authentication, authorization, parcel ownership, payment state, and operational permissions.

## Application Routes

### Public routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/About` | Company overview |
| `/Services` | Service overview |
| `/Services/standard-parcel` | Standard delivery |
| `/Services/express-delivery` | Express delivery |
| `/Services/cross-border` | Cross-border delivery |
| `/Services/corporate-logistics` | Corporate logistics |
| `/Pricing` | Delivery pricing |
| `/Coverage` | Coverage information |
| `/Track` | Parcel tracking |
| `/ContactUs` | Contact page |
| `/create-parcel` | Parcel creation |
| `/becomeRider` | Rider registration |
| `/blog/[id]` | Blog details |
| `/payment/[parcelId]` | Parcel payment |
| `/payment/success` | Successful payment result |
| `/payment/failed` | Failed payment result |
| `/payment/cancel` | Cancelled payment result |

### Authentication routes

| Route | Purpose |
| --- | --- |
| `/login` | Email/password and Google login |
| `/register` | Customer registration |
| `/ForgetPassword` | Password recovery |

### Dashboard routes

| Area | Routes |
| --- | --- |
| Customer | `/dashboard/user`, `/dashboard/user/payments` |
| Rider | `/dashboard/rider`, `/dashboard/rider/parcels`, `/dashboard/rider/earnings` |
| Admin | `/dashboard/admin`, `/dashboard/admin/users`, `/dashboard/admin/riders`, `/dashboard/admin/parcels`, `/dashboard/admin/payments`, `/dashboard/admin/blogs`, `/dashboard/admin/newsletter` |

### Internal AI route

| Route | Purpose |
| --- | --- |
| `/api/support` | Server-side Gemini support assistant endpoint |

## Technology Stack

- **Framework:** Next.js 16 App Router
- **UI:** React 19, TypeScript, Tailwind CSS
- **Components:** Radix UI, shadcn-style components, Lucide React
- **Forms and validation:** React Hook Form, TanStack Form, Zod, `@hookform/resolvers`
- **Data fetching:** TanStack Query, `ofetch`
- **Animation:** Framer Motion, Lenis smooth scrolling
- **Maps:** Leaflet, React Leaflet
- **Charts:** Recharts
- **Notifications:** Sonner
- **Authentication:** Backend JWT access tokens and Google OAuth
- **Payments:** bKash and SSLCommerz through the backend
- **AI support:** Google Gemini API through a Next.js server route
- **Deployment:** Vercel

## Project Structure

```text
src/
├── app/
│   ├── (auth)/                 # Login, registration, and password recovery
│   ├── (public)/               # Public pages, parcel creation, tracking, and payments
│   ├── api/
│   │   └── support/            # Server-side Gemini support route
│   ├── dashboard/
│   │   ├── admin/              # Administrative management pages
│   │   ├── rider/              # Rider delivery and earnings pages
│   │   └── user/               # Customer parcels and payments
│   ├── globals.css             # Global styles and theme styles
│   ├── layout.tsx              # Root layout and shared providers
│   └── middleware.ts           # Request middleware
├── components/
│   ├── Home/                   # Landing page sections
│   ├── logo/                   # Brand components
│   ├── providers/              # Theme, query, and smooth-scroll providers
│   ├── shared/                 # Navbar, footer, loaders, and AI assistant
│   └── ui/                     # Reusable UI primitives
├── lib/                        # Shared utilities
└── utils/                      # Error and application helpers
```

## Requirements

- Node.js 20 or newer
- npm
- A running DeshParcel backend, or access to the deployed backend API
- A Google OAuth client ID if Google login is enabled
- A Gemini API key if the AI support assistant is enabled

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Muntasir-WSX/DeshParcel-FrontEnd.git
cd DeshParcel-FrontEnd
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root using the variables described below.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Environment Variables

Example `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://desh-parcel-backend.vercel.app
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GEMINI_API_KEY=your-gemini-api-key
```

### Variable reference

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | Yes | Backend origin only, for example `https://desh-parcel-backend.vercel.app` |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | If Google login is enabled | Google OAuth client ID used by the browser |
| `GEMINI_API_KEY` | If AI support is enabled | Private Gemini API key used only by `/api/support` |

`NEXT_PUBLIC_API_URL` should not include `/api/v1`; the frontend adds the relevant API path when making requests.

Use this value when running the backend locally:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

The Gemini key must use `GEMINI_API_KEY`, not the `NEXT_PUBLIC_` prefix. If an older local setup contains `NEXT_PUBLIC_GEMINI_API_KEY`, rename it and restart the development server.

## How the Main Workflows Work

### Authentication

1. The user submits the login or registration form.
2. The frontend sends the request to the backend authentication API.
3. The backend returns an access token and user information.
4. The frontend stores the access token and role for the current client session.
5. Navigation and dashboard links are rendered according to the user's role.

### Parcel creation

1. An authenticated customer opens `/create-parcel`.
2. The customer enters sender, receiver, address, category, weight, and optional image information.
3. The frontend validates the form and submits it to the backend.
4. The backend creates the parcel and returns its identifier.
5. The customer is directed to the parcel payment page when payment is required.

### Payment

1. The customer selects bKash or SSLCommerz.
2. The frontend requests payment initialization from the backend.
3. The backend creates the payment session and returns a gateway URL.
4. The customer completes payment on the gateway.
5. The gateway calls the backend callback endpoint.
6. The backend verifies and updates the payment status.
7. The customer returns to the frontend success, failure, or cancellation page.

Payment credentials and callback secrets belong in the backend environment, not in this frontend repository.

### Parcel tracking

1. A user enters a parcel tracking ID on `/Track`.
2. The frontend requests the parcel status from the backend.
3. The current delivery state and available tracking information are displayed.

### AI support

1. The user opens Anthony from the floating support button.
2. The browser sends the message to `/api/support`.
3. The Next.js server route sends the request to Gemini using `GEMINI_API_KEY`.
4. The route returns the generated support response to the browser.

The API key is intentionally kept server-side and is never sent directly from the browser to Google.

## Backend API Integration

The frontend communicates with these backend API groups:

```text
/api/v1/auth
/api/v1/users
/api/v1/parcels
/api/v1/rider
/api/v1/admin
/api/v1/payments
```

Authenticated requests use the JWT access token returned by the login endpoint. The current client-side authentication flow stores the token in browser local storage under `accessToken` and stores the role under `userRole`.

The backend must:

- Accept requests from the deployed frontend origin through CORS
- Validate JWT tokens and role permissions
- Own all payment credentials and gateway callbacks
- Return response shapes expected by the frontend
- Provide the configured API routes above

## Available Scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run start     # Start the production server
npm run lint      # Run Biome lint checks
npm run lint:fix  # Apply Biome's safe and unsafe fixes
npm run format    # Format source files with Biome
```

## Running Checks

Before opening a pull request or deploying:

```bash
npm run lint
npm run build
```

Manually verify:

- Login, registration, Google login, and password recovery
- Role-specific dashboard navigation
- Customer parcel creation and cancellation
- Parcel tracking
- Rider parcel status updates
- Admin management screens
- bKash and SSLCommerz payment redirects
- Payment success, failure, and cancellation pages
- Anthony AI support responses
- Light/dark theme behavior and responsive layouts
- API, CORS, and environment variable configuration

## Deployment

### Deploy the frontend to Vercel

1. Import the repository into Vercel.
2. Select Next.js as the framework.
3. Configure the production environment variables:

   ```env
   NEXT_PUBLIC_API_URL=https://desh-parcel-backend.vercel.app
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
   GEMINI_API_KEY=your-gemini-api-key
   ```

4. Deploy the production branch.
5. Redeploy after changing environment variables.
6. Test authentication, parcel creation, tracking, dashboards, payments, and AI support on the deployed URL.

### Backend coordination

The backend must allow the production frontend origin in its CORS configuration. Payment callbacks should be handled by the backend production URL:

```text
https://desh-parcel-backend.vercel.app
```

Keep the frontend and backend environment configuration separate. Frontend public variables are embedded during the build, while private keys must remain server-side.

## Security Notes

- Never commit `.env.local`, API keys, OAuth secrets, payment credentials, database credentials, or passwords.
- Do not use `NEXT_PUBLIC_` for private secrets.
- Keep `GEMINI_API_KEY` server-only.
- Treat local-storage JWT authentication as a client-side implementation detail, not as a replacement for backend authorization.
- The backend must validate every token, role, parcel ownership check, and payment state.
- Rotate any API key that has accidentally been exposed in source code, logs, browser bundles, or public repositories.
- Configure production CORS to allow only trusted frontend origins.

## Demo Access

The login page includes one-click demo buttons for supported customer, rider, and admin roles.

Configure dedicated demo accounts in the backend database and provide credentials securely to reviewers. Do not publish real passwords in this README.

```text
Demo admin email: <configure-securely>
Demo admin password: <configure-securely>
Demo customer email: <configure-securely>
Demo customer password: <configure-securely>
Demo rider email: <configure-securely>
Demo rider password: <configure-securely>
```

## Project Links

- Frontend repository: https://github.com/Muntasir-WSX/DeshParcel-FrontEnd
- Frontend deployment: `<add-frontend-vercel-url>`
- Backend API: https://desh-parcel-backend.vercel.app
- Backend repository: `<add-backend-repository-url>`

## License

This project is developed as an educational full-stack courier and logistics platform.
