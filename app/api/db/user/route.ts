import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Adjust this import based on your db setup

export async function GET(
  req: NextRequest
) {
  try {
    const firebaseUid = req.nextUrl.searchParams.get('firebaseUid');

    if (!firebaseUid) {
      return NextResponse.json(
        { error: 'Firebase UID is required' },
        { status: 400 }
      );
    }
    
    const user = await prisma.user.findFirst({
      where: {
        providerId: firebaseUid
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}