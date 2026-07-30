import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { GearItem } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const providerId = searchParams.get('providerId') || undefined;
  const availability = searchParams.get('availability') || undefined;

  const items = db.getGear({
    category,
    search,
    minPrice,
    maxPrice,
    providerId,
    availability,
  });

  return NextResponse.json({
    success: true,
    data: items,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, pricePerDay, deposit, images, brand, specifications, location, stock, providerId, providerName, providerEmail } = body;

    if (!title || !category || !pricePerDay) {
      return NextResponse.json(
        { success: false, error: 'Title, category, and daily price are required' },
        { status: 400 }
      );
    }

    const newItem: GearItem = {
      id: `gear-${Date.now()}`,
      title,
      description: description || '',
      category,
      pricePerDay: Number(pricePerDay),
      deposit: Number(deposit || 0),
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80'],
      brand: brand || 'Generic',
      specifications: specifications || {},
      availability: 'AVAILABLE',
      stock: Number(stock || 1),
      location: location || 'Warehouse',
      rating: 5.0,
      reviewCount: 0,
      providerId: providerId || 'usr-provider-1',
      providerName: providerName || 'Mountain Peak Rentals',
      providerEmail: providerEmail || 'provider@gearup.com',
      createdAt: new Date().toISOString(),
    };

    db.createGear(newItem);

    return NextResponse.json({
      success: true,
      data: newItem,
      message: 'Gear listed successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
