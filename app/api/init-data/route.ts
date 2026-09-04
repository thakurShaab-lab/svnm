import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const sampleProducts = [
  {
    slug: 'air-gauge',
    name: 'Air Gauge',
    image: '/images/air-plug-gauge.png',
    description: 'High precision air gauge for accurate measurements',
    features: ['High accuracy', 'Durable construction', 'Easy to use'],
    summary: 'Professional air gauge for industrial applications',
    category: 'Measurement Tools',
    categoryInfo: 'Precision measurement instruments',
    applications: ['Quality control', 'Manufacturing', 'Inspection']
  },
  {
    slug: 'ring-gauge',
    name: 'Ring Gauge',
    image: '/images/ring-gauge.png',
    description: 'Precision ring gauge for diameter measurements',
    features: ['Precision calibrated', 'Hardened steel', 'Long service life'],
    summary: 'Standard ring gauge for diameter verification',
    category: 'Measurement Tools',
    categoryInfo: 'Precision measurement instruments',
    applications: ['Quality assurance', 'Metrology', 'Calibration']
  }
];

const sampleServices = [
  {
    slug: 'calibration-service',
    name: 'Calibration Service',
    image: '/images/quality-policy.png',
    description: 'Professional calibration services for all measurement instruments',
    features: ['ISO certified', 'Traceable standards', 'Quick turnaround'],
    category: 'Calibration Services'
  },
  {
    slug: 'inspection-service',
    name: 'Inspection Service',
    image: '/images/quality-policy.png',
    description: 'Comprehensive inspection and quality control services',
    features: ['Detailed reports', 'Expert technicians', 'Advanced equipment'],
    category: 'Inspection Services'
  }
];

export async function POST() {
  try {
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          error: 'Database init endpoint is disabled in production',
        },
        { status: 403 }
      );
    }

    const client = await clientPromise;
    const db = client.db('svnm-website');
    
    // Initialize products collection
    const productsCollection = db.collection('products');
    const productsCount = await productsCollection.countDocuments();
    
    if (productsCount === 0) {
      await productsCollection.insertMany(sampleProducts);
      console.log('Sample products added');
    }
    
    // Initialize services collection
    const servicesCollection = db.collection('services');
    const servicesCount = await servicesCollection.countDocuments();
    
    if (servicesCount === 0) {
      await servicesCollection.insertMany(sampleServices);
      console.log('Sample services added');
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database initialized successfully',
      productsCount: await productsCollection.countDocuments(),
      servicesCount: await servicesCollection.countDocuments()
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 