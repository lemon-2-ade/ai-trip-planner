import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// POST /api/auth/google
export async function POST(req: NextRequest) {
  try {
    const { name, email, providerId, imageUrl } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Update existing user with Google info if needed
      if (user.providerId !== providerId || user.providerType !== "google") {
        user = await prisma.user.update({
          where: { email },
          data: {
            providerId,
            providerType: "google",
            imageUrl: imageUrl || user.imageUrl,
            name: name || user.name,
            emailVerified: user.emailVerified || new Date(),
          },
        });
      }
    } else {
      // Create new user with Google info
      user = await prisma.user.create({
        data: {
          name,
          email,
          providerId,
          providerType: "google",
          imageUrl: imageUrl,
          emailVerified: new Date(),
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error with Google authentication:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
