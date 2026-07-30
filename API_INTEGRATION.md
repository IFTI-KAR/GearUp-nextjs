# GearUp - API Integration Documentation 🏋️

This document details the mapping between Next.js frontend pages/components and backend API endpoints consumed across the **GearUp** application.

---

## 1. Authentication & Role Session APIs

| Frontend Page / Component | Action / User Flow | Backend Endpoint | HTTP Method | Payload / Params |
|---------------------------|-------------------|------------------|-------------|------------------|
| `src/app/auth/login/page.tsx` | User Authentication & Quick-Login | `/api/auth/login` | `POST` | `{ email, role }` |
| `src/app/auth/register/page.tsx` | New User Registration | `/api/auth/register` | `POST` | `{ name, email, role, phone }` |
| `src/lib/auth-context.tsx` | Session Check | `/api/auth/me` | `GET` | Headers: `Authorization: Bearer <token>` |

---

## 2. Public Equipment Catalog & Search APIs

| Frontend Page / Component | Action / User Flow | Backend Endpoint | HTTP Method | Query Parameters |
|---------------------------|-------------------|------------------|-------------|------------------|
| `src/app/page.tsx` | Featured Equipment Grid | `/api/gear` | `GET` | `limit=6` |
| `src/app/gear/page.tsx` | Filtered Catalog Grid & Search | `/api/gear` | `GET` | `category`, `search`, `minPrice`, `maxPrice`, `availability` |
| `src/app/gear/[id]/page.tsx` | Equipment Detail, Specs & Reviews | `/api/gear/:id` | `GET` | `id` |

---

## 3. Customer Dashboard & Rental Order APIs

| Frontend Page / Component | Action / User Flow | Backend Endpoint | HTTP Method | Payload / Query |
|---------------------------|-------------------|------------------|-------------|------------------|
| `src/app/gear/[id]/page.tsx` | Place New Rental Request | `/api/rentals` | `POST` | `{ gearId, customerId, startDate, endDate }` |
| `src/app/dashboard/customer/page.tsx` | Customer Rental Orders List | `/api/rentals` | `GET` | `customerId=<user_id>` |
| `src/app/dashboard/customer/orders/[id]/pay/page.tsx` | Payment Checkout Initiation | `/api/payments/create` | `POST` | `{ orderId, gateway }` |
| `src/app/payment/success/page.tsx` | Payment Outcome & Order Status Update | `/api/rentals/:id` | `PATCH` | `{ status: 'PAID', paymentStatus: 'PAID', paymentId }` |
| `src/app/dashboard/customer/page.tsx` | Submit Returned Gear Review | `/api/reviews` | `POST` | `{ gearId, rentalId, rating, comment }` |

---

## 4. Provider Inventory & Order Fulfillment APIs

| Frontend Page / Component | Action / User Flow | Backend Endpoint | HTTP Method | Payload / Query |
|---------------------------|-------------------|------------------|-------------|------------------|
| `src/app/dashboard/provider/page.tsx` | Provider Equipment Inventory | `/api/gear` | `GET` | `providerId=<provider_id>` |
| `src/app/dashboard/provider/gear/new/page.tsx` | Add New Equipment Listing | `/api/gear` | `POST` | `{ title, category, pricePerDay, deposit, stock, location, images, description }` |
| `src/app/dashboard/provider/page.tsx` | Toggle Availability Switch | `/api/gear/:id` | `PATCH` | `{ availability: 'AVAILABLE' \| 'UNAVAILABLE' }` |
| `src/app/dashboard/provider/page.tsx` | Delete Equipment Listing | `/api/gear/:id` | `DELETE` | Path ID |
| `src/app/dashboard/provider/orders/page.tsx` | Incoming Orders List | `/api/rentals` | `GET` | `providerId=<provider_id>` |
| `src/app/dashboard/provider/orders/page.tsx` | Order Status Transitions (Confirm / Pick Up / Return) | `/api/rentals/:id` | `PATCH` | `{ status: 'CONFIRMED' \| 'PICKED_UP' \| 'RETURNED' }` |

---

## 5. Admin Moderation & User Management APIs

| Frontend Page / Component | Action / User Flow | Backend Endpoint | HTTP Method | Payload / Query |
|---------------------------|-------------------|------------------|-------------|------------------|
| `src/app/dashboard/admin/page.tsx` | User Management Table | `/api/admin/users` | `GET` | None |
| `src/app/dashboard/admin/page.tsx` | Suspend / Activate User Account | `/api/admin/users/:id` | `PATCH` | `{ status: 'ACTIVE' \| 'SUSPENDED' }` |
| `src/app/dashboard/admin/page.tsx` | Global Gear Listings Moderation | `/api/gear` | `GET` | None |
| `src/app/dashboard/admin/page.tsx` | Global Rental Orders Moderation | `/api/rentals` | `GET` | None |

---

## 6. Configurable External Backend Base URL

The application automatically connects to its built-in Next.js Route Handlers (`/api/*`). To connect to an external production backend service, configure the environment variable in `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.vercel.app/api
```
