import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
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

// ----------------------------------------------------------------------
// GET HANDLER (single post, for edit-page prefill)
// ----------------------------------------------------------------------
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await checkAuth();
    if (!authed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid blog post id" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const post = await db.collection("blogs").findOne({ _id: new ObjectId(id) });

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

// ----------------------------------------------------------------------
// PUT HANDLER (UPDATE)
// ----------------------------------------------------------------------
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await checkAuth();
    if (!authed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid blog post id" },
        { status: 400 }
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Remove _id to avoid immutable field error in MongoDB
    const { _id, ...updateData } = body as Record<string, unknown>;

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const existingPost = await db.collection("blogs").findOne({
      _id: new ObjectId(id),
    });

    if (!existingPost) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    if (typeof updateData.slug === "string" && updateData.slug.trim()) {
      updateData.slug = slugify(updateData.slug);
    } else if (typeof updateData.title === "string") {
      updateData.slug = slugify(updateData.title);
    }

    if (typeof updateData.slug === "string" && updateData.slug !== existingPost.slug) {
      const duplicate = await db.collection("blogs").findOne({
        slug: updateData.slug,
        _id: { $ne: new ObjectId(id) },
      });
      if (duplicate) {
        return NextResponse.json(
          { success: false, error: "A blog post with this slug already exists" },
          { status: 400 }
        );
      }
    }

    if (
      updateData.status === "published" &&
      existingPost.status !== "published"
    ) {
      updateData.publishedAt = new Date();
    }

    updateData.updatedAt = new Date();

    const oldSlug = existingPost.slug;

    await db.collection("blogs").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    const newSlug = (updateData.slug as string) || oldSlug;

    revalidatePath("/");
    revalidatePath("/blog");
    if (oldSlug) revalidatePath(`/blog/${oldSlug}`);
    if (newSlug) revalidatePath(`/blog/${newSlug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// ----------------------------------------------------------------------
// DELETE HANDLER (REMOVE)
// ----------------------------------------------------------------------
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const authed = await checkAuth();
    if (!authed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid blog post id" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const postToDelete = await db.collection("blogs").findOne({
      _id: new ObjectId(id),
    });

    if (!postToDelete) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    if (postToDelete.featuredImage && ObjectId.isValid(postToDelete.featuredImage)) {
      try {
        await db.collection("images").deleteOne({
          _id: new ObjectId(postToDelete.featuredImage),
        });
      } catch (imgErr) {
        console.error("Failed to delete associated image:", imgErr);
      }
    }

    await db.collection("blogs").deleteOne({
      _id: new ObjectId(id),
    });

    revalidatePath("/");
    revalidatePath("/blog");
    if (postToDelete.slug) {
      revalidatePath(`/blog/${postToDelete.slug}`);
    }
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog post error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
