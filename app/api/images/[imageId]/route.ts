import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ imageId: string }> }
) {
  try {
    const { imageId } = await context.params;

    if (!ObjectId.isValid(imageId)) {
      return NextResponse.json(
        { error: 'Invalid image id' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('svnm-website');
    
    // Find the image document
    const imageDoc = await db.collection('images').findOne({ 
      _id: new ObjectId(imageId) 
    });

    if (!imageDoc) {
      return NextResponse.json({ error: 'Image not found'}, { status: 404 });
    }

    // Convert base64 back to buffer
    const imageBuffer = Buffer.from(imageDoc.data, 'base64');
    
    // Return the image with proper headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': imageDoc.mimeType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });

  } catch (error) {
    console.error('Image retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve image' },
      { status: 500 }
    );
  }
} 

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ imageId: string }> }
) {
  try {
    const { imageId } = await context.params;

    if (!ObjectId.isValid(imageId)) {
      return NextResponse.json({ error: 'Invalid image id' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('svnm-website');

    const result = await db.collection('images').deleteOne({
      _id: new ObjectId(imageId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Image deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}