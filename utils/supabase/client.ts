import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function getSupabaseClientWithAuth(jwt?: string): SupabaseClient<Database> {
    const options = jwt ? { global: { headers: { Authorization: `Bearer ${jwt}` } } } : {};
    return createClient<Database>(supabaseUrl, supabaseAnonKey, options);
}

const supabase = getSupabaseClientWithAuth();

export default supabase;
