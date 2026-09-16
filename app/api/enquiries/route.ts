import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      property,
      name,
      email,
      phone,
      interest,
      message,
    } = body;

    if (
      !property ||
      !name ||
      !email ||
      !phone ||
      !interest ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        property,
        name,
        email,
        phone,
        interest,
        message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted successfully.",
        enquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enquiry submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting the enquiry.",
      },
      { status: 500 }
    );
  }
}