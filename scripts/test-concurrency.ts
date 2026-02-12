
import { db } from "../src/lib/db";
import { quoteService } from "../src/services/quote.service";
import { CreateQuoteInput } from "../src/lib/validations/quote";

// Helper to measure execution time
const measureTime = async (label: string, fn: () => Promise<any>) => {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    console.log(`[PASS] ${label}: ${duration.toFixed(2)}ms`);
    return { result, duration };
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`[FAIL] ${label}: ${duration.toFixed(2)}ms - ${(error as Error).message}`);
    throw error;
  }
};

async function runConcurrencyTest() {
  console.log("\n=== Starting Concurrency & Performance Test ===\n");

  const TEST_BATCH_SIZE = 50;
  const CONCURRENT_REQUESTS = 10;
  
  // Prepare test data
  const testData: CreateQuoteInput[] = Array.from({ length: TEST_BATCH_SIZE * CONCURRENT_REQUESTS }).map((_, i) => ({
    brand: "TEST_BRAND",
    model: `TEST_MODEL_${Math.floor(i / TEST_BATCH_SIZE)}`,
    // repairId must be unique for ALL items across ALL batches
    repairId: `CONCURRENCY_TEST_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
    repairLabel: `Screen Replacement ${i}`,
    repairType: "screen",
    quality: "orig",
    price: 100 + (i % 50),
    warranty: "12 Months",
    isActive: true,
    isUnstable: false
  }));

  // 1. High Concurrency Write Test
  console.log(`\n--- 1. High Concurrency Write (${CONCURRENT_REQUESTS} concurrent batches of ${TEST_BATCH_SIZE}) ---`);
  
  const batches = [];
  for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
    batches.push(testData.slice(i * TEST_BATCH_SIZE, (i + 1) * TEST_BATCH_SIZE));
  }

  const writeStart = performance.now();
  await Promise.all(batches.map((batch, index) => 
    measureTime(`Batch Write ${index + 1}`, () => quoteService.createManyQuotes(batch))
  ));
  const totalWriteTime = performance.now() - writeStart;
  console.log(`Total Write Time: ${totalWriteTime.toFixed(2)}ms`);
  console.log(`Average Write Latency: ${(totalWriteTime / CONCURRENT_REQUESTS).toFixed(2)}ms per batch`);

  // 2. Read Performance Test
  console.log("\n--- 2. Read Performance Test (Cached vs Uncached) ---");
  
  // First read (Uncached)
  const { duration: uncachedTime } = await measureTime("Uncached Read (Fetch All)", () => 
    quoteService.getQuotes({ brand: "TEST_BRAND", limit: 0 })
  );

  // Second read (Cached)
  const { duration: cachedTime } = await measureTime("Cached Read (Fetch All)", () => 
    quoteService.getQuotes({ brand: "TEST_BRAND", limit: 0 })
  );

  if (cachedTime > 50) {
    console.warn("⚠️ Cached read latency exceeded 50ms target!");
  } else {
    console.log("✅ Cached read latency within 50ms target.");
  }

  // 3. Data Consistency Check
  console.log("\n--- 3. Data Consistency Check ---");
  const checkResult = await quoteService.getQuotes({ brand: "TEST_BRAND", limit: 0 });
  
  if (!checkResult || !checkResult.meta) {
    console.error("❌ Consistency Failed: Result structure invalid (missing meta).");
    return;
  }

  const actualCount = checkResult.meta.total;
  const expectedCount = TEST_BATCH_SIZE * CONCURRENT_REQUESTS;
  
  if (actualCount === expectedCount) {
    console.log(`✅ Consistency Verified: Found ${actualCount} / ${expectedCount} records.`);
  } else {
    console.error(`❌ Consistency Failed: Found ${actualCount}, expected ${expectedCount}.`);
  }

  // Cleanup
  console.log("\n--- Cleaning up Test Data ---");
  await quoteService.deleteBrand("TEST_BRAND");
  console.log("Cleanup complete.");
}

runConcurrencyTest()
  .catch(console.error)
  .finally(() => process.exit(0));
