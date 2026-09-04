import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// GET - Get a single published blog post by slug (public)
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const post = await db.collection("blogs").findOne({
      slug,
      status: "published",
    });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post: {
        ...post,
        imageUrl: post.featuredImage ? `/api/images/${post.featuredImage}` : null,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
