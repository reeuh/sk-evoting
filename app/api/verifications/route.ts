import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const requests = await prisma.user.findMany({
      where: {
        verificationStatus: {
          in: ['pending', 'verifying']
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        barangay: true,
        city: true,
        verificationStatus: true,
        verificationMessage: true,
        createdAt: true,
        // Add ID document fields when implemented
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ requests });
  } catch (error) {
    console.error('Error fetching verification requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch verification requests' },
      { status: 500 }
    );
  }
} 