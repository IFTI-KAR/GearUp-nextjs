# GearUp 🏋️ | Sports & Outdoor Equipment Rental Marketplace

GearUp is a full-stack Next.js and Express/Prisma marketplace enabling outdoor enthusiasts to rent high-end sports equipment (mountain bikes, camping gear, paddle boards, snowboards) from verified local providers.

---

## 📁 Repository Structure

```
.
├── gearup/             # Next.js 16 Frontend Application (App Router, Tailwind CSS, Recharts)
├── gearup-backend/     # Express + Prisma + PostgreSQL Backend API
└── README.md           # Project Documentation & Setup Guide
```

---

## 🚀 Quick Start Guide

### 1. Run Everything Concurrently (1-Command)
Navigate to the `gearup/` directory and run:

```bash
cd gearup
npm run dev:all
```
- **Frontend App**: `http://localhost:3000`
- **Backend API**: `http://localhost:5001/api`

---

### 2. Standalone Backend Startup
Navigate to `gearup-backend/` or `gearup/server/`:

```bash
cd gearup-backend
npm install
npx prisma generate
npm run dev
```

---

## 🔑 Demo Evaluation Credentials

Test all 3 role-based dashboards using 1-Click Quick Login or manual credentials:

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Customer** | `customer@gearup.com` | `Password123!` | Browse catalog, book rentals, view order history & leave reviews |
| **Provider** | `provider@gearup.com` | `Password123!` | Manage inventory, add gear, toggle availability & manage orders |
| **Admin** | `admin@gearup.com` | `Password123!` | Moderate users (suspend/activate), view financial analytics & categories |

---

## ✨ Features Implemented
- 🌗 **Light & Dark Theme System**: CSS variables with `localStorage` persistence and pre-hydration flash prevention.
- 📱 **Responsive Navigation Bar**: 5 public routes, role-based dashboard links, user profile dropdown, and theme toggle.
- 🏠 **8-Section Home Page**: Hero banner (65vh), categories grid, featured gear, how-it-works, statistics, testimonials, interactive FAQ accordion, and newsletter subscription.
- 📄 **Additional Pages**: About Us, Contact (Zod-validated form), Blog listing & details, Privacy Policy, Terms of Service.
- 📊 **Recharts Dashboards**: Financial revenue bar charts, role distribution pie chart, customer spending area chart, and paginated user moderation tables.
- 🔍 **Explore & Search Catalog**: Filtering by category, max daily rate slider, sorting, and pagination (6 items per page).
- ⭐ **Reviews & Recommendations**: Customer star reviews and related gear suggestions on detail page.
