import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, gateway = 'STRIPE' } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const order = db.getOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      );
    }

    const paymentId = `pay-${Date.now().toString().slice(-6)}`;
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Construct simulated Stripe Checkout session redirect URL
    const successUrl = `${origin}/payment/success?order_id=${order.id}&payment_id=${paymentId}&gateway=${gateway}`;
    const cancelUrl = `${origin}/payment/cancel?order_id=${order.id}`;

    return NextResponse.json({
      success: true,
      data: {
        paymentId,
        checkoutUrl: successUrl, // Can redirect to checkoutUrl directly or success route for test demo
        cancelUrl,
        amount: order.totalPrice,
        currency: 'USD',
        orderId: order.id,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
