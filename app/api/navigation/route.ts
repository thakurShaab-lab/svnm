import { NextResponse } from "next/server";
import { getNavigationData } from "@/components/navbar/navigation-data";

export async function GET() {
  try {
    const data = await getNavigationData();

    // Ensure valid JSON
    if (!data || typeof data !== "object") {
      return NextResponse.json({ mainNav: [] }, { status: 200 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Navigation API error:", err);
    // Return fallback JSON on error
    return NextResponse.json({ mainNav: [] }, { status: 500 });
  }
}
