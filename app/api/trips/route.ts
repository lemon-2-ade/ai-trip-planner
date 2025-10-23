import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/firebase-auth";

const prisma = new PrismaClient();

// Middleware to verify the user is authenticated
async function getCurrentUser(request: Request) {
  // Get the Firebase ID token from the authorization header
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  try {
    const idToken = authHeader.split("Bearer ")[1];
    // In a real implementation, you would verify this token with Firebase
    // For now, we'll just extract the user ID from the request
    const userId = request.headers.get("user-id");

    if (!userId) {
      return null;
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}

// POST /api/trips - Create a new trip
export async function POST(request: Request) {
  try {
    // Authenticate user
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get trip details from request body
    const { tripDetails } = await request.json();

    // Create a new trip
    const trip = await prisma.trip.create({
      data: {
        userId: user.id,
        tripDetails,
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET /api/trips - Get all trips for a user
export async function GET(request: Request) {
  try {
    // Authenticate user
    const user = await getCurrentUser(request);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all trips for the user
    const trips = await prisma.trip.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(trips);
  } catch (error) {
    console.error("Error getting trips:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
