import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/auth/login
export async function POST(req: NextRequest) {
  try {
    const { firebaseUid, email } = await req.json();

    // Find the user
    const user = await prisma.user.findFirst({
      where: { providerId: firebaseUid },
    });

    // If user doesn't exist
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl || null,
    });
  } catch (error) {
    console.error("Error logging in:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
