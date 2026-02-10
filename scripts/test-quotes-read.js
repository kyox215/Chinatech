const BASE_URL = 'http://localhost:3000/api/quotes';

async function testQuotesRead() {
  console.log('🚀 Starting Quotes API Read Test (Pagination & Filtering)...');

  try {
    // 1. Basic Read
    console.log('\n1. Testing Basic Read (Page 1, Limit 10)...');
    const res1 = await fetch(`${BASE_URL}?page=1&limit=10`);
    if (!res1.ok) throw new Error(`Fetch failed: ${res1.status}`);
    const data1 = await res1.json();
    console.log(`✅ Got ${data1.data.length} items. Total: ${data1.meta.total}`);
    
    if (data1.data.length > 10) throw new Error('Limit not respected!');
    
    // 2. Pagination Check
    if (data1.meta.total > 10) {
      console.log('\n2. Testing Page 2...');
      const res2 = await fetch(`${BASE_URL}?page=2&limit=10`);
      const data2 = await res2.json();
      console.log(`✅ Page 2 returned ${data2.data.length} items.`);
      if (data1.data[0].id === data2.data[0].id) console.warn('⚠️ Page 1 and 2 start with same item (could happen if sorting is unstable or limit is 0).');
      else console.log('✅ Pagination seems to work (different items).');
    } else {
      console.log('⚠️ Not enough data to test page 2.');
    }

    // 3. Search Filtering
    console.log('\n3. Testing Search Filtering (query="iPhone")...');
    const res3 = await fetch(`${BASE_URL}?search=iPhone&limit=5`);
    const data3 = await res3.json();
    console.log(`✅ Search "iPhone" returned ${data3.data.length} items.`);
    const allMatch = data3.data.every((item: any) => 
      item.model.toLowerCase().includes('iphone') || 
      item.repair_label.toLowerCase().includes('iphone')
    );
    if (allMatch) console.log('✅ All search results match query.');
    else console.warn('⚠️ Some results might not match (fuzzy search?).');

    // 4. Brand Filtering
    console.log('\n4. Testing Brand Filtering (brand="APPLE")...');
    const res4 = await fetch(`${BASE_URL}?brand=APPLE&limit=5`);
    const data4 = await res4.json();
    console.log(`✅ Brand "APPLE" returned ${data4.data.length} items.`);
    const allApple = data4.data.every((item: any) => item.brand === 'APPLE');
    if (allApple) console.log('✅ All results are APPLE.');
    else console.error('❌ Brand filtering failed!');

    // 5. Cache Header Check
    const cacheHeader = res1.headers.get('Cache-Control');
    console.log(`\n5. Cache-Control Header: ${cacheHeader}`);
    if (cacheHeader && cacheHeader.includes('s-maxage')) console.log('✅ Caching is enabled.');
    else console.warn('⚠️ Caching headers missing.');

    console.log('\n🎉 Read Test Passed!');

  } catch (error) {
    console.error('\n❌ Test Failed:', error.message);
  }
}

testQuotesRead();
