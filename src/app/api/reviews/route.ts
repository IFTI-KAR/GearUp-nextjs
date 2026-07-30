import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { Review } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gearId, rentalId, customerId, customerName, rating, comment } = body;

    if (!gearId || !rating || !comment) {
      return NextResponse.json(
        { success: false, error: 'Gear ID, rating, and comment are required' },
        { status: 400 }
      );
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      gearId,
      rentalId: rentalId || 'ord-general',
      customerId: customerId || 'usr-customer-1',
      customerName: customerName || 'Alex Johnson',
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString(),
    };

    db.addReview(newReview);

    return NextResponse.json({
      success: true,
      data: newReview,
      message: 'Review submitted successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
