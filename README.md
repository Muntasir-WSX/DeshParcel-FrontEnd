# DeshParcel Frontend

DeshParcel is a courier and logistics platform for booking shipments, tracking parcels, processing delivery payments, and managing operations across customer, rider, admin, and moderator workflows.

This repository contains the Next.js frontend for the DeshParcel platform. It consumes the DeshParcel backend API and provides responsive web interfaces for public visitors, authenticated customers, riders, and administrators.

## Live Links

- Frontend: `https://<your-frontend-domain>.vercel.app`
- Backend API: `https://desh-parcel-backend.vercel.app`
- Frontend repository: `https://github.com/Muntasir-WSX/DeshParcel-FrontEnd`
- Backend repository: `<add-backend-repository-url>`

Replace the placeholders before submitting the project.

## Core Features

### Public experience

- Landing page with courier service information
- About, services, pricing, coverage, and contact pages
- Parcel tracking by tracking ID
- Responsive navigation and mobile menu
- Rider registration flow

### Customer experience

- Customer registration and login
- One-click demo login option
- Profile viewing and profile image support
- Parcel creation with receiver, address, weight, category, and image details
- Customer parcel list and parcel cancellation
- Payment status and payment history
- bKash checkout
- SSLCommerz checkout
- Payment success, failure, and cancellation flows

### Rider experience

- Rider dashboard with delivery statistics
- Assigned parcel list
- Parcel status updates
- Earnings and delivery reports
- bKash cashout request flow

### Admin and moderator experience

- Dashboard statistics and revenue overview
- User management
- Rider approval and management
- Parcel management
- Payment and revenue monitoring
- Role-aware dashboard navigation

## User Roles

The application supports these operational roles:

- **Customer**: creates parcels, pays delivery charges, tracks shipments, and manages account activity.
- **Rider**: views assigned deliveries, updates parcel status, reviews earnings, and requests cashouts.
- **Admin**: manages users, riders, parcels, payments, and operational statistics.
- **Moderator**: uses the administrative workflow according to backend authorization rules.

## Technology Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Radix UI and shadcn-style components
- React Hook Form
- Zod
- TanStack Query
- Framer Motion
- Sonner notifications
- Lucide React icons
- Leaflet and React Leaflet
- Recharts
- bKash payment flow through the backend
- SSLCommerz payment flow through the backend
- Vercel deployment

## Project Structure

```text
src/
├── app/
│   ├── (auth)/                 # Login, registration, password recovery
│   ├── (public)/               # Public pages, parcel creation, tracking, payments
│   ├── dashboard/
│   │   ├── admin/              # Admin management pages
│   │   ├── rider/              # Rider delivery and earnings pages
│   │   └── user/               # Customer parcel and payment pages
│   ├── layout.tsx              # Root application layout
│   └── globals.css             # Global styles
├── components/
│   ├── Home/                   # Landing page sections
│   ├── providers/              # Application providers
│   ├── shared/                 # Navbar, footer, loaders, shared UI
│   └── ui/                     # Reusable interface components
├── lib/                        # Shared utilities
└── utils/                      # Error and application helpers
```

## Requirements

- Node.js 20 or newer
- npm
- A running DeshParcel backend or access to the deployed backend API

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Muntasir-WSX/DeshParcel-FrontEnd.git
cd DeshParcel-FrontEnd
npm install
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://desh-parcel-backend.vercel.app
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
GEMINI_API_KEY=your-gemini-api-key
```

`NEXT_PUBLIC_API_URL` must contain only the backend origin. Do not append `/api/v1`; the frontend adds the API path for each request.
`GEMINI_API_KEY` is used by the support assistant server route and must not use the `NEXT_PUBLIC_` prefix. If you previously configured `NEXT_PUBLIC_GEMINI_API_KEY`, rename it to `GEMINI_API_KEY` and restart the development server.

For local backend development, use:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Never commit `.env.local`, backend secrets, OAuth client secrets, database credentials, payment credentials, or private passwords. The repository ignores environment files by default.

## Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev       # Start the Next.js development server
npm run build     # Create a production build
npm run start     # Start the production server
npm run lint      # Run Biome checks
npm run format    # Format source files with Biome
```

## API Integration

The frontend communicates with the backend through these API groups:

```text
/api/v1/auth
/api/v1/users
/api/v1/parcels
/api/v1/rider
/api/v1/admin
/api/v1/payments
```

Authenticated requests use the JWT access token returned by the login endpoint. The token is stored in browser local storage for the current client-side authentication flow.

## Payment Flow

The payment process is:

1. A customer creates a parcel.
2. The frontend opens the parcel payment page.
3. The customer selects bKash or SSLCommerz.
4. The frontend calls the backend payment-initiation endpoint.
5. The backend returns the gateway URL.
6. The customer completes payment on the gateway.
7. The gateway calls the backend callback endpoint.
8. The backend verifies and updates payment status.
9. The customer is redirected to the frontend success, failed, or cancelled page.

Payment gateway credentials belong in the backend deployment environment, never in this frontend repository.

## Demo Access

The login page includes one-click demo buttons for the customer, rider, and admin roles.

For evaluation, use dedicated demo accounts configured in the backend database. Do not publish real personal passwords in this README or commit them to the repository.

```text
Demo admin email: <add-dedicated-demo-admin-email>
Demo admin password: <share-securely-with-evaluator>
Demo customer email: <add-dedicated-demo-customer-email>
Demo rider email: <add-dedicated-demo-rider-email>
```

Before submission, replace these placeholders with dedicated evaluation accounts or provide the credentials through the submission portal.

## Deployment

### Frontend deployment on Vercel

1. Import the frontend repository into Vercel.
2. Set the framework to Next.js.
3. Set the production environment variable:

   ```env
   NEXT_PUBLIC_API_URL=https://desh-parcel-backend.vercel.app
   ```

4. Deploy the production branch.
5. Test login, parcel creation, tracking, dashboards, and payment redirects on the deployed domain.

### Backend coordination

The backend must allow the deployed frontend origin through its CORS configuration. The backend payment callback should use the backend's production URL:

```text
https://desh-parcel-backend.vercel.app
```

After changing production environment variables, redeploy the affected Vercel project. Public `NEXT_PUBLIC_*` variables are embedded during the frontend build.

## Quality Checks

Run the production build before deployment:

```bash
npm run build
```

Also verify:

- The login request uses the deployed backend URL.
- All demo role buttons work.
- Dashboard navigation changes according to the logged-in role.
- Parcel creation reaches the payment page.
- Payment success and failure redirects use the deployed frontend URL.
- No secrets are present in the repository or browser bundle.

## Submission Checklist

- [ ] Add the final frontend Vercel URL above.
- [ ] Add the backend repository URL above.
- [ ] Configure dedicated demo accounts.
- [ ] Test all three demo login buttons.
- [ ] Run `npm run build` successfully.
- [ ] Confirm production API and CORS settings.
- [ ] Add the 5–10 minute walkthrough video link.
- [ ] Do not submit private credentials or environment secrets.

## Walkthrough Video

Add the final 5–10 minute project walkthrough link here:

`<add-video-link>`

The walkthrough should demonstrate:

1. Project overview and responsive UI
2. Customer, rider, and admin workflows
3. One-click demo login
4. API requests and loading states
5. Form validation and error handling
6. Parcel creation and payment flow

## License

This project is developed as an educational full-stack courier and logistics platform.
