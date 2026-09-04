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
// PUT HANDLER (UPDATE)
// ----------------------------------------------------------------------
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const authed = await checkAuth();
    if (!authed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product id" },
        { status: 400 },
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 },
      );
    }

    // Remove _id to avoid immutable field error in MongoDB
    const { _id, ...updateData } = body as Record<string, unknown>;

    if (typeof updateData.name === "string") {
      updateData.slug = slugify(updateData.name);
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const existingProduct = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    const oldSlug = existingProduct.slug;

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData },
    );

    const newSlug = updateData.slug as string;

    // Revalidate affected cache paths
    revalidatePath("/");
    revalidatePath("/products");
    if (oldSlug) revalidatePath(`/products/${oldSlug}`);
    if (newSlug) revalidatePath(`/products/${newSlug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 },
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
    // 1. Authenticate Request
    const authed = await checkAuth();
    if (!authed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid product id" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    // 2. Fetch target product before deletion to get slug & image ID
    const productToDelete = await db.collection("products").findOne({
      _id: new ObjectId(id),
    });

    if (!productToDelete) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // 3. Delete associated image from storage if an image ID exists
    if (productToDelete.image) {
      try {
        if (ObjectId.isValid(productToDelete.image)) {
          await db.collection("images.files").deleteOne({
            _id: new ObjectId(productToDelete.image),
          });
          await db.collection("images.chunks").deleteMany({
            files_id: new ObjectId(productToDelete.image),
          });
        }
      } catch (imgErr) {
        console.error("Failed to delete associated image:", imgErr);
      }
    }

    // 4. Delete product document from collection
    await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    // 5. Revalidate static routes and sitemaps
    revalidatePath("/");
    revalidatePath("/products");
    if (productToDelete.slug) {
      revalidatePath(`/products/${productToDelete.slug}`);
    }
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}