
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcryptjs";
import { writeFile, mkdir } from "fs/promises";
import { join, basename } from "path";
import { existsSync } from "fs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract required fields
    const fields = [
      "firstName", "lastName", "email", "password", "phoneNumber", "birthDate",
      "address", "city", "province", "barangay", "idType", "role"
    ];

    const missingFields = fields.filter(key => !formData.get(key));
    const idFront = formData.get("idFront") as File;
    const idBack = formData.get("idBack") as File;

    if (missingFields.length > 0 || !idFront || !idBack) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Missing required fields: " + [
            ...missingFields,
            !idFront ? "idFront" : "",
            !idBack ? "idBack" : ""
          ].filter(Boolean).join(", ")
        },
        { status: 400 }
      );
    }

    const [firstName, lastName, email, password, phoneNumber, birthDate, address, city, province, barangay, idType, role] =
      fields.map(key => formData.get(key) as string);

    // Check if email exists
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
    if (age < 15 || age > 30) {
      return NextResponse.json(
        { success: false, message: "Age must be between 15 and 30 years old" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Ensure uploads directory exists
    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Sanitize filenames
    const safeFileName = (file: File, tag: string) =>
      `${Date.now()}_${tag}_${encodeURIComponent(file.name.replace(/\s+/g, "_"))}`;
    const idFrontName = safeFileName(idFront, "front");
    const idBackName = safeFileName(idBack, "back");
    const idFrontPath = join(uploadDir, idFrontName);
    const idBackPath = join(uploadDir, idBackName);

    // Save uploads
    await writeFile(idFrontPath, Buffer.from(await idFront.arrayBuffer()));
    await writeFile(idBackPath, Buffer.from(await idBack.arrayBuffer()));

    // Create user in db
    let user;
    try {
      user = await prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          email,
          hashedPassword,
          phoneNumber,
          birthDate: birthDateObj,
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
          idType,
          idFrontUrl: `/uploads/${idFrontName}`,
          idBackUrl: `/uploads/${idBackName}`,
        },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("Foreign key constraint failed") // Example, adjust to your generated Prisma error messages
      ) {
        return NextResponse.json(
          { success: false, message: "Role does not exist, ask admin to add this role first." },
          { status: 400 }
        );
      }
      throw error; // Otherwise, let it bubble up
    }

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
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}