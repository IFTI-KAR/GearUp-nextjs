import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    if (!status || (status !== 'ACTIVE' && status !== 'SUSPENDED')) {
      return NextResponse.json(
        { success: false, error: 'Valid status (ACTIVE or SUSPENDED) is required' },
        { status: 400 }
      );
    }

    const updated = db.updateUserStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updated,
      message: `User status changed to ${status}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
