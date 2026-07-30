import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { User } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, phone } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and role are required' },
        { status: 400 }
      );
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: role || 'CUSTOMER',
      phone: phone || '',
      status: 'ACTIVE',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80`,
      createdAt: new Date().toISOString(),
    };

    db.createUser(newUser);
    const token = `jwt_token_${newUser.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      data: {
        token,
        user: newUser,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
