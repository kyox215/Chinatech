const BASE_URL = 'http://localhost:3000/api/quotes';

async function testQuotesImport() {
  console.log('🚀 Starting Quotes API Import Test...');

  const mockData = [
    {
      brand: 'TEST_BRAND',
      model: 'Test Model 1',
      repair_id: `test-repair-1-${Date.now()}`,
      repair_label: 'Screen Replacement',
      repair_type: 'screen',
      quality: 'orig',
      price: 100.50,
      warranty: '12 Months',
      count: 1,
      is_unstable: false,
      price_spread: '100-100'
    },
    {
      brand: 'TEST_BRAND',
      model: 'Test Model 1',
      repair_id: `test-repair-2-${Date.now()}`,
      repair_label: 'Battery Replacement',
      repair_type: 'battery',
      quality: 'comp',
      price: 50.00,
      warranty: '6 Months',
      count: 1,
      is_unstable: true,
      price_spread: '40-60'
    }
  ];

  try {
    // 1. Test Bulk Import (Upsert)
    console.log('\n1. Testing Bulk Import (Upsert mode)...');
    const res1 = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData)
    });
    
    if (!res1.ok) {
      const err = await res1.json();
      throw new Error(`Upsert failed: ${JSON.stringify(err)}`);
    }
    const result1 = await res1.json();
    console.log('✅ Upsert successful:', result1);

    // 2. Verify Data
    console.log('\n2. Verifying inserted data...');
    const listRes = await fetch(BASE_URL);
    const quotes = await listRes.json();
    const found = quotes.filter(q => q.brand === 'TEST_BRAND');
    console.log(`✅ Found ${found.length} records for TEST_BRAND.`);
    if (found.length < 2) throw new Error('Data verification failed!');

    // 3. Test Replace All (Optional - be careful)
    // Uncomment to test replace mode (Warning: Clears DB)
    /*
    console.log('\n3. Testing Replace All...');
    const res2 = await fetch(`${BASE_URL}?replace=true`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData)
    });
    const result2 = await res2.json();
    console.log('✅ Replace successful:', result2);
    */
    
    // 4. Cleanup
    console.log('\n4. Cleaning up test data...');
    await fetch(`${BASE_URL}?brand=TEST_BRAND`, { method: 'DELETE' });
    console.log('✅ Cleanup done.');

    console.log('\n🎉 Quotes API Test Passed!');

  } catch (error) {
    console.error('\n❌ Test Failed:', error.message);
  }
}

testQuotesImport();
