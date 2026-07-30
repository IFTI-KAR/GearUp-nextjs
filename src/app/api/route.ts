import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'GearUp Backend API Service is Active & Running',
    version: '1.0.0',
    documentation: 'https://github.com/IFTI-KAR/GearUp-nextjs/blob/main/API_INTEGRATION.md',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
      },
      gear: {
        list: 'GET /api/gear',
        detail: 'GET /api/gear/:id',
        create: 'POST /api/gear',
        update: 'PATCH /api/gear/:id',
        delete: 'DELETE /api/gear/:id',
      },
      rentals: {
        list: 'GET /api/rentals',
        detail: 'GET /api/rentals/:id',
        create: 'POST /api/rentals',
        updateStatus: 'PATCH /api/rentals/:id',
      },
      payments: {
        createCheckout: 'POST /api/payments/create',
      },
      admin: {
        users: 'GET /api/admin/users',
        updateUserStatus: 'PATCH /api/admin/users/:id',
      },
      reviews: {
        submit: 'POST /api/reviews',
      },
    },
  });
}
