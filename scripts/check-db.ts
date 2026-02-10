
import dotenv from 'dotenv';
dotenv.config();

async function checkConnections() {
  const { db } = await import('../src/lib/db');
  console.log('Starting Database Connection Check...\n');

  const results: any = {};
  let hasError = false;

  // 1. Check RecycleModel
  try {
    const start = performance.now();
    const count = await db.recycleModel.count();
    const duration = performance.now() - start;
    results.RecycleModel = { status: 'OK', count, duration: `${duration.toFixed(2)}ms` };
  } catch (e) {
    results.RecycleModel = { status: 'ERROR', error: (e as Error).message };
    hasError = true;
  }

  // 2. Check Quote
  try {
    const start = performance.now();
    const count = await db.quote.count();
    const duration = performance.now() - start;
    results.Quote = { status: 'OK', count, duration: `${duration.toFixed(2)}ms` };
  } catch (e) {
    results.Quote = { status: 'ERROR', error: (e as Error).message };
    hasError = true;
  }

  // 3. Check User
  try {
    const start = performance.now();
    const count = await db.user.count();
    const duration = performance.now() - start;
    results.User = { status: 'OK', count, duration: `${duration.toFixed(2)}ms` };
  } catch (e) {
    results.User = { status: 'ERROR', error: (e as Error).message };
    hasError = true;
  }

  // 4. Check Ticket
  try {
    const start = performance.now();
    const count = await db.ticket.count();
    const duration = performance.now() - start;
    results.Ticket = { status: 'OK', count, duration: `${duration.toFixed(2)}ms` };
  } catch (e) {
    results.Ticket = { status: 'ERROR', error: (e as Error).message };
    hasError = true;
  }

  // 5. Check Part
  try {
    const start = performance.now();
    const count = await db.part.count();
    const duration = performance.now() - start;
    results.Part = { status: 'OK', count, duration: `${duration.toFixed(2)}ms` };
  } catch (e) {
    results.Part = { status: 'ERROR', error: (e as Error).message };
    hasError = true;
  }

  console.table(results);

  if (hasError) {
    console.error('\n❌ Some checks failed.');
    process.exit(1);
  } else {
    console.log('\n✅ All database connections are healthy.');
    process.exit(0);
  }
}

checkConnections();
