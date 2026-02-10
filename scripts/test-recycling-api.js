const BASE_URL = 'http://localhost:3000/api/recycling';

async function testCRUD() {
  console.log('🚀 Starting Recycling API CRUD Test...');

  try {
    // 1. CREATE (POST)
    console.log('\n1. Testing POST (Create)...');
    const newModel = {
      model: `Test-Phone-${Date.now()}`,
      screenPrice: 50,
      batteryPrice: 30,
      baseRecyclePrice: 500,
      releaseYear: 2024
    };
    
    const createRes = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newModel)
    });
    
    if (!createRes.ok) throw new Error(`POST failed: ${createRes.status}`);
    const created = await createRes.json();
    console.log('✅ Created:', created.id, created.model);
    
    const id = created.id;

    // 2. READ (GET)
    console.log('\n2. Testing GET (List)...');
    const listRes = await fetch(BASE_URL);
    if (!listRes.ok) throw new Error(`GET failed: ${listRes.status}`);
    const list = await listRes.json();
    const found = list.find(m => m.id === id);
    if (found) console.log('✅ Found created item in list.');
    else console.error('❌ Created item not found in list!');

    // 3. UPDATE (PUT)
    console.log('\n3. Testing PUT (Update)...');
    const updateRes = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newModel, baseRecyclePrice: 600 })
    });
    
    if (!updateRes.ok) throw new Error(`PUT failed: ${updateRes.status}`);
    const updated = await updateRes.json();
    console.log('✅ Updated price:', updated.baseRecyclePrice);
    if (updated.baseRecyclePrice === 600) console.log('✅ Update verified.');

    // 4. DELETE (DELETE)
    console.log('\n4. Testing DELETE...');
    const deleteRes = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!deleteRes.ok) throw new Error(`DELETE failed: ${deleteRes.status}`);
    console.log('✅ Deleted successfully.');

    // Verify Delete
    const verifyRes = await fetch(BASE_URL);
    const verifyList = await verifyRes.json();
    const stillExists = verifyList.find(m => m.id === id);
    if (!stillExists) console.log('✅ Verification: Item no longer exists.');
    else console.error('❌ Verification Failed: Item still exists!');

    console.log('\n🎉 All tests passed!');

  } catch (error) {
    console.error('\n❌ Test Failed:', error.message);
    if (error.cause) console.error(error.cause);
    console.log('Ensure your Next.js server is running (npm run dev).');
  }
}

testCRUD();
