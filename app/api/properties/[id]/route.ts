
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const { id } = await params;
    const propertyId = Number(id);

    if (!Number.isInteger(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (status !== "APPROVED" && status !== "REJECTED") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property status.",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Property ${status.toLowerCase()} successfully.`,
      property,
    });
  } catch (error) {
    console.error("Property status update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while updating the property.",
      },
      { status: 500 }
    );
  }
}
