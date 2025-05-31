import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const candidate = await prisma.candidate.findUnique({
      where: { id: params.id },
    });

    if (!candidate) {
      return NextResponse.json(
        { success: false, message: "Candidate not found" },
        { status: 404 }
      );
    }

    // Delete the photo file if it exists
    if (candidate.photo) {
      const photoPath = path.join(process.cwd(), "public", candidate.photo);
      try {
        await fs.unlink(photoPath);
      } catch (error) {
        console.error("Error deleting photo file:", error);
      }
    }

    // Delete the candidate from the database
    await prisma.candidate.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      { success: true, message: "Candidate deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting candidate:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete candidate" },
      { status: 500 }
    );
  }
} 