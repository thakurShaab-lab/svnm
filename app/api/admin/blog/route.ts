import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/slugify";

// Helper to authenticate Admin JWT
async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return false;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// GET - Get all blog posts, any status (admin only)
export async function GET() {
  try {
    const authed = await checkAuth();
    if (!authed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");
    const posts = await db
      .collection("blogs")
      .find({})
      .sort({ createdAt: -1 })
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
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// POST - Create a new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    const authed = await checkAuth();
    if (!authed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { title } = body as { title?: unknown };

    if (typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid required field: title" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const escapedTitle = title.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const existingTitle = await db.collection("blogs").findOne({
      title: { $regex: `^${escapedTitle}$`, $options: "i" },
    });
    if (existingTitle) {
      return NextResponse.json(
        { success: false, error: "Blog already exists..." },
        { status: 400 }
      );
    }

    const slug = typeof body.slug === "string" && body.slug.trim()
      ? slugify(body.slug)
      : slugify(title);

    const existing = await db.collection("blogs").findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A blog post with this slug already exists" },
        { status: 400 }
      );
    }

    const status = body.status === "published" ? "published" : "draft";
    const now = new Date();

    const rawCategory = typeof body.category === "string" ? body.category.trim() : "";
    const category = rawCategory
      ? rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase()
      : "";

    const post = {
      title,
      slug,
      excerpt: typeof body.excerpt === "string" ? body.excerpt : "",
      content: typeof body.content === "string" ? body.content : "",
      featuredImage: typeof body.featuredImage === "string" ? body.featuredImage : "",
      author: typeof body.author === "string" ? body.author : "",
      category,
      status,
      publishedAt: status === "published" ? now : null,
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection("blogs").insertOne(post);

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      success: true,
      postId: result.insertedId,
      message: "Blog post added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add blog post" },
      { status: 500 }
    );
  }
}
