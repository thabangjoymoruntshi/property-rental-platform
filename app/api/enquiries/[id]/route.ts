
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
    const enquiryId = Number(id);

    if (!Number.isInteger(enquiryId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry ID.",
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status } = body;

    if (
      status !== "NEW" &&
      status !== "IN_PROGRESS" &&
      status !== "COMPLETED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid enquiry status.",
        },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.update({
      where: {
        id: enquiryId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry status updated successfully.",
      enquiry,
    });
  } catch (error) {
    console.error("Enquiry status update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while updating the enquiry.",
      },
      { status: 500 }
    );
  }
}
