import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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
// GET HANDLER (single FAQ, for edit-page prefill)
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
        { success: false, error: "Invalid FAQ id" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const faq = await db.collection("faqs").findOne({ _id: new ObjectId(id) });

    if (!faq) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, faq });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQ" },
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
        { success: false, error: "Invalid FAQ id" },
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

    const { _id, ...updateData } = body as Record<string, unknown>;

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const existingFaq = await db.collection("faqs").findOne({
      _id: new ObjectId(id),
    });

    if (!existingFaq) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 }
      );
    }

    updateData.updatedAt = new Date();

    await db.collection("faqs").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    revalidatePath("/");
    revalidatePath("/faqs");

    return NextResponse.json({
      success: true,
      message: "FAQ updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to update FAQ" },
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
        { success: false, error: "Invalid FAQ id" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    const result = await db.collection("faqs").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "FAQ not found" },
        { status: 404 }
      );
    }

    revalidatePath("/");
    revalidatePath("/faqs");

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.error("Delete FAQ error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}
