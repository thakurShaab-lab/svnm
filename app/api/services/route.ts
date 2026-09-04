import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/slugify";

// GET - Get all services
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("svnm-website");
    const services = await db.collection("services").find({}).toArray();

    const servicesWithUrls = services.map((p) => ({
      ...p,
      imageUrl: p.image ? `/api/images/${p.image}` : null,
    }));

    return NextResponse.json({
      success: true,
      services: servicesWithUrls,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 }
    );
  }
}

// POST - Add a new service
export async function POST(request: NextRequest) {
  try {
    const service = await request.json();
    service.slug = slugify(service.name);

    // Basic validation to ensure required fields are present
    if (!service || typeof service !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
        },
        { status: 400 }
      );
    }

    const { name } = service as { name?: unknown };

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing or invalid required fields: name, slug",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("svnm-website");
    const result = await db.collection("services").insertOne(service);
    revalidatePath("/");
    revalidatePath("/services");
    revalidatePath("/sitemap.xml");
    // await client.close();

    return NextResponse.json({
      success: true,
      serviceId: result.insertedId,
      message: "Service added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add service",
      },
      { status: 500 }
    );
  }
}
