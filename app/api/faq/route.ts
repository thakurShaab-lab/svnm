import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - Get active FAQs (public), sorted by display order
// Optional ?productSlug= or ?serviceSlug= scopes the results to that product/service only
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productSlug = searchParams.get("productSlug");
    const serviceSlug = searchParams.get("serviceSlug");

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const filter: Record<string, unknown> = { status: "active" };
    if (productSlug) filter.productSlug = productSlug;
    if (serviceSlug) filter.serviceSlug = serviceSlug;

    const faqs = await db
      .collection("faqs")
      .find(filter)
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      faqs,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch FAQs",
      },
      { status: 500 }
    );
  }
}
