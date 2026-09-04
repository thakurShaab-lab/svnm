import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - Get published blog posts (public)
export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get("category");

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const query: Record<string, unknown> = { status: "published" };
    if (category) query.category = category;

    const posts = await db
      .collection("blogs")
      .find(query)
      .sort({ publishedAt: -1 })
      .toArray();

    const postsWithUrls = posts.map((p) => ({
      ...p,
      imageUrl: p.featuredImage ? `/api/images/${p.featuredImage}` : null,
    }));

    return NextResponse.json({
      success: true,
      posts: postsWithUrls,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch blog posts",
      },
      { status: 500 }
    );
  }
}
