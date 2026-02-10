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

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

    const res = await fetch(`${BASE_URL}?replace=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const text = await res.text();
      console.error(`❌ Import failed: ${res.status} ${res.statusText}`);
      console.error(`Response: ${text}`);
      return;
    }

    const result = await res.json();
    console.log('✅ Import successful:', result);

  } catch (error) {
    console.error('❌ Network or Fetch Error:', error);
  }
}

testLargeImport();
