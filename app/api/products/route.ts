import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/slugify";

// GET - Get all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("svnm-website");
    const products = await db.collection("products").find({}).toArray();

    const productsWithUrls = products.map((p) => ({
      ...p,
      imageUrl: p.image ? `/api/images/${p.image}` : null,
    }));

    return NextResponse.json({
      success: true,
      products: productsWithUrls,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

// POST - Add a new product
export async function POST(request: NextRequest) {
  try {
    const product = await request.json();
    product.slug = slugify(product.name);

    // Basic validation to ensure required fields are present
    if (!product || typeof product !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
        },
        { status: 400 }
      );
    }

    const { name } = product as { name?: unknown };

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
    const result = await db.collection("products").insertOne(product);
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/sitemap.xml");
    // await client.close();

    return NextResponse.json({
      success: true,
      productId: result.insertedId,
      message: "Product added successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to add product",
      },
      { status: 500 }
    );
  }
}
