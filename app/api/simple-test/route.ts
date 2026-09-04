import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          error: 'Simple test endpoint is disabled in production',
        },
        { status: 403 }
      );
    }

    // Check if environment variable exists
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      return NextResponse.json(
        {
          success: false,
          error: 'MONGODB_URI environment variable not found',
        },
        { status: 500 }
      );
    }

    // Test basic connection
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(mongoUri);
    
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    await client.close();

    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful!',
      hasEnvVar: !!mongoUri
    });
  } catch (error) {
    console.error('Connection test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}