// lib/mongodb.ts
import { MongoClient } from "mongodb";

// MONGODB_URI uses the standard (non-SRV) host-list format rather than
// mongodb+srv://. On this network, raw c-ares SRV/TXT DNS queries (used to
// resolve a +srv URI) are intermittently blocked/refused even though normal
// hostname lookups (dns.lookup, used for the actual connection) work fine —
// so a +srv URI made every request flaky. See .env.local for the original
// +srv URI kept as a commented backup.
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {};

// Retry a few times with backoff so a transient network blip on first
// connect doesn't take the whole app down for the life of the process.
const CONNECT_RETRIES = 4;
const CONNECT_RETRY_DELAY_MS = 500;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectWithRetry(): Promise<MongoClient> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= CONNECT_RETRIES; attempt++) {
    try {
      const client = new MongoClient(uri, options);
      return await client.connect();
    } catch (err) {
      lastError = err;
      if (attempt < CONNECT_RETRIES) {
        await delay(CONNECT_RETRY_DELAY_MS * attempt);
      }
    }
  }
  throw lastError;
}

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // cache across hot reloads in dev
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = connectWithRetry();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // fresh client in production
  clientPromise = connectWithRetry();
}

export default clientPromise;