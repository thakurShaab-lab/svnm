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
// PUT HANDLER (UPDATE SERVICE)
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
        { success: false, error: "Invalid service id" },
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

    // ❌ remove _id to avoid immutable field error
    const { _id, ...updateData } = body as Record<string, unknown>;

    if (typeof updateData.name === "string") {
      updateData.slug = slugify(updateData.name);
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const existingService = await db.collection("services").findOne({
      _id: new ObjectId(id),
    });

    if (!existingService) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 },
      );
    }

    const oldSlug = existingService.slug;

    await db.collection("services").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: updateData,
      },
    );

    const newSlug = updateData.slug as string;

    // Revalidate pages
    revalidatePath("/");
    revalidatePath("/services");

    if (oldSlug) {
      revalidatePath(`/services/${oldSlug}`);
    }

    if (newSlug) {
      revalidatePath(`/services/${newSlug}`);
    }

    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      success: true,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Error updating service:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update service",
      },
      {
        status: 500,
      },
    );
  }
}

// ----------------------------------------------------------------------
// DELETE HANDLER (REMOVE SERVICE)
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
        { success: false, error: "Invalid service id" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    // 2. Fetch target service before deletion to capture slug & image ID
    const serviceToDelete = await db.collection("services").findOne({
      _id: new ObjectId(id),
    });

    if (!serviceToDelete) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    // 3. Delete associated image from GridFS/Images collection if an image ID exists
    if (serviceToDelete.image) {
      try {
        if (ObjectId.isValid(serviceToDelete.image)) {
          await db.collection("images.files").deleteOne({
            _id: new ObjectId(serviceToDelete.image),
          });
          await db.collection("images.chunks").deleteMany({
            files_id: new ObjectId(serviceToDelete.image),
          });
        }
      } catch (imgErr) {
        console.error("Failed to delete associated service image:", imgErr);
      }
    }

    // 4. Delete service document from collection
    await db.collection("services").deleteOne({
      _id: new ObjectId(id),
    });

    // 5. Revalidate static routes and sitemaps
    revalidatePath("/");
    revalidatePath("/services");
    if (serviceToDelete.slug) {
      revalidatePath(`/services/${serviceToDelete.slug}`);
    }
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete service" },
      { status: 500 }
    );
  }
}