import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const recordCalculation = async (data: {
  coin_type: string;
  purchase_amount: number;
  sell_amount: number;
  tax_amount: number;
  profit: number;
}) => {
  if (!supabase) return;
  try {
    await supabase.from('calculations').insert([data]);
  } catch (error) {
    console.error('Error saving calculation:', error);
  }
};
