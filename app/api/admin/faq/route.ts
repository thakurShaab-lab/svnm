import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

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

// GET - Get all FAQs, any status (admin only)
export async function GET() {
  try {
    const authed = await checkAuth();
    if (!authed) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");
    const faqs = await db
      .collection("faqs")
      .find({})
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json({
      success: true,
      faqs,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

// POST - Create a new FAQ (admin only)
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

    const { question, answer } = body as { question?: unknown; answer?: unknown };

    if (typeof question !== "string" || !question.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid required field: question" },
        { status: 400 }
      );
    }

    if (typeof answer !== "string" || !answer.trim()) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid required field: answer" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");

    let order = typeof body.order === "number" ? body.order : NaN;
    if (Number.isNaN(order)) {
      const last = await db
        .collection("faqs")
        .find({})
        .sort({ order: -1 })
        .limit(1)
        .toArray();
      order = last.length > 0 ? (last[0].order || 0) + 1 : 1;
    }

    const status = body.status === "inactive" ? "inactive" : "active";
    const now = new Date();

    const productSlug =
      typeof body.productSlug === "string" && body.productSlug.trim()
        ? body.productSlug
        : undefined;
    const serviceSlug =
      typeof body.serviceSlug === "string" && body.serviceSlug.trim()
        ? body.serviceSlug
        : undefined;

    const faq = {
      question,
      answer,
      status,
      order,
      ...(productSlug && { productSlug }),
      ...(serviceSlug && { serviceSlug }),
      createdAt: now,
      updatedAt: now,
    };

    const result = await db.collection("faqs").insertOne(faq);

    revalidatePath("/");
    revalidatePath("/faqs");

    return NextResponse.json({
      success: true,
      faqId: result.insertedId,
      message: "FAQ added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add FAQ" },
      { status: 500 }
    );
  }
}
