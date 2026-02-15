
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Lazy initialization to avoid build errors if env vars are missing
let supabaseInstance: ReturnType<typeof createClient> | null = null;

function getSupabase() {
  if (supabaseInstance) return supabaseInstance;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials');
  }

  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');

  // Optimize: Parallel fetching with count check first
  const countQuery = getSupabase().from('repair_quotes').select('*', { count: 'exact', head: true });
  if (brand && brand !== 'all') countQuery.eq('brand', brand);
  if (model) countQuery.eq('model', model);
  
  const { count, error: countError } = await countQuery;
  if (countError) return NextResponse.json({ error: countError.message }, { status: 500 });
  
  const total = count || 0;
  const PAGE_SIZE = 1000;
  const promises = [];
  
  for (let from = 0; from < total; from += PAGE_SIZE) {
      const q = getSupabase()
        .from('repair_quotes')
        .select('*')
        .order('priority', { ascending: false })
        .order('model')
        .range(from, from + PAGE_SIZE - 1);

      if (brand && brand !== 'all') q.eq('brand', brand);
      if (model) q.eq('model', model);
      
      promises.push(q);
  }
  
  const results = await Promise.all(promises);
  const allData = [];
  
  for (const result of results) {
      if (result.error) return NextResponse.json({ error: result.error.message }, { status: 500 });
      if (result.data) allData.push(...result.data);
  }

  // Return with Cache headers (10 minutes browser cache, 1 hour stale revalidate)
  return NextResponse.json(allData, {
      headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
      }
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Support bulk insert
    if (Array.isArray(body)) {
      const { data, error } = await getSupabase().from('repair_quotes').insert(body).select();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }
    
    // Single insert
    const { data, error } = await getSupabase().from('repair_quotes').insert(body).select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    // Case 1: Rename Model (and update model_code if provided)
    if (body.brand && body.oldModel && body.newModel) {
      const updates: any = { model: body.newModel };
      if (body.newModelCode !== undefined) {
          updates.model_code = body.newModelCode;
      }
      
      const { data, error } = await getSupabase()
        .from('repair_quotes')
        .update(updates)
        .eq('brand', body.brand)
        .eq('model', body.oldModel)
        .select();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    // Case 2: Rename Brand
    if (body.oldBrand && body.newBrand) {
      const { data, error } = await getSupabase()
        .from('repair_quotes')
        .update({ brand: body.newBrand })
        .eq('brand', body.oldBrand)
        .select();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }
    
    // Case 3: Update Single Record by ID
    if (body.id) {
      const { id, ...updates } = body;
      const { data, error } = await getSupabase()
        .from('repair_quotes')
        .update(updates)
        .eq('id', id)
        .select();
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid update request' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const brand = searchParams.get('brand');
  const model = searchParams.get('model');

  if (id) {
    const { error } = await getSupabase().from('repair_quotes').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } 
  
  if (brand && model) {
    // Delete all repairs for a model
    const { error } = await getSupabase().from('repair_quotes').delete().eq('brand', brand).eq('model', model);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  }
  
  if (brand) {
     // Delete entire brand
     const { error } = await getSupabase().from('repair_quotes').delete().eq('brand', brand);
     if (error) return NextResponse.json({ error: error.message }, { status: 500 });
     return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Missing id or brand/model parameters' }, { status: 400 });
}
