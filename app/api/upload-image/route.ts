import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const productId = formData.get('productId') as string;
    
    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Convert file to base64 for storage
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Basic file size validation (e.g., max 5MB)
    const maxSizeInBytes = 5 * 1024 * 1024;
    if (buffer.byteLength > maxSizeInBytes) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      );
    }

    const base64Image = buffer.toString('base64');
    const mimeType = file.type;

    // Store in MongoDB
    const client = await clientPromise;
    const db = client.db('svnm-website');
    
    // Store image in a separate collection
    const imageDoc = {
      productId: productId || null,
      filename: file.name,
      mimeType: mimeType,
      data: base64Image,
      uploadedAt: new Date()
    };
    
    const result = await db.collection('images').insertOne(imageDoc);

    return NextResponse.json({
      success: true,
      imageId: result.insertedId,
      message: 'Image uploaded successfully'
    });

  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload image',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 

