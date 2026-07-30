import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const item = db.getGearById(id);

  if (!item) {
    return NextResponse.json(
      { success: false, error: 'Gear item not found' },
      { status: 404 }
    );
  }

  const reviews = db.getReviewsByGear(id);

  return NextResponse.json({
    success: true,
    data: {
      ...item,
      reviews,
    },
  });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = db.updateGear(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Gear item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: 'Gear updated successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const deleted = db.deleteGear(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, error: 'Gear item not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Gear item deleted successfully',
  });
}
