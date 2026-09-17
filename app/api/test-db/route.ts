import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const databaseUrl = process.env.DATABASE_URL;

  let host = "missing";

  if (databaseUrl) {
    try {
      host = new URL(databaseUrl).hostname;
    } catch {
      host = "invalid-url";
    }
  }

  try {
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      success: true,
      databaseHost: host,
      message: "Database connection successful.",
    });
  } catch (error) {
    console.error("Database connection test failed:", error);

    return NextResponse.json(
      {
        success: false,
        databaseHost: host,
        message: "Database connection failed.",
      },
      { status: 500 }
    );
  }
}