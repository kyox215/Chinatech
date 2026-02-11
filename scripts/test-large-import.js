const BASE_URL = 'http://localhost:3001/api/quotes';

function generateRandomQuote(i) {
  return {
    brand: 'TEST_BRAND',
    model: `Test Model ${i}`,
    repair_id: `test-repair-${Date.now()}-${i}-${Math.random()}`,
    repair_label: 'Screen Replacement',
    repair_type: 'screen',
    quality: 'orig',
    price: 100 + i,
    warranty: '12 Months',
    count: 1,
    is_unstable: false,
    price_spread: null
  };
}

async function testLargeImport() {
  console.log('🚀 Starting Large Import Test...');

  // Generate 2500 records
  const count = 2500;
  const data = Array.from({ length: count }, (_, i) => generateRandomQuote(i));

  console.log(`Generated ${data.length} records. Payload size approx: ${(JSON.stringify(data).length / 1024 / 1024).toFixed(2)} MB`);

  const CHUNK_SIZE = 50;
  let successCount = 0;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for whole process

    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
      const chunk = data.slice(i, i + CHUNK_SIZE);
      const isFirstChunk = i === 0;
      
      // Send replace=true only for first chunk, mode=insert for others
       let url = BASE_URL;
       if (isFirstChunk) {
         url += '?replace=true';
       } else {
         url += '?mode=insert';
       }
       
       console.log(`Sending chunk ${i/CHUNK_SIZE + 1}/${Math.ceil(data.length/CHUNK_SIZE)} (${chunk.length} items) to ${url}...`);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(chunk),
        signal: controller.signal
      });
      
      if (!res.ok) {
        throw new Error(`Chunk failed: ${res.status} ${res.statusText}`);
      }
      
      successCount += chunk.length;
    }

    clearTimeout(timeoutId);
    console.log(`✅ Import successful: ${successCount} records.`);

  } catch (error) {
    console.error('❌ Network or Fetch Error:', error);
  }
}

testLargeImport();
