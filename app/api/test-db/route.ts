import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function GET() {
  try {
    // 1. Authenticate that the request comes from logged-in Admin
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session token' },
        { status: 401 }
      );
    }

    // 2. Check for MongoDB URI
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      return NextResponse.json(
        {
          success: false,
          error: 'MONGODB_URI environment variable not found on server',
        },
        { status: 500 }
      );
    }

    // 3. Perform Database Ping
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(mongoUri);
    
    await client.connect();
    const db = client.db('svnm-website');
    await db.command({ ping: 1 });
    await client.close();

    return NextResponse.json({ 
      success: true, 
      message: 'MongoDB connection successful!',
      database: 'svnm-website'
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to connect to MongoDB',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}