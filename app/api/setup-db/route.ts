// import { NextResponse } from 'next/server';

// const sampleProducts = [
//   {
//     slug: 'air-plug-gauge',
//     name: 'Air Plug Gauge',
//     image: '/images/air-plug-gauge.png',
//     description: 'High precision air plug gauge for accurate diameter measurements. This professional-grade instrument provides reliable measurements for quality control and manufacturing processes.',
//     features: [
//       'High accuracy measurement',
//       'Durable hardened steel construction',
//       'Precision calibrated',
//       'Easy to use design',
//       'Long service life'
//     ],
//     summary: 'Professional air plug gauge for industrial applications',
//     category: 'Measurement Tools',
//     categoryInfo: 'Precision measurement instruments for quality control and manufacturing',
//     applications: ['Quality control', 'Manufacturing', 'Inspection', 'Calibration']
//   },
//   {
//     slug: 'ring-gauge',
//     name: 'Ring Gauge',
//     image: '/images/ring-gauge.png',
//     description: 'Standard ring gauge for diameter verification and quality assurance. Essential tool for metrology and calibration laboratories.',
//     features: [
//       'Precision calibrated',
//       'Hardened steel construction',
//       'Long service life',
//       'ISO compliant',
//       'Traceable standards'
//     ],
//     summary: 'Standard ring gauge for diameter verification',
//     category: 'Measurement Tools',
//     categoryInfo: 'Precision measurement instruments for quality control and manufacturing',
//     applications: ['Quality assurance', 'Metrology', 'Calibration', 'Inspection']
//   },
//   {
//     slug: 'screw-gauge',
//     name: 'Screw Gauge',
//     image: '/images/ba-screw-gauge.png',
//     description: 'Precision screw gauge for thread measurement and verification. Essential for manufacturing and quality control applications.',
//     features: [
//       'Thread measurement capability',
//       'High precision design',
//       'Durable construction',
//       'Easy reading scale',
//       'Professional grade'
//     ],
//     summary: 'Precision screw gauge for thread measurements',
//     category: 'Measurement Tools',
//     categoryInfo: 'Precision measurement instruments for quality control and manufacturing',
//     applications: ['Thread measurement', 'Quality control', 'Manufacturing', 'Inspection']
//   },
//   {
//     slug: 'air-master-gauge',
//     name: 'Air Master Gauge',
//     image: '/images/air-master-plug-gauge.png',
//     description: 'Master air gauge for calibration and reference measurements. Provides the highest level of accuracy for critical applications.',
//     features: [
//       'Master grade accuracy',
//       'Calibration reference',
//       'Traceable standards',
//       'Professional quality',
//       'Long-term stability'
//     ],
//     summary: 'Master air gauge for calibration purposes',
//     category: 'Calibration Tools',
//     categoryInfo: 'Master and reference instruments for calibration and verification',
//     applications: ['Calibration', 'Reference standards', 'Quality assurance', 'Metrology']
//   }
// ];

// const sampleServices = [
//   {
//     slug: 'calibration-service',
//     name: 'Calibration Service',
//     image: '/images/quality-policy.png',
//     description: 'Professional calibration services for all measurement instruments. Our ISO-certified laboratory provides traceable calibration with detailed reports and certificates.',
//     features: [
//       'ISO certified laboratory',
//       'Traceable standards',
//       'Quick turnaround time',
//       'Detailed reports',
//       'Professional certificates'
//     ],
//     category: 'Calibration Services'
//   },
//   {
//     slug: 'inspection-service',
//     name: 'Inspection Service',
//     image: '/images/quality-policy.png',
//     description: 'Comprehensive inspection and quality control services. Our expert technicians use advanced equipment to provide accurate and reliable inspection results.',
//     features: [
//       'Expert technicians',
//       'Advanced equipment',
//       'Detailed reports',
//       'Quality assurance',
//       'Professional service'
//     ],
//     category: 'Inspection Services'
//   },
//   {
//     slug: 'metrology-service',
//     name: 'Metrology Service',
//     image: '/images/quality-policy.png',
//     description: 'Specialized metrology services for precision measurement and dimensional analysis. We provide comprehensive solutions for complex measurement challenges.',
//     features: [
//       'Precision measurement',
//       'Dimensional analysis',
//       'Complex solutions',
//       'Expert consultation',
//       'Advanced techniques'
//     ],
//     category: 'Metrology Services'
//   }
// ];

// export async function POST() {
//   try {
//     if (process.env.NODE_ENV === 'production') {
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Database setup endpoint is disabled in production',
//         },
//         { status: 403 }
//       );
//     }

//     const mongoUri = process.env.MONGODB_URI;
    
//     if (!mongoUri) {
//       return NextResponse.json({
//         success: false,
//         error: 'MONGODB_URI environment variable not found'
//       });
//     }

//     const { MongoClient } = await import('mongodb');
//     const client = new MongoClient(mongoUri);
    
//     await client.connect();
//     const db = client.db('svnm-website');
    
//     // Clear existing data
//     await db.collection('products').deleteMany({});
//     await db.collection('services').deleteMany({});
    
//     // Insert sample products
//     const productsResult = await db.collection('products').insertMany(sampleProducts);
//     console.log(`Added ${productsResult.insertedCount} products`);
    
//     // Insert sample services
//     const servicesResult = await db.collection('services').insertMany(sampleServices);
//     console.log(`Added ${servicesResult.insertedCount} services`);
    
//     await client.close();
    
//     return NextResponse.json({ 
//       success: true, 
//       message: 'Database initialized successfully',
//       productsCount: productsResult.insertedCount,
//       servicesCount: servicesResult.insertedCount
//     });
//   } catch (error) {
//     console.error('Database setup error:', error);
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Failed to setup database',
//         details: error instanceof Error ? error.message : 'Unknown error'
//       },
//       { status: 500 }
//     );
//   }
// } 