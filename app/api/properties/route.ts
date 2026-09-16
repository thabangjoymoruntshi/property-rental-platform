import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

   const {
  title,
  location,
  propertyType,
  monthlyRent,
  bedrooms,
  description,
  contactName,
  contactEmail,
  imageUrl,
} = body;

    if (
      !title ||
      !location ||
      !propertyType ||
      !monthlyRent ||
      !bedrooms ||
      !description ||
      !contactName ||
      !contactEmail
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        title,
        location,
        propertyType,
        monthlyRent: Number(monthlyRent),
        bedrooms: Number(bedrooms),
        description,
        contactName,
        contactEmail,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Property submitted successfully.",
        property,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Property submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while submitting the property.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: "APPROVED",
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      properties,
    });
  } catch (error) {
    console.error("Property fetch error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while fetching properties.",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const id = Number(body.id);

    if (!id || Number.isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid property ID is required.",
        },
        { status: 400 }
      );
    }

    await prisma.property.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully.",
    });
  } catch (error) {
    console.error("Property deletion error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while deleting the property.",
      },
      { status: 500 }
    );
  }
}