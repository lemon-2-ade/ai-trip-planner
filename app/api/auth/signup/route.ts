import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import * as bcrypt from "bcrypt";

// POST /api/auth/signup
export async function POST(req: NextRequest) {
  try {
    const { name, email, password, providerId, providerType } =
      await req.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // For email/password auth, hash the password
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        providerId: providerId,
        providerType: providerType,
        emailVerified: providerType !== "email" ? new Date() : null,
      },
    });

    // Remove the password from the response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
