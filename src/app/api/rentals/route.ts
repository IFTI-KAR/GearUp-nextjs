import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { RentalOrder } from '@/lib/types';
import { differenceInDays, parseISO } from 'date-fns';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customerId');
  const providerId = searchParams.get('providerId');

  let orders = db.getOrders();

  if (customerId) {
    orders = db.getOrdersByCustomer(customerId);
  } else if (providerId) {
    orders = db.getOrdersByProvider(providerId);
  }

  return NextResponse.json({
    success: true,
    data: orders,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gearId, customerId, customerName, customerEmail, startDate, endDate } = body;

    if (!gearId || !startDate || !endDate) {
      return NextResponse.json(
        { success: false, error: 'Gear item, start date, and end date are required' },
        { status: 400 }
      );
    }

    const gear = db.getGearById(gearId);
    if (!gear) {
      return NextResponse.json(
        { success: false, error: 'Gear item not found' },
        { status: 404 }
      );
    }

    const start = parseISO(startDate);
    const end = parseISO(endDate);
    const totalDays = Math.max(1, differenceInDays(end, start));
    const totalPrice = gear.pricePerDay * totalDays;

    const newOrder: RentalOrder = {
      id: `ord-${Date.now().toString().slice(-6)}`,
      gearId: gear.id,
      gearTitle: gear.title,
      gearImage: gear.images[0] || '',
      customerId: customerId || 'usr-customer-1',
      customerName: customerName || 'Alex Johnson',
      customerEmail: customerEmail || 'customer@gearup.com',
      providerId: gear.providerId,
      providerName: gear.providerName,
      startDate,
      endDate,
      totalDays,
      pricePerDay: gear.pricePerDay,
      totalPrice,
      status: 'PLACED',
      paymentStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.createOrder(newOrder);

    return NextResponse.json({
      success: true,
      data: newOrder,
      message: 'Rental order placed successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
