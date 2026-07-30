import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email address is required' },
        { status: 400 }
      );
    }

    let user = db.getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or user not found' },
        { status: 404 }
      );
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json(
        { success: false, error: 'Your account has been suspended by an administrator.' },
        { status: 403 }
      );
    }

    const token = `jwt_token_${user.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        token,
        user,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
