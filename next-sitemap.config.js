/** @type {import('next-sitemap').IConfig} */
const { MongoClient } = require("mongodb");

async function getDynamicRoutesFromMongo() {
  if (!process.env.MONGODB_URI) {
    return [];
  }

  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("svnm-website");

    // Fetch all products & services
    const products = await db.collection("products").find({}).toArray();
    const services = await db.collection("services").find({}).toArray();
    const blogPosts = await db
      .collection("blogs")
      .find({ status: "published" })
      .toArray();

    // Format Product Pages
    const productPages = products.map((product) => ({
      loc: `/products/${product.slug}`,
      lastmod: product.updatedAt
        ? new Date(product.updatedAt).toISOString()
        : new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
      images: product.image
        ? [
            {
              loc: `https://www.svnanometrology.com/api/images/${product.image}`,
              title: product.name,
              caption: product.description || product.summary || "",
            },
          ]
        : [],
    }));

    // Format Service Pages
    const servicePages = services.map((service) => ({
      loc: `/services/${service.slug}`,
      lastmod: service.updatedAt
        ? new Date(service.updatedAt).toISOString()
        : new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
      images: service.image
        ? [
            {
              loc: `https://www.svnanometrology.com/api/images/${service.image}`,
              title: service.name,
              caption: service.description || service.summary || "",
            },
          ]
        : [],
    }));

    // Format Blog Pages
    const blogPages = blogPosts.map((post) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7,
      images: post.featuredImage
        ? [
            {
              loc: `https://www.svnanometrology.com/api/images/${post.featuredImage}`,
              title: post.title,
              caption: post.excerpt || "",
            },
          ]
        : [],
    }));

    return [...productPages, ...servicePages, ...blogPages];
  } catch (error) {
    console.error("Error fetching dynamic routes for sitemap:", error);
    return [];
  } finally {
    await client.close();
  }
}

module.exports = {
  siteUrl: "https://www.svnanometrology.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.8,
  sitemapSize: 5000,
  
  // 1. STAGE ALL STATIC PAGES AUTOMATICALLY
  // next-sitemap automatically crawls the build directory (app/ or pages/)
  // to fetch all static routes (/, /about-us, /products, /services, /contact-us, /downloads, etc.)

  // 2. EXCLUDE ADMIN AND INTERNAL ROUTES
  exclude: [
    "/admin",
    "/admin/*",
    "/admin/**",
    "/api/*",
    "/api/**",
    "/404",
    "/500",
    "/test",
  ],

  // 3. GENERATE ROBOTS.TXT WITH ADMIN DISALLOWED
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/*", "/api/", "/404", "/500", "/test"],
      },
    ],
  },

  generateIndexSitemap: true,
  autoLastmod: true,
  outDir: "public",

  // 4. APPEND DYNAMIC MONGODB ROUTES TO ALL STATIC ROUTES
  additionalPaths: async (config) => {
    return await getDynamicRoutesFromMongo();
  },
};
