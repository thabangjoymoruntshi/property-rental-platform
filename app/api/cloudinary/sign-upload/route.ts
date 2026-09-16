
import { NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const { paramsToSign } = await request.json();

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error("Cloudinary signing error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to prepare image upload.",
      },
      { status: 500 }
    );
  }
}
