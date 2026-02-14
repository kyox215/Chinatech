import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  
  // Fetch all records with pagination to overcome the 1000 row limit
  const allData: Record<string, unknown>[] = [];
  const pageSize = 1000;
  let page = 0;
  let hasMore = true;

  while (hasMore) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error } = await supabase
      .from("quotes")
      .select("*")
      .order("brand", { ascending: true })
      .order("model", { ascending: true })
      .range(from, to);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (data && data.length > 0) {
      allData.push(...data);
      hasMore = data.length === pageSize;
      page++;
    } else {
      hasMore = false;
    }
  }

  return NextResponse.json(allData);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const url = new URL(request.url);
  const replaceAll = url.searchParams.get("replace") === "true";
  
  if (Array.isArray(body)) {
    // Only delete existing data if explicitly requested via ?replace=true
    if (replaceAll) {
      const { error: deleteError } = await supabase.from("quotes").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      
      if (deleteError) {
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
      }
    }

    // Bulk insert using upsert to avoid duplicates (based on repair_id)
    const { data, error } = await supabase
      .from("quotes")
      .upsert(body, { onConflict: 'repair_id', ignoreDuplicates: false })
      .select();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  } else {
    // Single insert
    const { data, error } = await supabase.from("quotes").insert(body).select().single();
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);
  }
}

export async function PUT(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { id, brand, oldModel, newModel, oldBrand, newBrand, seriesModels, ...updates } = body;

  // Rename brand - update all records with this brand
  if (oldBrand && newBrand) {
    const { data, error } = await supabase
      .from("quotes")
      .update({ brand: newBrand })
      .eq("brand", oldBrand)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, updated: data?.length || 0 });
  }

  // Rename series - update model names for all models in a series
  if (brand && seriesModels && Array.isArray(seriesModels) && newModel) {
    // seriesModels is an array of model names to update
    let totalUpdated = 0;
    for (const oldModelName of seriesModels) {
      // Replace series prefix in model name
      const { data, error } = await supabase
        .from("quotes")
        .update({ model: oldModelName.replace(/^[^0-9]+/, newModel + ' ') })
        .eq("brand", brand)
        .eq("model", oldModelName)
        .select();
      
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      totalUpdated += data?.length || 0;
    }
    return NextResponse.json({ success: true, updated: totalUpdated });
  }

  // Rename model - update all records with this brand/model
  if (brand && oldModel && newModel) {
    const { data, error } = await supabase
      .from("quotes")
      .update({ model: newModel })
      .eq("brand", brand)
      .eq("model", oldModel)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, updated: data?.length || 0 });
  }

  // Single record update by id
  if (!id) {
    return NextResponse.json({ error: "Missing id or rename parameters" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("quotes")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const repairId = searchParams.get("repair_id");

  if (repairId) {
    // Delete specific repair item
    const { error } = await supabase.from("quotes").delete().eq("repair_id", repairId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else if (brand && model) {
    // Delete all repairs for a specific model
    const { error } = await supabase.from("quotes").delete().eq("brand", brand).eq("model", model);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else if (brand) {
    // Delete all repairs for a brand
    const { error } = await supabase.from("quotes").delete().eq("brand", brand);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else if (id) {
    // Delete by database ID
    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Delete all
    const { error } = await supabase.from("quotes").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
