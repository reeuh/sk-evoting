import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Extract and validate required fields
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const birthDate = formData.get("birthDate") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const province = formData.get("province") as string;
    const barangay = formData.get("barangay") as string;
    const idType = formData.get("idType") as string;
    const role = formData.get("role") as string;
    const idFront = formData.get("idFront") as File;
    const idBack = formData.get("idBack") as File;

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !phoneNumber || 
        !birthDate || !address || !city || !province || !barangay || 
        !idType || !role || !idFront || !idBack) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already registered" },
        { status: 400 }
      );
    }

    // Calculate age
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }

    // Validate age
    if (age < 15 || age > 30) {
      return NextResponse.json(
        { success: false, message: "Age must be between 15 and 30 years old" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Save ID images
    const uploadDir = join(process.cwd(), "public", "uploads");
    const idFrontPath = join(uploadDir, `${Date.now()}_front_${idFront.name}`);
    const idBackPath = join(uploadDir, `${Date.now()}_back_${idBack.name}`);

    await writeFile(idFrontPath, Buffer.from(await idFront.arrayBuffer()));
    await writeFile(idBackPath, Buffer.from(await idBack.arrayBuffer()));

    // Create user
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        hashedPassword,
        phoneNumber,
        birthDate: new Date(birthDate),
        address,
        city,
        province,
        barangay,
        age,
        verified: false,
        hasVoted: false,
        verificationStatus: "pending",
        roles: {
          connect: {
            name: role,
          },
        },
        // Store ID document information
        idType,
        idFrontUrl: idFrontPath.replace(process.cwd(), ""),
        idBackUrl: idBackPath.replace(process.cwd(), ""),
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "An error occurred during registration",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 