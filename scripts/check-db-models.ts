
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load env
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkModels() {
    console.log("Checking for Samsung Galaxy A02 and other A series...");
    
    // Check specific models
    const modelsToCheck = ['Galaxy A02', 'Galaxy A12', 'Galaxy A52', 'Galaxy A55'];
    
    for (const model of modelsToCheck) {
        const { data, error, count } = await supabase
            .from('repair_quotes')
            .select('*', { count: 'exact' })
            .eq('brand', 'SAMSUNG')
            .eq('model', model);
            
        if (error) {
            console.error(`Error checking ${model}:`, error);
        } else {
            console.log(`Model: ${model} - Found ${count} records.`);
            if (data && data.length > 0) {
                console.log(`Sample record:`, JSON.stringify(data[0], null, 2));
            }
        }
    }
    
    // Check total count
    const { count: totalCount } = await supabase.from('repair_quotes').select('*', { count: 'exact', head: true });
    console.log(`Total records in DB: ${totalCount}`);
    
    // Check distinct models for Samsung
    const { data: samsungModels } = await supabase
        .from('repair_quotes')
        .select('model')
        .eq('brand', 'SAMSUNG');
        
    if (samsungModels) {
        const uniqueSamsungModels = new Set(samsungModels.map(i => i.model));
        console.log(`Unique Samsung Models count: ${uniqueSamsungModels.size}`);
        console.log(`Samsung Models:`, Array.from(uniqueSamsungModels).sort().join(', '));
    }
}

checkModels();
